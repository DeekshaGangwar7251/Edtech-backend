import React from "react"

import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Courses.map((course, i) => (
            <div key={course?._id || i} className="min-w-[300px] max-w-[300px]">
              <Course_Card course={course} Height={"h-[201px]"} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider