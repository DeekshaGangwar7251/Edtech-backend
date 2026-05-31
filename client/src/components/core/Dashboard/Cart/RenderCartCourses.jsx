import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
// 🎯 FIX: Added curly braces around named slice action export
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, index) => {
        // 🎯 FIX: Added the missing return keyword so items actually draw on screen
        return (
          <div
            key={course._id || index}
            className={`flex w-full flex-wrap items-start justify-between gap-6 ${
              index !== cart.length - 1 ? "border-b border-richblack-700 pb-6" : ""
            } ${index !== 0 ? "mt-6" : ""}`}
          >
            {/* Left Side: Course Thumbnail, Meta Info and Rating Row */}
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img 
                src={course?.thumbnail} 
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course?.category?.name || "Name"}
                </p>
                
                {/* Rating and Stars Container */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-100 font-semibold">4.5</span>
                  <ReactStars
                    count={5}
                    value={4.5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<GiNinjaStar />}
                    fullIcon={<GiNinjaStar />}
                  />
                  <span className="text-richblack-400 text-sm">
                    ({course?.ratingAndReviews?.length || 0} Ratings)
                  </span>
                </div>

                {/* Constant text meta elements underneath matching image template */}
                <div className="text-sm text-richblack-400 pt-2">
                  <span>Total Courses</span>
                  <span className="mx-1">•</span>
                  <span>Lesson</span>
                  <span className="mx-1">•</span>
                  <span>Beginner</span>
                </div>
              </div>
            </div>

            {/* Right Side: Delete Button Actions & Dynamic Price Blocks */}
            <div className="flex flex-col items-end space-y-2">
              <button 
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-700 bg-richblack-800 py-2 px-3 text-pink-200 hover:bg-richblack-700 transition-all duration-200"
              >
                <RiDeleteBin6Line size={16} />
                <span>Remove</span>
              </button>
              <p className="text-2xl font-semibold text-yellow-100 pt-4">
                Rs. {course?.price?.toLocaleString('en-IN') || "0"}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RenderCartCourses