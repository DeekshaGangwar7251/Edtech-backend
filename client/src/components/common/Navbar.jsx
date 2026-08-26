import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)

      try {
        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )

        console.log("CATEGORIES RESPONSE:", res)
        console.log("CATEGORIES DATA:", res?.data?.data)

        if (res?.data?.success && Array.isArray(res?.data?.data)) {
          setSubLinks(res.data.data)
        } else {
          setSubLinks([])
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
        setSubLinks([])
      }

      setLoading(false)
    }

    fetchCategories()
  }, [])

  const matchRoute = (route) => {
    return matchPath(
      { path: route },
      location.pathname
    )
  }

  return (
    <div
      className={`relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">

            {NavbarLinks.map((link, index) => (
              <li key={index}>

                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>

                    <BsChevronDown />

                    {/* Catalog Dropdown */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                      {/* Arrow */}
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                      {/* Loading */}
                      {loading ? (
                        <p className="text-center">
                          Loading...
                        </p>
                      ) : subLinks.length > 0 ? (

                        /* Categories */
                        subLinks.map((subLink, index) => (
                          <Link
                            key={index}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))

                      ) : (

                        <p className="text-center">
                          No Categories Found
                        </p>

                      )}

                    </div>
                  </div>

                ) : (

                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>

                )}

              </li>
            ))}

          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">

          {/* Cart */}
          {user &&
            user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="relative"
              >
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

          {/* Login */}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}

          {/* Signup */}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}

          {/* Profile */}
          {token !== null && <ProfileDropdown />}

        </div>

        {/* Mobile menu toggle */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>

      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-14 z-[1100] w-full border-b border-richblack-700 bg-richblack-800 md:hidden">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-y-1 py-4">
            {NavbarLinks.map((link, index) => {
              if (link.title === "Catalog") {
                return (
                  <div key={index} className="flex flex-col">
                    <p className="px-2 py-2 font-semibold text-richblack-25">
                      {link.title}
                    </p>
                    <div className="flex flex-col pl-4">
                      {loading ? (
                        <p className="py-1 text-sm text-richblack-300">
                          Loading...
                        </p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="py-2 text-sm text-richblack-100"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="py-1 text-sm text-richblack-300">
                          No Categories Found
                        </p>
                      )}
                    </div>
                  </div>
                )
              }
              return (
                <Link key={index} to={link?.path} className="px-2 py-2">
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              )
            })}

            <div className="my-2 h-[1px] w-full bg-richblack-700" />

            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="flex items-center gap-2 px-2 py-2">
                <AiOutlineShoppingCart className="text-xl text-richblack-100" />
                <span className="text-richblack-25">
                  Cart{totalItems > 0 ? ` (${totalItems})` : ""}
                </span>
              </Link>
            )}

            {token === null && (
              <div className="flex flex-col gap-2 px-2 py-2">
                <Link to="/login">
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-5">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-5">
                    Sign up
                  </button>
                </Link>
              </div>
            )}

            {token !== null && (
              <div className="px-2 py-2">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar

