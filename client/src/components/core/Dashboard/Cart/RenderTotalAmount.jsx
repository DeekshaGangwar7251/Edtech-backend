import React from 'react'
import { useSelector } from 'react-redux'
import IconsBtn from '../../../common/IconsBtn';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses", courses);
    // TODO: API integrate -> payment gateway implementation
  }

  return (
    <div className="min-w-[280px] rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:w-[320px]">
      {/* Title Text Label */}
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      
      {/* Dynamic Price Render */}
      <p className="text-3xl font-medium text-yellow-100">
        Rs. {total?.toLocaleString('en-IN') || "0"}
      </p>
      
      {/* Struck-through styling added to match the image baseline layout template */}
      <p className="mb-6 text-sm text-richblack-400 line-through">
        Rs. {((total || 0) * 1.2).toLocaleString('en-IN')}
      </p>
      
      {/* Form Submission Button */}
      <IconsBtn
        text="Buy Now"
        onclick={handleBuyCourse} // 🎯 FIX: Changed standard onClick to lowercase onclick to match custom component
        customClasses="w-full justify-center bg-yellow-50 text-richblack-900 py-2 font-semibold rounded-md hover:scale-95 transition-all duration-200"
      />
    </div>
  )
}

export default RenderTotalAmount