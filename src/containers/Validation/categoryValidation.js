import Joi from "joi";

export default function addCategoryValidation(data) {
    let isValid = true
    let errors = {}
    const schema = Joi.object({
        categoryName: Joi.string()
            .required()
            .messages({
                "string.empty": `Category name is required!`
            }),

        categoryImage: Joi.string()
            .required()
            .messages({
                "string.empty": `Image is required!`
            }),

    }).validate(data, { abortEarly: false })

    // if (!/\S/.test(data.categoryImage)) {
    //     errors.categoryImage = "Image is required!"
    // }

    const { error } = schema
    if (error) {
        isValid = false
        error.details.forEach(item => errors[item.context.key] = item.message)
    }
    return { isValid, errors }
}