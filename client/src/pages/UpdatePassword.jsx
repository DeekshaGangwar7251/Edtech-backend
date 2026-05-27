import React ,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
const UpdatePassword = () => {

    const dispatch=useDispatch();
    const location=useLocation();

    const[formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {loading}=useSelector((state) => state.auth);

    const{password,confirmPassword}=formData;

    const handleOnChange = (e) =>{
        setFormData((prevData)=>(
            {
             ...prevData,
             [e.target.name]: e.target.value,
            }
        ))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token =location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
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
          Choose new password
        </h1>
        
        {/* Description */}
        <p className="my-4 text-[1rem] leading-[1.625rem] text-richblack-100">
          Almost done. Enter your new password and you're all set.
        </p>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-y-4">
          
          {/* New Password Input Field */}
          <label className="relative w-full flex flex-col gap-y-1">
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New password <span className="text-pink-200">*</span>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="********"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-[10] text-richblack-5 border-b border-richblack-600 focus:outline-none focus:border-yellow-50 placeholder:text-richblack-400"
            />
            <span 
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-richblack-200 hover:text-richblack-5 transition-all"
            >
              {showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>}
            </span>
          </label>

          {/* Confirm New Password Input Field */}m
          <label className="relative w-full flex flex-col gap-y-1">
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <span className="text-pink-200">*</span>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="********"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-[10] text-richblack-5 border-b border-richblack-600 focus:outline-none focus:border-yellow-50 placeholder:text-richblack-400"
            />
            <span 
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer text-richblack-200 hover:text-richblack-5 transition-all"
            >
              {showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>}
            </span>
          </label>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full mt-4 rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Anchor */}
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login" className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-100 transition-all duration-200">
            <span>←</span>
            <p className="font-medium text-[0.875rem] leading-[1.375rem]">Back to login</p>
          </Link>
        </div>
      </div>
    )}
  </div>
  )
}

export default UpdatePassword