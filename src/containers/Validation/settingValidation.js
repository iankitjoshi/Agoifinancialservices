import Joi from "joi";

export default function validateSettingInfo(data) {
  let isValid = true
  let newErrors = {}

  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .messages({
        "string.empty": `Name is required!`,
      }),

      mobNo: Joi
      .string()
      .required()
      .messages({
        "string.empty": `Mobile No. is required!`,
      }),

      email: Joi
      .string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
          "string.empty": `Email is required`,
          "string.email": "Please enter valid email address",
      }),
  }).validate(data, { abortEarly: false })

  const { error } = schema

  if (error) {
    isValid = false
    error.details.forEach(item => newErrors[item.context.key] = item.message)
  }

  return { isValid, errors: newErrors }
}