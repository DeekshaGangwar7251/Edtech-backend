// import React,{useState,useEffect} from 'react'
// import {useSelector} from 'react-redux'
// import OTPInput from 'react-otp-input'
// import {useDispatch} from 'react-redux'
// import {signUp} from '../services/operations/authAPI'
// import{useNavigate} from 'react-router-dom'
// import {Link} from 'react-router-dom'

// const VerifyEmail = () => {

//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const [otp,sendOtp]=useState("");
//     const {signupData,loading}=useSelector((state)=>state.auth);

//     useEffect(()=>{
//       if(!signupData){
//         navigate("/signup");
//       }
//     },[])
   
//     const handleOnSubmit=(e)=>{
//       e.preventDefault();

//       const{
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//       }= signupData;
//       dispatchEvent(signUp(accountType,
//                             firstName,
//                             lastName,
//                             email,
//                             password,
//                             confirmPassword,
//                             otp,
//                             navigate));
//     }

//   return (
//     <div className="text-white">
//       {
//         loading 
//         ? (<div>
//             Loading...
//            </div>)
//         :(
//             <div>
//               <h1>
//                 Verify Email
//               </h1>
//               <p>A verification has been sent to you, Enter the code below</p>
//               <form onSubmit={handleOnSubmit}>
//                   <OTPInput
//                     value={otp}
//                     onChange={sendOtp}
//                     numInputs={6}
//                     renderInput={(props)=><input{...props}/>}
//                   />
//                   <button type='submit'>
//                     Verify Email
//                   </button>
//               </form>

//                 <div> 
//                         <div className="mt-6 flex items-center justify-between">
//                         <Link to="/login" className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-100 transition-all duration-200">
//                        {/* Left arrow symbol matching the layout arrow */}
//                        <span>←</span>
//                        <p className="font-medium text-[0.875rem] leading-[1.375rem]">Back to login</p>
//                       </Link>

//                       <button 
//                         onClick={()=> dispatch(sendOtp(signupData.email))}
//                       >
//                         Resend it
//                       </button>
//                 </div>
//               </div>
//             </div>
//         )
//       }
//     </div>
//   )
// }

// export default VerifyEmail


import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signUp, sendOtp } from '../services/operations/authAPI' 
import { useNavigate, Link } from 'react-router-dom'

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // An array of 6 strings for our 6 OTP blocks
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
    const { signupData, loading } = useSelector((state) => state.auth);
    
    // References to control moving cursor focus automatically
    const inputRefs = useRef([]);

    useEffect(() => {
      if (!signupData) {
        navigate("/signup");
      }
    }, [signupData, navigate]); 

    // Handles typing in numbers
    const handleOtpChange = (value, index) => {
      if (isNaN(value)) return; // Allow numbers only
      
      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1); // Only keep the last digit
      setOtp(newOtp);

      // Auto-focus the next input block
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    };

    // Handles using the backspace key cleanly
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
   
    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (!signupData) return;

      const combinedOtp = otp.join(""); // Joins the array ["1","2","3"...] into "123456"
      if (combinedOtp.length < 6) {
        alert("Please enter a 6-digit OTP");
        return;
      }

      const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = signupData;

      dispatch(signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        combinedOtp,
        navigate
      ));
    }

  if (!signupData && !loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900 text-white">
        <div className="text-center">
          <p className="text-xl">No signup data found.</p>
          <p className="text-richblack-200 mt-2">Redirecting you back to signup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex min-h-screen items-center justify-center bg-richblack-900">
      {
        loading 
        ? (<div className="text-2xl">Loading...</div>)
        : (
            <div className="max-w-[500px] p-4 md:p-8">
              <h1 className="text-3xl font-semibold text-richblack-5">Verify Email</h1>
              <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                A verification code has been sent to you. Enter the code below:
              </p>
              
              <form onSubmit={handleOnSubmit}>
                  {/* Clean, natively responsive HTML OTP input layout */}
                  <div className="flex justify-between gap-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        placeholder="-"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 text-xl font-semibold"
                      />
                    ))}
                  </div>

                  <button 
                    type='submit'
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] font-medium text-richblack-900 mt-6 hover:bg-yellow-100 transition-all duration-200"
                  >
                    Verify Email
                  </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/login" className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-100 transition-all duration-200">
                  <span>←</span>
                  <p className="font-medium text-[0.875rem] leading-[1.375rem]">Back to login</p>
                </Link>

                <button 
                  className="text-blue-100 font-medium hover:underline"
                  onClick={() => signupData?.email && dispatch(sendOtp(signupData.email, navigate))}
                >
                  Resend it
                </button>
              </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail;