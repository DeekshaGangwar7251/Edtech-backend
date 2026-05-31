import { useSelector } from 'react-redux'
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
    
  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Wishlist</h1>
      
      <p className="border-b border-richblack-700 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Wishlist
      </p>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        // 🎯 POLISHED EMPTY STATE STYLING Added below:
        <p className="mt-14 text-center text-3xl font-semibold text-richblack-100 fallback-fade">
          Your Cart is Empty
        </p>
      )}
    </div>
  )
}
