import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';

const About = () => {
  return (
    <div className="text-white">
        {/* section1 */}
        <section className="bg-richblack-800 text-white pt-20 pb-16">
      {/* Container holding all elements sequentially */}
      <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center gap-12 text-center">
        
        {/* Header content always on top */}
        <header className="flex flex-col items-center gap-4 max-w-[900px]">
          {/* Small Top Label */}
          <span className="text-richblack-400 text-sm font-medium tracking-wide uppercase">
            About us
          </span>
          
          {/* Main Heading */}
          <h1 className="text-3xl lg:text-4xl font-semibold mt-2 leading-tight">
            Driving Innovation in Online Education for a
            <br />
            <HighlightText text={"Brighter Future"} />
          </h1>
          
          {/* Subtext description */}
          <p className="mx-auto mt-3 text-base font-medium text-richblack-300 lg:w-[95%] leading-6">
            Studynotion is at the forefront of driving innovation in online education. 
            We're passionate about creating a brighter future by offering cutting-edge courses, 
            leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>
        </header>

        {/* Banner Images Grid placed naturally underneath */}
        <div className="grid grid-cols-3 gap-3 lg:gap-5 w-full mt-4">
          {/* Image 1 */}
          <img 
            src={BannerImage1} 
            alt="Students learning online" 
            className="w-full object-cover rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          />
          
          {/* Image 2 Wrapper - Glow is strictly applied ONLY to this middle column block */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* High-Intensity Golden/Yellow Radial Spotlight Glow */}
            <div className="absolute top-0 left-[50%] translate-x-[-50%] -translate-y-[15%] h-[200px] w-[90%] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.45)_0%,_rgba(251,191,36,0.15)_50%,_rgba(0,0,0,0)_70%)] blur-[35px] pointer-events-none z-0"></div>
            
            <img 
              src={BannerImage2} 
              alt="Person working on laptop" 
              className="relative w-full object-cover rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-10"
            />
          </div>
          
          {/* Image 3 */}
          <img 
            src={BannerImage3} 
            alt="Student smiling at laptop" 
            className="w-full object-cover rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </section>
        

        {/* section2 */}
        <section>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section3 */}
        <section className="bg-richblack-900 text-white py-20">
      <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col gap-24">
        
        {/* Founding Story Layout Block */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Founding Story Left Text Block */}
          <div className="flex flex-col gap-6 lg:w-[50%]">
            <h1 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[#9437DE] via-[#E93B77] to-[#F05335] bg-clip-text text-transparent">
              Our Founding Story
            </h1>
            
            <p className="text-base font-medium text-richblack-300 leading-6">
              Our e-learning platform was born out of a shared vision and passion for 
              transforming education. It all began with a group of educators, technologists, 
              and lifelong learners who recognized the need for accessible, flexible, and 
              high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            
            <p className="text-base font-medium text-richblack-300 leading-6">
              As experienced educators ourselves, we witnessed firsthand the limitations and 
              challenges of traditional education systems. We believed that education should not 
              be confined to the walls of a classroom or restricted by geographical boundaries. 
              We envisioned a platform that could bridge these gaps and empower individuals from 
              all walks of life to unlock their full potential.
            </p>
          </div>
        
          {/* Founding Story Right Image Media Wrapper */}
          <div className="lg:w-[45%] relative flex justify-center">
            {/* Soft background ambient glow for the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[80%] rounded-full bg-gradient-radial from-[#EC008C]/15 to-transparent blur-[50px] pointer-events-none"></div>
            
            <img 
              src={FoundingStory} 
              alt="Founding story team collaboration"
              className="relative w-full max-w-[530px] rounded-md object-cover shadow-[0_0_30px_rgba(233,59,119,0.15)]"
            />
          </div>
        </div>

        {/* Vision and Mission Split Flex Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
          
          {/* Our Vision Column Box */}
          <div className="flex flex-col gap-4 lg:w-[45%]">
            <h1 className="text-3xl font-semibold bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
              Our Vision
            </h1>
            <p className="text-base font-medium text-richblack-300 leading-6">
              With this vision in mind, we set out on a journey to create an e-learning 
              platform that would revolutionize the way people learn. Our team of dedicated 
              experts worked tirelessly to develop a robust and intuitive platform that combines 
              cutting-edge technology with engaging content, fostering a dynamic and 
              interactive learning experience.
            </p>
          </div>

          {/* Our Mission Column Box */}
          <div className="flex flex-col gap-4 lg:w-[45%]">
            <h1 className="text-3xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-base font-medium text-richblack-300 leading-6">
              Our mission goes beyond just delivering courses online. We wanted to create a 
              vibrant community of learners, where individuals can connect, collaborate, and 
              learn from one another. We believe that knowledge thrives in an environment of 
              sharing and dialogue, and we foster this spirit of collaboration through forums, 
              live sessions, and networking opportunities.
            </p>
          </div>
          
        </div>
      </div>
    </section>

        {/* section4 */}

        <section>
            <div>
                <StatsComponent/>
            </div>
        </section>

        {/* section5 */}
        <section>
            <LearningGrid/>
            <ContactFormSection/>
        </section>
    </div>
  )
}

export default About