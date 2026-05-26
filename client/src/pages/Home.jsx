import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from '../components/common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';

export const Home = () => {
  return (
    <div >
        {/* Section1 */}
        {/* <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'> */}
        <div className="min-h-screen bg-richblack-900 text-white flex flex-col items-center pt-10  ">
            <Link to={"/signup"}>

             <div className=" group mx-auto w-fit flex items-center gap-2 rounded-full bg-richblack-800 px-4 py-2 font-bold text-richblack-200 transition-all duration-200 hover:scale-99">
                 <div className="flex flex-row items-center gap-2 rounded-full px-8 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 group-hover:m-[-4px] group-hover:py-[10px] group-hover:px-[14px]">
                  <p>Become an Instructor</p>
                  <FaArrowRight/>
                 </div>
             </div>
             

            </Link>

         <div className='text-center text-4xl font-semibold mt-7'>
           Empower Your Future with 
           <HighlightText text={" Coding skills"}/>
        </div> 
           
        <div className="mt-4 w-[70%] text-center text-lg font-bold text-richblack-300 ">
           With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>

        <div className='relative mx-3 my-10 max-w-[1000px] mx-auto'>

        <div className="absolute top-[-10%] left-[-10%] h-[120%] w-[120%] rounded-full bg-[radial-gradient(circle_at_center,_#00f5ff_0%,_#0055ff_40%,_transparent_70%)] opacity-40 blur-[80px] z-0"></div>

        <video
            muted
            loop
            autoPlay
            playsInline
            className="w-[11/12] max-w-[1000px] h-auto rounded-md object-cover mx-auto relative z-10"
            style={{
              boxShadow: "20px 20px 0px 0px #F5F5F5",
            }}
          >
            <source src={Banner} type="video/mp4"></source>
        </video>
        </div>

      

        {/* code section 1 */}

        <div>
          <CodeBlocks 
             position={"lg:flex-row justify-center"}
             heading={
              <div className="text-4xl font-semibold">
                Unlock Your 
                <HighlightText text={"Coding potential "} />
                with our online courses
              </div>
             }
             subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
             }
             ctabtn1={
              {
                btnText:"Try it yourself",
                linkto:"/signup",
                active:true,
              }
             }

             ctabtn2={
              {
                btnText:"learn more",
                linkto:"/login",
                active:false,
              }
             }
             
            backgroundGradient={<div className="absolute top-[-10%] left-[5%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,_#f97316_0%,_#eab308_40%,_transparent_70%)] opacity-25 blur-[80px]"></div>}

             codeblock={`<!DOCTYPE html>
            <html>
            head><title>Example</title><linkrel="stylesheet"href="styles.css">
            /head>
            body>
            h1><ahref="/">Header</a>
            /h1>
            nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
            /nav>`}

            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2 */}

        <div>
          <CodeBlocks 
             position={"lg:flex-row-reverse"}
             heading={
              <div className="text-4xl font-semibold">
                Unlock Your 
                <HighlightText text={"Coding potential "} />
                with our online courses
              </div>
             }
             subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
             }
             ctabtn1={
              {
                btnText:"Try it yourself",
                linkto:"/signup",
                active:true,
              }
             }

             ctabtn2={
              {
                btnText:"learn more",
                linkto:"/login",
                active:false,
              }
             }
             
            
backgroundGradient={<div className="absolute top-[-10%] left-[5%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,_#00f5ff_0%,_#0055ff_40%,_transparent_70%)] opacity-25 blur-[80px]"></div>}

             codeblock={`<!DOCTYPE html>
            <html>
            head><title>Example</title><linkrel="stylesheet"href="styles.css">
            /head>
            body>
            h1><ahref="/">Header</a>
            /h1>
            nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
            /nav>`}

            codeColor={"text-yellow-25"}
          />
          

          <ExploreMore/>




        </div>

        </div>



        {/* section 2 */}

        <div className="bg-pure-greys-5 text-richblack-700">
           <div className="homepage_bg h-[300px]">

              <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
                <div className="h-[100px]"></div>
                  <div className="flex flex-row gap-7 text-white">
                    <CTAButton active={true} linkto={"/signup"}>
                      <div className='flex items-center gap-3'>
                        Explore Full Catelog
                        <FaArrowRight/>
                      </div>
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"}>
                      <div>
                        Learn More
                      </div>
                    </CTAButton>
                  </div>

              </div>

           </div>
            

        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto">

         <div className="flex flex-row gap-5 mb-10 mt-[50px] ml-[40px]">
           <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"}/>
           </div>
         

         <div className="flex flex-col gap-10 w-[40%] items-start ml-[40px]">
           <div className="text-[16px]">
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkto={"/signup"}>
              <div>
                Learn More
              </div>
            </CTAButton>
          </div> 
         </div>

           <TimelineSection/>
         
         <div className="-mt-32">
           <LearningLanguageSection/>
         </div>

       </div> 

       
    </div>

    {/* section3 */}

    <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
      <InstructorSection/>
      <h2 className="text-center text-4xl font-semibold mt-10">Review from Other Learners</h2>
       {/* Review Slider */}
    </div>

       

       


      <Footer />
        
    </div>
  )
}
export default Home;
