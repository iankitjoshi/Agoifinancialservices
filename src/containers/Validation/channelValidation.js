import Validator, { error } from 'is_js'
import { isEmpty } from "lodash";

function validateChannel(data) {
    let errors = {}


    if (!/\S/.test(data.channelName)) {
        errors.channelName = "Channel Name is required!"
    }

    if (!/\S/.test(data.hostName)) {
        errors.hostName = "Host Name is required!"
    }

    if (!/\S/.test(data.image)) {
        errors.image = "Host Image is required!"
    }

    if (!/\S/.test(data.channelImage)) {
        errors.channelImage = "Image is required!"
    }

    return {
        isValid: isEmpty(errors),
        errors: errors
    };
}

export default validateChannel;


