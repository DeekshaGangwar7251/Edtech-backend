// import React from 'react';
// // Note: If you don't have react-icons installed, run: npm install react-icons
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

// const footerData = {
//   resources: {
//     title: "Resources",
//     links: ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces"]
//   },
//   support: {
//     title: "Support",
//     links: ["Help Center"]
//   },
//   plans: {
//     title: "Plans",
//     links: ["Paid memberships", "For students", "Business solutions"]
//   },
//   community: {
//     title: "Community",
//     links: ["Forums", "Chapters", "Events"]
//   },
//   subjects: {
//     title: "Subjects",
//     links: [
//       "AI", "Cloud Computing", "Code Foundations", "Computer Science", 
//       "Cybersecurity", "Data Analytics", "Data Science", "Data Visualization", 
//       "Developer Tools", "DevOps", "Game Development", "IT", 
//       "Machine Learning", "Math", "Mobile Development", "Web Design", "Web Development"
//     ]
//   },
//   languages: {
//     title: "Languages",
//     links: [
//       "Bash", "C", "C++", "C#", "Go", "HTML & CSS", "Java", 
//       "JavaScript", "Kotlin", "PHP", "Python", "R", "Ruby", "SQL", "Swift"
//     ]
//   },
//   career: {
//     title: "Career building",
//     links: ["Career paths", "Career services", "Interview prep", "Professional certification", "-", "Full Catalog", "Beta Content"]
//   }
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#161d29] text-[#838894] font-sans px-8 py-16 text-sm">
//       <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 justify-between">
        
//         {/* Left Section: Brand & Company */}
//         <div className="flex flex-col gap-6 basis-[200px] shrink-0">
//           <div className="flex items-center gap-2">
//             <span className="bg-[#00256c] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
//               S
//             </span>
//             <span className="text-[#f1f2ff] font-bold text-fa-xl text-xl">
//               StudyNotion
//             </span>
//           </div>
          
//           <div className="mt-2">
//             <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">Company</h4>
//             <ul className="flex flex-col gap-2">
//               <li><a href="#about" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">About</a></li>
//               <li><a href="#careers" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">Careers</a></li>
//               <li><a href="#affiliates" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">Affiliates</a></li>
//             </ul>
//           </div>
          
//           <div className="flex gap-4 text-dec-xl text-lg mt-2">
//             <a href="#facebook" aria-label="Facebook" className="text-[#6e727f] transition-colors duration-200 hover:text-[#f1f2ff]"><FaFacebook /></a>
//             <a href="#google" aria-label="Google" className="text-[#6e727f] transition-colors duration-200 hover:text-[#f1f2ff]"><FaGoogle /></a>
//             <a href="#twitter" aria-label="Twitter" className="text-[#6e727f] transition-colors duration-200 hover:text-[#f1f2ff]"><FaTwitter /></a>
//             <a href="#youtube" aria-label="YouTube" className="text-[#6e727f] transition-colors duration-200 hover:text-[#f1f2ff]"><FaYoutube /></a>
//           </div>
//         </div>

//         {/* Vertical Splitter (Hidden on mobile stack) */}
//         <div className="hidden md:block border-l border-[#2c333f] mx-4"></div>

//         {/* Middle/Right Section: Links Grid */}
//         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-1.5">
          
//           {/* Column 1: Resources & Support */}
//           <div className="flex flex-col gap-8">
//             <div>
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.resources.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.resources.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-2">
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.support.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.support.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Column 2: Plans & Community */}
//           <div className="flex flex-col gap-8">
//             <div>
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.plans.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.plans.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-2">
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.community.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.community.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Column 3: Subjects */}
//           <div className="flex flex-col gap-8">
//             <div>
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.subjects.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.subjects.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Column 4: Languages */}
//           <div className="flex flex-col gap-8">
//             <div>
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.languages.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.languages.links.map((link, idx) => (
//                   <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Column 5: Career Building */}
//           <div className="flex flex-col gap-8">
//             <div>
//               <h4 className="text-[#afb2bf] font-semibold mb-3 text-[0.95rem]">{footerData.career.title}</h4>
//               <ul className="flex flex-col gap-2">
//                 {footerData.career.links.map((link, idx) => (
//                   link === "-" ? (
//                     <li key={idx} className="text-[#424854] select-none">-</li>
//                   ) : (
//                     <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">{link}</a></li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           </div>

//         </div>
//       </div>

//       <hr className="border-0 border-t border-[#2c333f] my-8 max-w-[1200px] mx-auto" />

//       {/* Bottom Section: Legal & Copyright */}
//       <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[#6e727f] text-[0.85rem]">
//         <div className="flex gap-6">
//           <a href="#privacy" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">Privacy Policy</a>
//           <a href="#cookie" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">Cookie Policy</a>
//           <a href="#terms" className="text-[#6e727f] no-underline transition-colors duration-200 hover:text-[#f1f2ff]">Terms</a>
//         </div>
//         <div>
//           Made with <span className="text-red-500">❤️</span> CodeHelp © 2023 Studynotion
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <img src={Logo} alt="" className="object-contain" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;