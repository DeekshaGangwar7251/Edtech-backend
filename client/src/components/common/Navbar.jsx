// import React, {useState} from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom"; // Merged duplicate imports
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector'; 
// import { categories } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";

const subLinks=[
  {
    title:"Python",
    link:"/catalog/python"
  },

  {
    title:"Web development",
    link:"/catalog/web-development"
  },
  {
    title:"Android Development",
    link:"/catalog/android"
  },

  {
    title:"Blockchain",
    link:"/catalog/blockchain"
  },
  {
    title:"Data Science",
    link:"/catalog/data-science"
  },

  {
    title:"Devops",
    link:"/catalog/devops"
  },

];


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  // const [subLinks, setSubLinks] = useState([]);

 
  // useEffect(() => {
  //   const fetchSublinks = async () => {
  //     try {
  //       const result = await apiConnector("GET", categories.CATEGORIES_API);
  //       console.log("Printing Sublinks result:", result);
        
  //       if (result?.data?.data) {
  //         setSubLinks(result.data.data);
  //       }
  //     } catch (error) {
  //       console.log("Could not fetch the category list", error);
  //     }
  //   };

  //   fetchSublinks(); 
  // }, []);


const matchRoute =(route)=>{
    return matchPath({path:route},location.pathname);
}

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
        <div className=" flex w-11/12 max-w-maxContent items-center justify-between">
         <Link to="/">
           <img src={logo} alt="" width={160} height={42} loading='lazy'/>
         </Link>
          
          <nav>
            <ul className="flex gap-x-6 text-richblack-25">
                {
                    NavbarLinks.map((link,index)=>(
                        <li key={index}>
                          {
  link.title === "Catalog" ? (
    <div className="relative flex flex-row items-center gap-2 group">
      <p>{link.title}</p>
      <IoIosArrowDown />
      
      {/* 1. This is  white dropdown container box */}
      <div className="invisible absolute opacity-0 left-[50%] top-[40px] translate-x-[-50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 ease-in-out will-change-transform group-hover:visible group-hover:opacity-100 w-[300px] z-[100] shadow-lg">
        
        {/* 2. Map over  links INSIDE the dropdown box container */}
        {
          subLinks.length ? (
            subLinks.map((subLink, index) => (
              <Link to={`${subLink.link}`} key={index} className="hover:bg-richblack-50 p-2 rounded-md transition-all duration-200">
                <p className="text-richblack-900">{subLink.title}</p>
              </Link>
            ))
          ) : ( 
            <div className="text-center text-richblack-400">No Categories Found</div>
          )
        }
      </div>

      
      <div className="invisible opacity-0 absolute left-[75%] top-[30px] h-6 w-6 rotate-45 rounded bg-richblack-5 transition-all duration-200 group-hover:visible group-hover:opacity-100"></div>

    </div>
  ) : (
    <Link to={link?.path}>
      <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
        {link.title}
      </p>
    </Link>
  )
}
                            
                        </li>
                    ))
                }
            </ul>
          </nav>

          {/* Login/signup.dashboard */}

          <div className="flex gap-x-4 items-center">
            {
              user && user?.accountType!=="Instructor"&&(
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart />
                  {
                    totalItems>0 && (
                      <span>
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )
            }

            {
              token===null &&(
                <Link to="/login">
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                    Log in
                  </button>
                </Link>
              )
            }

            {
              token===null &&(
                <Link to="/signup">
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                    Sign up
                  </button>
                </Link>
              )
            }

            token!==null && <ProfileDropDown/>

          </div>

        </div>
    </div>
  )
}

export default Navbar