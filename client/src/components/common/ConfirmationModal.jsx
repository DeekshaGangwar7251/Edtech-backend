import React from 'react'
import IconsBtn from '../common/IconsBtn' // Adjust this path if your folder structure differs

export default function ConfirmationModal({ modalData }) {
  return (
    // Backdrop overlay: blocks interactions behind it, adds a dark tint and subtle blur
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-70 backdrop-blur-sm">
      
      {/* Modal Box Container */}
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        
        {/* Title Text - Forced to bright white text */}
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        
        {/* Description Text - Forced to a readable light gray text */}
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-x-4">
          {/* Main action button (Solid Yellow "Logout") */}
          <IconsBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          
          {/* Secondary action button (Light grey background text "Cancel") */}
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-richblack-300 transition-all duration-200"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>

      </div>
    </div>
  )
}