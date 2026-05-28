import React from 'react'
import HighlightText from "../HomePage/HighlightText"

const Quote = () => {
  return (
    <div className="text-xl md:text-2xl font-semibold mx-auto py-5 text-center text-richblack-100 max-w-[1200px] w-11/12 leading-9">
      {/* Opening Quote Icon */}
      <span className="text-richblack-600 text-3xl font-serif align-super mr-1">
        “
      </span>
      
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      
      {/* Light Blue Highlight */}
      <HighlightText text={" combines technology"} />,{" "}
      
      {/* Orange/Amber Highlight */}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent font-bold">
        expertise
      </span>
      , and community to create an{" "}
      
      {/* Yellow/Gold Highlight */}
      <span className="bg-gradient-to-b from-[#E7C161] to-[#E1A711] bg-clip-text text-transparent font-bold">
        unparalleled educational experience.
      </span>

      {/* Closing Quote Icon */}
      <span className="text-richblack-600 text-3xl font-serif align-super ml-1">
        ”
      </span>
    </div>
  )
}

export default Quote