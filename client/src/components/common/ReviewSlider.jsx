import React, { useEffect, useState } from "react"
import ReactStars from "react-stars"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.log("Could not fetch reviews", error)
      }
    })()
  }, [])

  if (!reviews.length) return null

  return (
    <div className="text-white">
      <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {reviews.map((review, i) => (
            <div
              key={review?._id || i}
              className="flex min-w-[280px] max-w-[280px] flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                  <h2 className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                  </h2>
                </div>
              </div>
              <p className="font-medium text-richblack-25">
                {review?.review?.split(" ").length > truncateWords
                  ? `${review?.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                  : `${review?.review}`}
              </p>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-yellow-100">
                  {review?.rating?.toFixed(1)}
                </h3>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  color2={"#ffd700"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider
