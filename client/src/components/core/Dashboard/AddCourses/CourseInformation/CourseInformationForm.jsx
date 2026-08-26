import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"

import { HiOutlineCurrencyRupee } from "react-icons/hi"
import RequirementField from "./RequirementField"
import { setStep, setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconsBtn"
import { COURSE_STATUS } from "../../../../../utils/constants"
import { toast } from "react-hot-toast"
import Upload from "../Upload"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  // =========================
  // FETCH CATEGORIES + PREFILL
  // =========================
  useEffect(() => {
    const initializeForm = async () => {
      setLoading(true)

      const categories = await fetchCourseCategories()

      if (categories?.length > 0) {
        setCourseCategories(categories)
      }

      // =========================
      // EDIT COURSE PREFILL
      // =========================
      if (editCourse && course) {
        console.log("PREFILL COURSE:", course)

        // Course title
        setValue("courseTitle", course.courseName || "")

        // Description
        setValue(
          "courseShortDesc",
          course.courseDescription || ""
        )

        // Price
        setValue("coursePrice", course.price || "")

        // Tags
        setValue("courseTags", course.tag || "")

        // Benefits
        setValue(
  "courseBenefits",
  Array.isArray(course.whatYouWillLearn)
    ? course.whatYouWillLearn.join(", ")
    : course.whatYouWillLearn || ""
)

        // Category
        setValue(
          "courseCategory",
          course.category?._id || course.category || ""
        )

        // Requirements
        setValue(
          "courseRequirements",
          course.instructions || []
        )
      }

      setLoading(false)
    }

    initializeForm()
  }, [editCourse, course, setValue])

  // =========================
  // CHECK FORM UPDATED
  // =========================
  const isFormUpdated = () => {
    const currentValues = getValues()

    const currentCategory = currentValues.courseCategory
    const originalCategory =
      course?.category?._id || course?.category

    const currentBenefits = currentValues.courseBenefits || ""
    const originalBenefits = course?.whatYouWillLearn || ""

    const currentRequirements =
      currentValues.courseRequirements || []

    const originalRequirements =
      course?.instructions || []

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      Number(currentValues.coursePrice) !== Number(course.price) ||
      currentBenefits !== originalBenefits ||
      currentCategory !== originalCategory ||
      currentRequirements.toString() !==
        originalRequirements.toString()
    ) {
      return true
    }

    return false
  }

  // =========================
  // SUBMIT
  // =========================
  const onSubmit = async (data) => {
    console.log("REACT HOOK FORM DATA:", data)

    // =========================
    // EDIT COURSE
    // =========================
    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No Changes made so far")
        return
      }

      const formData = new FormData()

      formData.append("courseId", course._id)

      if (data.courseTitle !== course.courseName) {
        formData.append("courseName", data.courseTitle)
      }

      if (
        data.courseShortDesc !==
        course.courseDescription
      ) {
        formData.append(
          "courseDescription",
          data.courseShortDesc
        )
      }

      if (
        Number(data.coursePrice) !==
        Number(course.price)
      ) {
        formData.append("price", data.coursePrice)
      }

      if (
        data.courseBenefits !==
        course.whatYouWillLearn
      ) {
        formData.append(
          "whatYouWillLearn",
          data.courseBenefits
        )
      }

      const originalCategory =
        course.category?._id || course.category

      if (data.courseCategory !== originalCategory) {
        formData.append(
          "category",
          data.courseCategory
        )
      }

      const originalRequirements =
        course.instructions || []

      if (
        data.courseRequirements.toString() !==
        originalRequirements.toString()
      ) {
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        )
      }

      setLoading(true)

      const result = await editCourseDetails(
        formData,
        token
      )

      setLoading(false)

      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }

      return
    }

    // =========================
    // CREATE NEW COURSE
    // =========================
    const formData = new FormData()

    formData.append("courseName", data.courseTitle)
    formData.append(
      "courseDescription",
      data.courseShortDesc
    )
    formData.append("price", data.coursePrice)
    formData.append(
      "whatYouWillLearn",
      data.courseBenefits
    )
    formData.append(
      "category",
      data.courseCategory
    )
    formData.append(
      "instructions",
      JSON.stringify(data.courseRequirements)
    )
    formData.append(
      "status",
      COURSE_STATUS.DRAFT
    )
    formData.append(
      "thumbnailImage",
      data.courseImage
    )

    setLoading(true)

    const result = await addCourseDetails(
      formData,
      token
    )

    setLoading(false)

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="courseTitle"
          className="text-sm font-medium text-richblack-5"
        >
          Course Title
          <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", {
            required: true,
          })}
          className="w-full rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 outline-none placeholder:text-richblack-400"
        />

        {errors.courseTitle && (
          <span className="text-xs text-pink-200">
            Course Title is Required**
          </span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="courseShortDesc"
          className="text-sm font-medium text-richblack-5"
        >
          Course Short Description
          <sup className="text-pink-200">*</sup>
        </label>

        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", {
            required: true,
          })}
          className="min-h-[120px] w-full resize-none rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 outline-none placeholder:text-richblack-400"
        />

        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">
            Course Description is required**
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="coursePrice"
          className="text-sm font-medium text-richblack-5"
        >
          Course Price
          <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />

          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-lg bg-richblack-700 p-3 pl-9 text-sm text-richblack-5 outline-none placeholder:text-richblack-400"
          />
        </div>

        {errors.coursePrice && (
          <span className="text-xs text-pink-200">
            Course Price is Required**
          </span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="courseCategory"
          className="text-sm font-medium text-richblack-5"
        >
          Course Category
          <sup className="text-pink-200">*</sup>
        </label>

        <select
          id="courseCategory"
          {...register("courseCategory", {
            required: true,
          })}
          className="w-full rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 outline-none"
        >
          <option value="" disabled>
            Choose a Category
          </option>

          {!loading &&
            courseCategories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span className="text-xs text-pink-200">
            Course Category is Required
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="courseBenefits"
          className="text-sm font-medium text-richblack-5"
        >
          Benefits of the course
          <sup className="text-pink-200">*</sup>
        </label>

        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", {
            required: true,
          })}
          className="min-h-[120px] w-full resize-none rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 outline-none placeholder:text-richblack-400"
        />

        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">
            Benefits of the course are required**
          </span>
        )}
      </div>

      {/* Requirements */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        initialValue={
          editCourse
            ? course?.instructions || []
            : []
        }
      />

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 pt-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-md bg-richblack-300 px-5 py-2.5 text-sm font-medium text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn
          text={
            !editCourse
              ? "Next"
              : "Save Changes"
          }
        />
      </div>
    </form>
  )
}

export default CourseInformationForm