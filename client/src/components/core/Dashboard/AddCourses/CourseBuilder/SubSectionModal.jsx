import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { Form } from 'react-router-dom';
import {RxCross1} from "react-icons/rx"
import Upload from '../Upload';
import IconBtn from '../../../../common/IconsBtn';
import { useSelector } from 'react-redux';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors},
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl ) {
                return true;
            }
        else {
            return false;
        }

    }
    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);
        //API call
         const result = await updateSubSection(formData, token);

    if (result) {
        // result is the UPDATED SECTION
        const updatedCourseContent = course.courseContent.map((section) =>
            section._id === result._id
                ? result
                : section
        );

        dispatch(
            setCourse({
                ...course,
                courseContent: updatedCourseContent,
            })
        );
    }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {

        if(view)
            return;

        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                //edit krdo store me 
                handleEditSubSection();
            }
            return;
        }

        //ADD

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("timeDuration", data.timeDuration);
        formData.append("videoFile", data.lectureVideo);
        setLoading(true);
        //API CALL
        

        const result = await createSubSection(formData, token);

if (result) {
    const updatedCourseContent = course.courseContent.map((section) =>
        section._id === result._id ? result : section
    );

    dispatch(
        setCourse({
            ...course,
            courseContent: updatedCourseContent,
        })
    );
}
        setModalData(null);
        setLoading(false);

    }


  return (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center">

    {/* Blurred Background */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => (!loading ? setModalData(null) : {})}
    />

    {/* Modal */}
    <div className="relative z-10 w-11/12 max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl bg-richblack-800 p-6 shadow-2xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b border-richblack-600 pb-4">
        <p className="text-xl font-semibold text-richblack-5">
          {view && "Viewing"} 
          {add && "Adding"} 
          {edit && "Editing"} Lecture
        </p>

        <button
          type="button"
          onClick={() => (!loading ? setModalData(null) : {})}
          className="text-richblack-300 hover:text-richblack-5"
        >
          <RxCross1 size={22} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Video */}
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        />

        {/* Lecture Title */}
        <div>
          <label
            htmlFor="lectureTitle"
            className="mb-1 block text-sm text-richblack-5"
          >
            Lecture Title
          </label>

          <input
            id="lectureTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true })}
            className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 outline-none"
          />

          {errors.lectureTitle && (
            <span className="mt-1 text-xs text-pink-200">
              Lecture Title is required
            </span>
          )}
        </div>

        {/* Lecture Description */}
        <div>
          <label
            htmlFor="lectureDesc"
            className="mb-1 block text-sm text-richblack-5"
          >
            Lecture Description
          </label>

          <textarea
            id="lectureDesc"
            placeholder="Enter Lecture Description"
            {...register("lectureDesc", { required: true })}
            className="min-h-[130px] w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 outline-none"
          />

          {errors.lectureDesc && (
            <span className="mt-1 text-xs text-pink-200">
              Lecture Description is required
            </span>
          )}
        </div>

        {/* Time Duration */}
        <div>
          <label
            htmlFor="timeDuration"
            className="mb-1 block text-sm text-richblack-5"
          >
            Time Duration<sup>*</sup>
          </label>

          <input
            id="timeDuration"
            placeholder="Enter duration (e.g. 10:30)"
            {...register("timeDuration", { required: true })}
            className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 outline-none"
          />

          {errors.timeDuration && (
            <span className="mt-1 text-xs text-pink-200">
              Time Duration is required
            </span>
          )}
        </div>

        {/* Save Button */}
        {!view && (
          <div className="flex justify-end pt-2">
            <IconBtn
              text={
                loading
                  ? "Loading..."
                  : edit
                  ? "Save Changes"
                  : "Save"
              }
            />
          </div>
        )}

      </form>
    </div>
  </div>
)
}

export default SubSectionModal