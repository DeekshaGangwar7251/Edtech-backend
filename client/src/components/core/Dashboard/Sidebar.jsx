import { useState } from "react"
import { VscMenu, VscSignOut, VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  // controls the slide-in drawer on small screens
  const [mobileOpen, setMobileOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* Hamburger button - only visible on small screens, always clickable */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-[4.25rem] z-40 rounded-md bg-richblack-700 p-2 text-richblack-5 md:hidden"
        aria-label="Open menu"
      >
        <VscMenu className="text-xl" />
      </button>

      {/* Overlay behind the drawer on mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:z-0 md:h-[calc(100vh-3.5rem)] md:w-auto md:min-w-[220px] md:translate-x-0`}
      >
        {/* Close button - only visible on small screens */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-4 top-4 text-richblack-5 md:hidden"
          aria-label="Close menu"
        >
          <VscChromeClose className="text-xl" />
        </button>

        <div className="flex flex-col" onClick={() => setMobileOpen(false)}>
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}