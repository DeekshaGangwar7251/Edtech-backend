import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { useEffect } from 'react';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';


const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  }=useForm();

  const dispatch=useDispatch();
  const {course,editCourse}=useSelector((state)=>state.course);
  const[loading,setLoading]=useState(false);
  const [courseCategories,setCourseCategories]=useState([]);

  useEffect(()=>{
    const getCategories=async()=>{
      setLoading(true);
      const categories=await fetchCourseCategories();
      if(categories.length>0){
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      setValue("courseRequirements",course.instructions);
      setValue("courseImage",course.thumbnail);
    }
    getCategories();
  },[])

  const onSubmit=async(data)=>{

  }

  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}
       className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
       >
        <div>
          <label>Course Title*</label>
          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle",{required:true})}
            className='w-full'
          />
          { 
            errors.courseTitle &&(
              <span>Course Title is Required*</span>
            )
          }
        </div>


        <div>
          <label htmlFor='courseShortDesc'>Course Short Description*</label>
          <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc",{required:true})}
          className='min-h-[140px] w-full'
          />
          {
            errors.courseShortDesc && (<span>
              Course Description is required**
            </span>)
          }
        </div>

         <div className='relative'>
          <label htmlFor='coursePrice'>Course Price*</label>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice",{
              required:true,
              valueAsNumber:true
            })}
            className='w-full'
          />
          <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400"/>
          { 
            errors.coursePrice &&(
              <span>Course Price is Required*</span>
            )
          }
        </div>

        <div>
          <label htmlFor='courseCateogry'>Course Category*</label>
          <select 
           id='courseCategory' 
           defaultValue="" 
           {...register("courseCategory",{required:true})}
           >

            <option value="" disabled>Choose a Cateogry</option>
            {
              !loading && courseCategories.map((category,index)=>(
                <option key={index} value={category?._id}>
                   {category?.name}
                </option>
              ))
            }
           </select>

           errors.courseCateogry && (
            <span>
              Course Category is Required
            </span>
           )
        </div>

       </form>
    </div>
  )
}

export default CourseInformationForm