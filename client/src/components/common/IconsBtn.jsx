import React from 'react'

const IconsBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold cursor-pointer transition-all duration-200 ${
        outline 
          ? "border border-yellow-50 bg-transparent text-yellow-50" 
          : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
      } ${customClasses}`}
    >
      {
        children ? (
          <>
            {/* Renders the icon on the left first */}
            {children}
            <span className={`${outline ? "text-yellow-50" : "text-richblack-900"}`}>
              {text}
            </span>
          </>
        ) : (
          text
        )
      }
    </button>
  )
}

export default IconsBtn