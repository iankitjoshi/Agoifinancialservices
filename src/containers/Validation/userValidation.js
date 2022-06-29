import * as EmailValidator from 'email-validator';
import { isEmpty } from "lodash";

function userValidation(data) {
    let errors = {}
    let valid = true;


    if (!/\S/.test(data.email)) {
        errors.email = "Episode is required!"
    }

    if (!EmailValidator.validate(data.email)) {
        errors.email = "Please enter a valid email ID!"
        valid = false;
    }

    if (!/\S/.test(data.name)) {
        errors.name = "User name is required!"
    }

    if (!/\S/.test(data.mobile)) {
        errors.mobile = "Mobile no. is required!"
    }

    if(data.mobile && data.mobile.length !== 10 ){
        errors.mobile = "Please enter valid mobile no.!"
    }

    if(!data.update){
        if (!/\S/.test(data.password)) {
            errors.password = "Password is required!"
        }
    }
    
    return {
        isValid: isEmpty(errors),
        errors: errors
    };
}

export default userValidation;

// import Joi from "joi";

// export default function userValidation(data) {
//   let isValid = true
//   let newErrors = {}

//   const schema = Joi.object({
//     name: Joi
//       .string()
//       .required()
//       .messages({
//         "string.empty": `User name is required!`,
//       }),

//       mobile: Joi
//       .string()
//       .required()
//       .messages({
//         "string.empty": `Mobile No. is required!`,
//       }),

//       password: Joi
//       .string()
//       .required()
//       .messages({
//         "string.empty": `Password is required!`,
//       }),

//       email: Joi
//       .string()
//       .required()
//       .email({ tlds: { allow: false } })
//       .messages({
//           "string.empty": `Email is required!`,
//           "string.email": "Please enter a valid email ID!",
//       }),

//       update: Joi
//       .any()
//       .allow()

//   }).validate(data, { abortEarly: false })

//   const { error } = schema

//   if (error) {
//     isValid = false
//     error.details.forEach(item => newErrors[item.context.key] = item.message)
//   }

//   return { isValid, errors: newErrors }
// }