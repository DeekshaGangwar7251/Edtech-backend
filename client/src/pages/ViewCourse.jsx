import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { VscMenu } from "react-icons/vsc"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      if (!courseData?.courseDetails) return

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))

      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection?.length || 0
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* Hamburger to open lecture list on small screens */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="fixed left-4 top-[4.25rem] z-40 rounded-md bg-richblack-700 p-2 text-richblack-5 lg:hidden"
          aria-label="Open lecture list"
        >
          <VscMenu className="text-xl" />
        </button>

        {/* Overlay on small screens when sidebar is open */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-[340px] transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:z-0 lg:w-auto lg:max-w-none lg:translate-x-0`}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-4 pt-14 lg:mx-6 lg:pt-0">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
