const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

// ======================================================
// CAPTURE PAYMENT (supports single course or cart of courses)
// ======================================================

exports.capturePayment = async (req, res) => {
    try {
        // Accept either { courses: [...] } (cart checkout) or { course_id } (single course)
        let courses = req.body.courses;

        if (!courses && req.body.course_id) {
            courses = [req.body.course_id];
        }

        const userId = req.user.id;

        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid Course ID(s)",
            });
        }

        let total_amount = 0;
        let firstCourse = null;

        for (const course_id of courses) {
            let course;
            try {
                course = await Course.findById(course_id);

                if (!course) {
                    return res.status(404).json({
                        success: false,
                        message: "Could not find the course",
                    });
                }

                const uid = new mongoose.Types.ObjectId(userId);

                if (course.studentsEnrolled.includes(uid)) {
                    return res.status(200).json({
                        success: false,
                        message: "Student is already enrolled in one of these courses",
                    });
                }

                if (!firstCourse) firstCourse = course;

                total_amount += course.price;
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }

        const options = {
            amount: total_amount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courses: JSON.stringify(courses),
                userId,
            },
        };

        try {
            const paymentResponse = await instance.orders.create(options);

            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                data: paymentResponse,
                courseName: firstCourse?.courseName,
                courseDescription: firstCourse?.courseDescription,
                thumbnail: firstCourse?.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Could not initiate order",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// VERIFY PAYMENT
// ======================================================

exports.verifyPayment = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;

        const userId = req.user.id;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userId
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed - missing details",
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment signature is invalid",
            });
        }

        await enrollStudents(courses, userId);

        return res.status(200).json({
            success: true,
            message: "Payment Verified and student enrolled",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// SEND PAYMENT SUCCESS EMAIL
// ======================================================

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { orderId, paymentId, amount } = req.body;
        const userId = req.user.id;

        if (!orderId || !paymentId || !amount || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details",
            });
        }

        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });
    } catch (error) {
        console.error("Error sending payment success email:", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};

// ======================================================
// ENROLL STUDENTS (internal helper, called after verified payment)
// ======================================================

const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Please provide Course IDs and User ID");
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                throw new Error(`Course not found: ${courseId}`);
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
