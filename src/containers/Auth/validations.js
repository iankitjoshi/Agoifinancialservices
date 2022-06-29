import Joi from "joi";

export function validateLogin(data) {
  let isValid = true
  let newErrors = {}

  const schema = Joi.object({
    email: Joi
      .string()
      .required()
      // .email({ tlds: { allow: false } })
      .messages({
        "string.empty": `Email ID is required!`,
        // "string.email": `Invalid email!`
      }),
    password: Joi
      .string()
      .required()
      .messages({
        "string.empty": `Password is required!`
      })
  }).validate(data, { abortEarly: false })

  const { error } = schema

  if(error) {
    isValid = false
    error.details.forEach(item => newErrors[item.context.key] = item.message)
  }

  return { isValid, errors: newErrors }
}