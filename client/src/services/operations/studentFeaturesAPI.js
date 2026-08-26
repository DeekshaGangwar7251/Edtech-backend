import { toast } from "react-hot-toast"

import logo from "../../assets/Logo/Logo-Small-Light.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiconnector"
import { studentEndpoints } from "../apis"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy the Course(s) — courses is an array of course IDs (supports single or cart checkout)
export async function BuyCourse(token, courses, user_details, navigate, dispatch) {
  const toastId = toast.loading("Loading...")
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
      return
    }

    // Initiate the order on the backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    )

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message)
    }

    const orderData = orderResponse.data.data

    // Open the Razorpay checkout window
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderData.currency,
      amount: `${orderData.amount}`,
      order_id: orderData.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: logo,
      prefill: {
        name: `${user_details?.firstName} ${user_details?.lastName}`,
        email: user_details?.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderData.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Payment Successful. You are Added to the course.")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
  }
}
