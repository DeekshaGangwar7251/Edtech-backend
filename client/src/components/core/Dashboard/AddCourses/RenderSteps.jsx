import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className="w-full">

      {/* ================= STEP PROGRESS ================= */}
      <div className="mb-14 flex w-full items-start">

        {steps.map((item, index) => (
          <React.Fragment key={item.id}>

            {/* STEP */}
            <div className="flex min-w-[110px] flex-col items-center">

              {/* Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold
                  ${
                    step >= item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  }
                `}
              >
                {step > item.id ? (
                  <FaCheck className="text-sm" />
                ) : (
                  item.id
                )}
              </div>

              {/* Label */}
              <p
                className={`mt-3 whitespace-nowrap text-xs
                  ${
                    step >= item.id
                      ? "text-yellow-50"
                      : "text-richblack-400"
                  }
                `}
              >
                {item.title}
              </p>
            </div>

            {/* CONNECTING LINE */}
            {index !== steps.length - 1 && (
              <div className="mt-5 h-px flex-1 border-t border-dashed border-richblack-600" />
            )}

          </React.Fragment>
        ))}

      </div>

      {/* ================= STEP CONTENT ================= */}

      {step === 1 && <CourseInformationForm />}

      {step === 2 && <CourseBuilderForm />}

      {/* Step 3 will be added later */}
      {/* {step === 3 && <PublishCourse />} */}

    </div>
  );
};

export default RenderSteps;