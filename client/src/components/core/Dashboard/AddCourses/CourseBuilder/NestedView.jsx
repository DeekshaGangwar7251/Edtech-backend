import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'

import {
    deleteSection,
    deleteSubSection
} from '../../../../../services/operations/courseDetailsAPI'

import { setCourse } from '../../../../../slices/courseSlice'


const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null)


    // DELETE SECTION
    const handleDeleteSection = async (sectionId) => {

        const result = await deleteSection(
            {
                sectionId,
                courseId: course._id
            },
            token
        )

        if (result) {
            dispatch(setCourse(result))
        }

        setConfirmationModal(null)
    }


    // DELETE LECTURE
    const handleDeleteSubSection = async (subSectionId, sectionId) => {

        const result = await deleteSubSection(
            {
                subSectionId,
                sectionId,
            },
            token
        )

        if (result) {

            // result is the UPDATED SECTION
            const updatedCourseContent = course.courseContent.map(
                (section) =>
                    section._id === result._id
                        ? result
                        : section
            )

            dispatch(
                setCourse({
                    ...course,
                    courseContent: updatedCourseContent,
                })
            )
        }

        setConfirmationModal(null)
    }


    return (
        <div>

            {/* ================= COURSE CONTENT ================= */}

            <div className="rounded-lg bg-richblack-700 p-6 px-8">

                {course?.courseContent?.map((section) => (

                    <details
                        key={section._id}
                        open
                    >

                        {/* ================= SECTION HEADER ================= */}

                        <summary className="flex items-center justify-between gap-x-3 border-b-2">

                            <div className="flex items-center gap-x-3">

                                <RxDropdownMenu />

                                <p>
                                    {section.sectionName}
                                </p>

                            </div>


                            <div className="flex items-center gap-x-3">

                                {/* EDIT SECTION */}

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()

                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }}
                                >
                                    <MdEdit />
                                </button>


                                {/* DELETE SECTION */}

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()

                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",

                                            btn1Handler: () =>
                                                handleDeleteSection(
                                                    section._id
                                                ),

                                            btn2Handler: () =>
                                                setConfirmationModal(null),
                                        })
                                    }}
                                >
                                    <RiDeleteBin6Line />
                                </button>


                                <span>|</span>

                                <BiDownArrow
                                    className="text-xl text-richblack-300"
                                />

                            </div>

                        </summary>


                        {/* ================= SECTION CONTENT ================= */}

                        <div className="ml-6 mt-2 border-l-2 border-richblack-500 pl-4">


                            {/* ================= LECTURES ================= */}

                            {section?.subSection?.map((data) => (

                                <div
                                    key={data._id}
                                    onClick={() =>
                                        setViewSubSection(data)
                                    }
                                    className="flex items-center justify-between gap-x-3 border-b border-richblack-600 py-3"
                                >

                                    {/* Lecture name */}

                                    <div className="flex items-center gap-x-3">

                                        <RxDropdownMenu
                                            className="text-richblack-300"
                                        />

                                        <p className="text-sm text-richblack-100">
                                            {data.title}
                                        </p>

                                    </div>


                                    {/* Lecture actions */}

                                    <div className="flex items-center gap-x-3 text-richblack-300">

                                        {/* EDIT LECTURE */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })

                                            }}
                                        >
                                            <MdEdit />
                                        </button>


                                        {/* DELETE LECTURE */}

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation()

                                                setConfirmationModal({

                                                    text1: "Delete this Lecture",

                                                    text2: "Selected Lecture will be deleted",

                                                    btn1Text: "Delete",

                                                    btn2Text: "Cancel",

                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(
                                                            data._id,
                                                            section._id
                                                        ),

                                                    btn2Handler: () =>
                                                        setConfirmationModal(
                                                            null
                                                        ),
                                                })

                                            }}
                                        >
                                            <RiDeleteBin6Line />
                                        </button>

                                    </div>

                                </div>

                            ))}


                            {/* ================= ADD LECTURE BUTTON ================= */}

                            <button
                                onClick={() =>
                                    setAddSubSection(section._id)
                                }
                                className="mt-3 flex items-center gap-x-2 text-yellow-50"
                            >

                                <AiOutlinePlus />

                                <p>
                                    Add Lecture
                                </p>

                            </button>

                        </div>

                    </details>

                ))}

            </div>


            {/* =====================================================
                ADD LECTURE MODAL
                This is rendered OUTSIDE the course content.
                SubSectionModal itself will cover the whole screen.
            ===================================================== */}

            {addSubSection && (

                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />

            )}


            {/* ================= VIEW LECTURE ================= */}

            {viewSubSection && (

                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />

            )}


            {/* ================= EDIT LECTURE ================= */}

            {editSubSection && (

                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />

            )}


            {/* ================= CONFIRMATION MODAL ================= */}

            {confirmationModal && (

                <ConfirmationModal
                    modalData={confirmationModal}
                />

            )}

        </div>
    )
}

export default NestedView