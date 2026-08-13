import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconsBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
  }, [course]);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    if (
      course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="w-full text-richblack-5">

      {/* Course Builder Card */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">

        {/* Heading */}
        <h2 className="mb-5 text-lg font-medium text-richblack-5">
          Course Builder
        </h2>

        {/* Section Form */}
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label
              htmlFor="sectionName"
              className="mb-2 block text-sm text-richblack-5"
            >
              Section name <sup className="text-pink-200">*</sup>
            </label>

            <input
              id="sectionName"
              placeholder="Add a section to build your course"
              {...register("sectionName", { required: true })}
              className="w-full rounded-md bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 focus:ring-1 focus:ring-yellow-50"
            />

            {errors.sectionName && (
              <span className="mt-1 block text-xs text-pink-200">
                Section Name is required
              </span>
            )}
          </div>

          {/* Create Section */}
          <div className="mt-5 flex items-center">
            <IconBtn
              type="submit"
              text={
                editSectionName
                  ? "Edit Section Name"
                  : "Create Section"
              }
              outline={true}
              customClasses="text-yellow-50"
            >
              <MdAddCircleOutline
                className="text-yellow-50"
                size={18}
              />
            </IconBtn>

            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="ml-5 text-sm text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Sections */}
        {course?.courseContent?.length > 0 && (
          <div className="mt-6">
            <NestedView
              handleChangeEditSectionName={
                handleChangeEditSectionName
              }
            />
          </div>
        )}
      </div>

      {/* Back / Next */}
      <div className="mt-8 flex items-center justify-end gap-x-4">

        <button
          type="button"
          onClick={goBack}
          className="cursor-pointer text-sm font-medium text-richblack-5 hover:text-yellow-50"
        >
          Back
        </button>

        <IconBtn
          text="Next"
          onclick={goToNext}
          customClasses="px-6 py-3"
        >
          <BiRightArrow />
        </IconBtn>

      </div>
    </div>
  );
};

export default CourseBuilderForm;