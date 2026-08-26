// backfillCategoryCourses.js
//
// ONE-TIME FIX SCRIPT
// Repairs existing courses that were created before the Category-linking
// bug was fixed. For every course in the database, this ensures the
// course's ID is present in its category's `courses` array.
//
// HOW TO RUN:
//   1. Place this file inside your MEGA-BACKEND folder (root level, next to index.js)
//   2. Make sure your .env file (with MONGODB_URL) is in the same folder
//   3. From terminal, inside MEGA-BACKEND folder, run:
//        node backfillCategoryCourses.js
//   4. You only need to run this ONCE. After this, new/edited courses
//      will stay in sync automatically thanks to the controller fix.

require("dotenv").config();
const mongoose = require("mongoose");

const Course = require("./models/Course");
const Category = require("./models/Category");

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected successfully");

        const courses = await Course.find({});
        console.log(`Found ${courses.length} course(s) total.`);

        let fixedCount = 0;

        for (const course of courses) {
            if (!course.category) {
                console.log(`Skipping "${course.courseName}" — no category set.`);
                continue;
            }

            const category = await Category.findById(course.category);

            if (!category) {
                console.log(
                    `Skipping "${course.courseName}" — category ${course.category} not found.`
                );
                continue;
            }

            const alreadyLinked = category.courses.some(
                (id) => id.toString() === course._id.toString()
            );

            if (alreadyLinked) {
                console.log(`Already linked: "${course.courseName}" -> "${category.name}"`);
                continue;
            }

            category.courses.push(course._id);
            await category.save();
            fixedCount++;
            console.log(`Fixed: "${course.courseName}" -> "${category.name}"`);
        }

        console.log(`\nDone. Fixed ${fixedCount} course-category link(s).`);
        process.exit(0);
    } catch (error) {
        console.error("Backfill failed:", error);
        process.exit(1);
    }
}

run();
