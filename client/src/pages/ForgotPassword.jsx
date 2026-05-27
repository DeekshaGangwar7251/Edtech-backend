import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {

    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail] = useState("");
    const{loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handlerOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    
  <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center px-4 bg-richblack-900">
    {loading ? (
      <div className="text-white text-3xl font-semibold animate-pulse">
        Loading...
      </div>
    ) : (
      <div className="max-w-[508px] w-full p-4 lg:p-8 flex flex-col justify-center">
        {/* Title */}
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          {!emailSent ? "Reset your password" : "Check your email"}
        </h1>
        
        {/* Description */}
        <p className="my-4 text-[0.875rem] leading-[1.375rem] text-richblack-100">
          {!emailSent
            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>

        {/* Form Container */}
        <form onSubmit={handlerOnSubmit} className="flex flex-col w-full gap-y-4">
          {!emailSent && (
            <label className="w-full flex flex-col gap-y-1">
              <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <span className="text-pink-200">*</span>
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b border-richblack-600 focus:outline-none focus:border-yellow-50 placeholder:text-richblack-400"
              />
            </label>
          )}

          {/* Yellow Action Button */}
          <button
            type="submit"
            className="w-full mt-2 rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200"
          >
            {!emailSent ? "Reset Password" : "Resend Email"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login" className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-100 transition-all duration-200">
            {/* Left arrow symbol matching the layout arrow */}
            <span>←</span>
            <p className="font-medium text-[0.875rem] leading-[1.375rem]">Back to login</p>
          </Link>
        </div>
      </div>
    )}
  </div>
);
}

export default ForgotPassword  