import Joi from "joi";

export default function validatePasswordUpdate(data) {
  let isValid = true
  let newErrors = {}

  const schema = Joi.object({
    currentPassword: Joi
      .string()
      .required()
      .messages({
        "string.empty": `Current password is required!`,
      }),
    newPassword: Joi
      .string()
      .required()
      .messages({
        "string.empty": `New password is required!`
      }),
    confirmPassword: Joi
      .any()
      .required()
      .valid(Joi.ref('newPassword'))
      .messages({
        "string.empty": `Confirm password is required!`,
        "any.only": `Password does not match!`
      })
  }).validate(data, { abortEarly: false })

  const { error } = schema

  if (error) {
    isValid = false
    error.details.forEach(item => newErrors[item.context.key] = item.message)
  }

  return { isValid, passwordErr: newErrors }
}