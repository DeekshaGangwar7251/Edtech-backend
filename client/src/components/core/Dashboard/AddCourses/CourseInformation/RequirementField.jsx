
import React, { useEffect, useState } from "react"

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  initialValue = [],
}) => {
  const [requirement, setRequirement] = useState("")
  const [requirementList, setRequirementList] = useState(initialValue)

  // Register field
  useEffect(() => {
    register(name, {
      required: true,
    })
  }, [register, name])

  // Prefill requirements when editing
  useEffect(() => {
    if (Array.isArray(initialValue)) {
      setRequirementList(initialValue)
      setValue(name, initialValue)
    }
  }, [initialValue, name, setValue])

  // Keep React Hook Form updated
  useEffect(() => {
    setValue(name, requirementList)
  }, [requirementList, name, setValue])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      const updatedList = [
        ...requirementList,
        requirement.trim(),
      ]

      setRequirementList(updatedList)
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList]

    updatedRequirementList.splice(index, 1)

    setRequirementList(updatedRequirementList)
  }

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>

      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full"
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-richblack-5"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-300"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span>
          {label} is required
        </span>
      )}
    </div>
  )
}

export default RequirementField



