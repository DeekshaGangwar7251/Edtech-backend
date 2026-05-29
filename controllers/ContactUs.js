const Contact = require("../models/Contact");
const mailSender = require("../utils/mailSender"); // Assumes you have a mailSender helper

exports.contactUsController = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNo, countrycode, message } = req.body;

    // 1. Validation
    if (!firstname || !email || !phoneNo || !countrycode || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required except last name.",
      });
    }

    // 2. Save data entry to Database
    const contactDetails = await Contact.create({
      firstname,
      lastname,
      email,
      phoneNo,
      countrycode,
      message,
    });

    // 3. Optional: Send Confirmation Email to User
    try {
      const emailBody = `
        <h3>Hello ${firstname},</h3>
        <p>Thank you for reaching out to StudyNotion. We have successfully received your message.</p>
        <p><strong>Your Message:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
        <br/>
        <p>Our team will get back to you shortly.</p>
        <p>Best regards,<br/>Team StudyNotion</p>
      `;

      await mailSender(
        email, 
        "Your Message has been received successfully - StudyNotion", 
        emailBody
      );
    } catch (emailError) {
      console.error("Email sending skipped/failed:", emailError.message);
      // We don't crash the request if email fails, as database save succeeded
    }

    // 4. Return successful response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contactDetails,
    });

  } catch (error) {
    console.error("Error in contactUsController:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your request. Please try again.",
    });
  }
};