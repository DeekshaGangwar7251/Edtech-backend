import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
      // Sync localStorage with new image data
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  // Added 'getState' here to fetch the existing user data from Redux
  return async (dispatch, getState) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // 1. Get the current user data from your Redux state
      const { user } = getState().profile

      // 2. Extract the raw profile details returned in response.data.data from your controller
      const profileDetails = response.data.data

      // 3. Reconstruct a fresh, complete User object by merging the existing user data,
      // the new profileDetails, and any text inputs (like names) from the form submission.
      const fullUpdatedUser = {
        ...user,
        firstName: formData.firstName || user?.firstName,
        lastName: formData.lastName || user?.lastName,
        additionalDetails: {
          ...user?.additionalDetails,
          ...profileDetails,
        },
      }

      const userImage = fullUpdatedUser.image
        ? fullUpdatedUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${fullUpdatedUser.firstName} ${fullUpdatedUser.lastName}`
      
      fullUpdatedUser.image = userImage

      // 4. Update Redux global state with the merged user object
      dispatch(setUser(fullUpdatedUser))
      
      // 5. Update local storage persistent state
      localStorage.setItem("user", JSON.stringify(fullUpdatedUser))

      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response?.data?.message || "Could Not Change Password")
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      
      // Clear Redux state & log out via authAPI thunk dispatch handler
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error(error.response?.data?.message || "Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}