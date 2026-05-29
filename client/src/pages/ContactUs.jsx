import React from 'react';
import ContactDetails from '../components/ContactPage/ContactDetails'; // 👈 Import details component
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';
const ContactUs = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row pb-20">
        
        {/* Left Section: Details Component Card */}
        <div className="lg:w-[40%] flex justify-center lg:justify-start items-start">
          <ContactDetails />
        </div>

        {/* Right Section: Form Box Container */}
        <div className="lg:w-[55%] border border-richblack-600 rounded-xl p-7 lg:p-14 flex flex-col gap-3 bg-transparent">
          <h1 className="text-4xl font-semibold text-richblack-5">
            Got a Idea? We&apos;ve got the skills. Let&apos;s team up.
          </h1>
          <p className="text-richblack-300 text-[16px] mb-6">
            Tell us more about yourself and what you&apos;re got in mind.
          </p>
          
          {/* <ReviewSlider/> */}
          
          <ContactUsForm />
        </div>

      </div>
      
      {/* Footer component injected right here under the page layout wrapper */}
      <Footer />
    </div>
  );
};

export default ContactUs;