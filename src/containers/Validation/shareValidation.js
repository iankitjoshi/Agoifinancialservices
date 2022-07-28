import * as EmailValidator from 'email-validator';
import { isEmpty } from "lodash";
import _ from 'lodash'

function shareValidation(data) {
    let errors = {}
    let valid = true;

    let shareAvailableData = data?.shareAvailable?.map(share => share.check && share.name)
    shareAvailableData = _.compact(shareAvailableData)


    if (!/\S/.test(data.shareName)) {
        errors.shareName = "Share Name is required!"
    }
    if (!/\S/.test(data.shareId)) {
        errors.shareId = "Share ID is required!"
    }
    if (!/\S/.test(data.companyType)) {
        errors.companyType = "Company Type is required!"
    }
    if (!/\S/.test(data.faceValue)) {
        errors.faceValue = "Face Value is required!"
    }
    if (!/\S/.test(data.pricePerShare)) {
        errors.pricePerShare = "Price Per Share is required!"
    }
    if (!/\S/.test(data.shareQuantity)) {
        errors.shareQuantity = "Share Quantity is required!"
    }
    if (!/\S/.test(data.description)) {
        errors.description = "Description is required!"
    }
    if (!/\S/.test(data.shareImage)) {
        errors.shareImage = "Image is required!"
    }

    if (!(shareAvailableData.length)) {
        errors.shareAvailable = "Share available plateform is required!"
    }

    return {
        isValid: isEmpty(errors),
        errors: errors
    };
}

export default shareValidation;
