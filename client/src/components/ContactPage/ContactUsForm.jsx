import React, {useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import { toast } from 'react-hot-toast'; 
import countryData from "../../data/countrycode.json"; 
const ContactUsForm = () => {

 const [loading, setLoading] = useState(false);
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
 } = useForm();

 const submitContactForm = async (data) => {
   console.log("Logging Data", data);
   
   // 1. Fire up a single responsive loading toast tracker
   const toastId = toast.loading("Sending your message...");

   try {
     setLoading(true);
     
     const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
     console.log("Logging Response", response);
     
     // 2. Check for backend operation success flags
     if (response?.data?.success || response?.status === 200) {
       
       // Transform loading indicator directly into a success message
       toast.success("Message Sent Successfully!", { id: toastId });
       
       reset({
         email: "",
         firstname: "",
         lastname: "",
         message: "",
         phoneNo: "",
       });
     } else {
       throw new Error("Backend validation failed");
     }
     
     setLoading(false);
   } catch (error) {
     console.log("Error:", error.message);
     
     // Transform loading indicator directly into an error message crossmark
     toast.error("Could not send message. Please try again.", { id: toastId });
     setLoading(false);
   }
 };

  return (
    <form onSubmit={handleSubmit(submitContactForm, (errors) => console.log("Validation Errors: ", errors))} className="w-full max-w-[450px] mx-auto text-richblack-5">
        <div className="flex flex-col gap-5">
          
          {/* firstname & lastname row */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* firstname */}
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="firstname" className="text-[14px] text-richblack-5">First Name</label>
              <input type='text'
                     name='firstname'
                     id='firstname'
                     placeholder='Enter first name' 
                     className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
                     {...register("firstname", {required:true})}
              />

              {
                errors.firstname && (
                  <span className="text-xs text-pink-200 mt-1">
                    Please enter your first name
                  </span>
                )
              }
            </div>

            {/* lastname */}
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="lastname" className="text-[14px] text-richblack-5">Last Name</label>
              <input type='text'
                     name='lastname'
                     id='lastname'
                     placeholder='Enter last name' 
                     className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
                     {...register("lastname")}
              />
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col gap-2">
            <label htmlFor='email' className="text-[14px] text-richblack-5">
              Email Address
            </label>
            <input 
               type='email'
               name='email'
               id='email'
               placeholder='Enter email address'
               className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
               {...register("email",{required:true})}
            />
            {
              errors.email && (
                <span className="text-xs text-pink-200 mt-1">
                  Please enter your email address
                </span>
              )
            }
          </div>

         {/* phone number */}
<div className="flex flex-col gap-2">
  <label htmlFor="phoneNo" className="text-[14px] text-richblack-5">Phone Number</label>
  <div className="flex gap-5">
    
    {/* Dynamic Country Code Dropdown */}
    <div className="w-[95px]"> 
      <select
        name="dropdown"
        id="dropdown"
        className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 focus:outline-none focus:border-yellow-50 appearance-none cursor-pointer text-[14px]"
        {...register("countrycode")}
      >
        {
    countryData.map((element, index) => {
      return (
        <option key={index} value={element.code} className="bg-[#161d29]">
          {element.code} - {element.name || element.country} {/* 👈 Safe fallback check */}
        </option>
      )
    })
  }
      </select>
    </div>

    {/* Phone Input Box */}
    <div className="flex-1">
      <input
        type="number"
        name="phoneNo"
        id="phoneNo"
        placeholder="12345 67890"
        className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...register("phoneNo", {
          required: { value: true, message: "Please enter your Phone Number." },
          maxLength: { value: 12, message: "Invalid Phone Number" },
          minLength: { value: 10, message: "Invalid Phone Number" }
        })}
      />
    </div>
  </div>
  {errors.phoneNo && (
    <span className="text-xs text-pink-200 mt-1">{errors.phoneNo.message}</span>
  )}
</div>

          {/* message box */}
          <div className="flex flex-col gap-2">
              <label htmlFor='message' className="text-[14px] text-richblack-5">Message</label>
              <textarea
                name='message'
                id='message'
                cols="30"
                rows="4"
                placeholder='Enter your message here'
                className="w-full bg-[#161d29] border-b border-richblack-600 rounded-[8px] p-[12px] text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50 resize-none"
                {...register("message",{required:true})}
              />
              {
                errors.message &&(
                  <span className="text-xs text-pink-200 mt-1">
                    Please enter your message
                  </span>
                )
              }
          </div>

          {/* button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full text-center text-[16px] font-bold bg-[#ffd60a] text-black p-3 rounded-[8px] transition-all duration-200 mt-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
              ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-95"}`}
          >
              {loading ? "Sending..." : "Send Message"}
          </button>

        </div>

    </form>
    
  )
}

export default ContactUsForm;
