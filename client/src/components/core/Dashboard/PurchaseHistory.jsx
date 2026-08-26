import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (!token) return
      try {
        const response = await getUserEnrolledCourses(token)
        setEnrolledCourses(response)
      } catch (error) {
        console.log("Unable to fetch Purchase History")
      }
    })()
  }, [token])

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-white">
      <h1 className="text-3xl font-medium text-richblack-5">
        Purchase History
      </h1>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-12rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] place-items-center text-richblack-100">
          You haven't purchased any courses yet.
        </p>
      ) : (
        <div className="my-8 overflow-hidden rounded-lg border border-richblack-700 text-richblack-5">
          <div className="flex bg-richblack-700 px-5 py-3 text-sm font-medium uppercase tracking-wider text-richblack-100">
            <p className="w-1/2">Course Name</p>
            <p className="w-1/4">Price Paid</p>
            <p className="w-1/4">Status</p>
          </div>

          {enrolledCourses.map((course, index) => (
            <div
              key={course._id || index}
              onClick={() => navigate(`/courses/${course._id}`)}
              className={`flex cursor-pointer items-center border-b border-richblack-700 bg-richblack-900/40 px-5 py-4 transition-all duration-150 hover:bg-richblack-800/50 ${
                index === enrolledCourses.length - 1 ? "border-none" : ""
              }`}
            >
              <div className="flex w-1/2 items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-14 w-14 rounded-lg bg-richblack-800 object-cover"
                />
                <p className="truncate font-semibold text-richblack-5">
                  {course.courseName}
                </p>
              </div>
              <p className="w-1/4 text-sm font-medium text-richblack-100">
                Rs. {course.price}
              </p>
              <p className="w-1/4 text-sm font-medium text-caribbeangreen-100">
                Paid
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory
