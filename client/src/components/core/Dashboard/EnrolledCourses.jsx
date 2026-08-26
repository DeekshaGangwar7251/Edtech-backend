import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [viewTab, setViewTab] = useState("all"); // Tracks navigation pills filter

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  }

 useEffect(() => {
  if (token) {
    getEnrolledCourses();
  }
}, [token]);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-white">
      {/* Title */}
      <h1 className="text-3xl font-medium text-richblack-5">Enrolled Courses</h1>
      
      {/* View Filter Pills matching image design */}
      <div className="my-6 flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max border border-richblack-700">
        {["all", "pending", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setViewTab(tab)}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 capitalize ${
              viewTab === tab
                ? "bg-richblack-900 text-richblack-5"
                : "text-richblack-400 hover:text-richblack-5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditionally render content depending on backend state */}
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-12rem)] place-items-center">
          <div className="spinner">Loading...</div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] place-items-center text-richblack-100">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5 border border-richblack-700 rounded-lg overflow-hidden">
          {/* Table Main Header Column Track */}
          <div className="flex bg-richblack-700 px-5 py-3 text-sm font-medium text-richblack-100 uppercase tracking-wider">
            <p className="w-1/2">Course Name</p>
            <p className="w-1/4">Durations</p>
            <p className="w-1/4">Progress</p>
          </div>

          {/* Dynamic Render Loop of course grid cards */}
          {enrolledCourses.map((course, index) => {
            // 🎯 FIX: Added the missing return statement so UI displays items
            return (
              <div
                key={course._id || index}
                onClick={() => {
                  const firstSection = course.courseContent?.[0]
                  const firstSubSection = firstSection?.subSection?.[0]
                  if (firstSection && firstSubSection) {
                    navigate(
                      `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
                    )
                  }
                }}
                className={`flex cursor-pointer items-center border-b border-richblack-700 px-5 py-4 bg-richblack-900/40 hover:bg-richblack-800/50 transition-all duration-150 ${
                  index === enrolledCourses.length - 1 ? "border-none" : ""
                }`}
              >
                {/* Column 1: Media Thumbnail and Text Descriptions (50% block width) */}
                <div className="flex w-1/2 items-center gap-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName}
                    className="h-14 w-14 rounded-lg object-cover bg-richblack-800"
                  />
                  <div className="flex flex-col max-w-[80%]">
                    <p className="font-semibold text-richblack-5 truncate">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-400 mt-1 line-clamp-1">
                      {course.courseDescription || "Short Description"}
                    </p>
                  </div>
                </div>

                {/* Column 2: Clock totalDuration (25% block width) */}
                <div className="w-1/4 text-sm font-medium text-richblack-100">
                  {course?.totalDuration || "2hr 30 mins"}
                </div>

                {/* Column 3: Custom status bars (25% block width) */}
                <div className="w-1/4 flex flex-col gap-2 pr-4">
                  <p className="text-xs font-semibold text-richblack-300">
                    {course.progressPercentage === 100 ? (
                      <span className="text-caribbeangreen-100 font-medium">Completed</span>
                    ) : (
                      `Progress: ${course.progressPercentage || 0}%`
                    )}
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    baseBgColor="#2C333F" // Deep dark base matching image slot
                    bgColor={course.progressPercentage === 100 ? "#05A371" : "#47A5C5"} // Green for completed, blue for active progress
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses;