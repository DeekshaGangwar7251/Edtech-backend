import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
   <div className="mx-auto flex w-11/12 max-w-[600px] flex-col justify-center items-center gap-3 text-richblack-5 my-10">
    <h1 className="text-4xl font-semibold text-richblack-5 text-center">
        Get in touch
    </h1>
    <p className="text-richblack-400 text-center font-medium mb-6">
        We'd love to be here for you, Please fill out this form.
    </p>
    <div className="w-full">
        <ContactUsForm/>
    </div>
    
</div>
  )
}

export default ContactFormSection