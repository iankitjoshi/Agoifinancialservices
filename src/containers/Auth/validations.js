import Joi from "joi";

export function validateLogin(data) {
  let isValid = true
  let newErrors = {}

  const schema = Joi.object({
    mobile_number: Joi
      .string()
      .required()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.empty": `Mobile Number is required!`,
        'string.pattern.base': `Phone number must have 10 digits.`
      }),
    password: Joi
      .string()
      .required()
      .messages({
        "string.empty": `Password is required!`
      })
  }).validate(data, { abortEarly: false })

  const { error } = schema

  if (error) {
    isValid = false
    error.details.forEach(item => newErrors[item.context.key] = item.message)
  }

  return { isValid, errors: newErrors }
}

