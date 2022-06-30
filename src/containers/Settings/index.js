import React, { useEffect, useState } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import InputField from '../../components/common/InputField'
import { Button } from '@material-ui/core'
import { updatePassword } from './actions'
import { useDispatch, useSelector } from 'react-redux'
import userImage from '../../assets/images/userImage.svg'
import validateSettingInfo from '../Validation/settingValidation'
import validatePasswordUpdate from '../Validation/passwordValidation'
import * as action from './actions'
import loader from '../../assets/images/loader.gif'
import editcatIcon from '../../assets/images/edit.svg'
import CustomTooltip from '../../components/common/ToolTip'
import CrossIcon from '../../assets/images/cross-black.svg'
import Notification from 'components/common/Notification'
// import loader from '../../assets/images/loader.gif'

const initInfo = {
    name: '',
    email: '',
    mobNo: '',
}

const initPassword = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export default function Settings(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [infoDetails, setInfoDetails] = useState({ ...initInfo })
    const [passwordUpdate, setPasswordUpdate] = useState({ ...initPassword })
    const [errors, setError] = useState({})
    const [passwordErr, setPasswordErr] = useState({})
    const [passwordChange, setPasswordChange] = useState(false)
    const [dataChange, setDataChange] = useState(false)


    const dispatch = useDispatch()
    const { admin = {}, isLoading = false } = useSelector(state => state?.admin) || {}

    const { image = '', contact_no = '', username = '', email = '', id = "", image_key = "" } = admin || {}

    useEffect(() => {
        dispatch(action.GetAdminDetails())
    }, [])

    useEffect(() => {
        if (isEdit) {
            setInfoDetails({
                ...infoDetails, mobNo: contact_no, email, name: username
            })
        }
    }, [isEdit])

    const handleEditClick = () => {
        setIsEdit(!isEdit)
        if (passwordChange) {
            setPasswordChange(false)
        }
        setError({})
    }

    const handleInfoChange = ({ target: { name = "", value = "" } }) => {
        let numberReg = /^[0-9]{0,10}$/;

        if (name == "mobNo" && value && !numberReg.test(value)) return;

        if (name == "mobNo" && value.length > 10) return;
        setInfoDetails({ ...infoDetails, [name]: value })
        setError({ ...errors, [name]: '' })
        setDataChange(true)
    }

    const handlePasswordChange = ({ target: { name = "", value = "" } }) => {
        setPasswordUpdate({ ...passwordUpdate, [name]: value })
        setPasswordErr({ ...passwordErr, [name]: '' })
        setDataChange(true)
    }

    const isValid = () => {
        const { isValid = true, errors = {} } = validateSettingInfo({ ...infoDetails })
        setError(errors)
        return isValid
    }

    const passwordValid = () => {
        const { isValid = true, passwordErr = {} } = validatePasswordUpdate({ ...passwordUpdate })
        setPasswordErr(passwordErr)
        return isValid
    }

    const passworsCancel = () => {
        setPasswordChange(!passwordChange)
        setPasswordErr({})
    }

    const handleWithPassword = (e) => {
        e.preventDefault()
        if (isValid() && passwordValid()) {
            const formData = {

            }

            if (dataChange) {
                dispatch(action.UpdateSetting(formData))
                    .then(response => {
                        dispatch(action.GetAdminDetails())
                        props.toast.success(response.message || 'Profile information updated successfully!')
                        setIsEdit(false)
                        setDataChange(false)
                    })
                    .catch(err => {
                        props.toast.error((err?.response?.data?.message) || "Something went wrong.")
                    })
                return
            } else {
                setIsEdit(false)
                return
            }
        }
    }




    return (
        <div className="settings-page">
            <Notification />
            <div className="setting-top">
                <Grid container >
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <h6 className="page-heading"> Settings </h6>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} className="text-right settings-btn">
                        <Button onClick={handleEditClick} disabled={isLoading}>{isEdit ? 'Cancel' : 'Edit'}</Button>
                    </Grid>
                </Grid>
            </div>
            {!isLoading ?
                <div className="settings-fields">
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <form >
                                <p>
                                    <span>Name</span>
                                    {isEdit ?
                                        <InputField value={infoDetails.name} name="name" error={errors.name} autoFocus onChange={handleInfoChange} />
                                        :
                                        <label> {username || '-'} </label>
                                    }
                                </p>

                                <p>
                                    <span>Email</span>
                                    {isEdit ?
                                        <InputField value={infoDetails.email} name="email" error={errors.email} onChange={handleInfoChange} />
                                        :
                                        <label> {email || '-'} </label>
                                    }
                                </p>

                                <p>
                                    <span>Mobile No.</span>
                                    {isEdit ?
                                        <InputField value={infoDetails.mobNo} name="mobNo" error={errors.mobNo} onChange={handleInfoChange} />
                                        :
                                        <label> {contact_no || '-'} </label>
                                    }
                                </p>

                                <p>
                                    <span>Password</span>
                                    <label> *********** </label>
                                    {isEdit ? <Button className="button-btn change-btn new-btn-color" onClick={passworsCancel} > {passwordChange ? 'Cancel' : 'Change'} </Button> : ''}
                                </p>

                                {passwordChange ?
                                    <div>
                                        <p>
                                            <span>Current Password</span>
                                            <InputField value={infoDetails.currentPassword} className="new-input" name="currentPassword" error={passwordErr.currentPassword} type="password" onChange={handlePasswordChange} />
                                        </p>
                                        <p>
                                            <span>New Password</span>
                                            <InputField value={infoDetails.newPassword} name="newPassword" type="password" error={passwordErr.newPassword} onChange={handlePasswordChange} />
                                        </p>
                                        <p>
                                            <span>Confirm Password</span>
                                            <InputField value={infoDetails.confirmPassword} name="confirmPassword" type="password" error={passwordErr.confirmPassword} onChange={handlePasswordChange} />
                                        </p>
                                    </div>
                                    :
                                    ''
                                }
                            </form>

                            {isEdit ? <Button className="button-btn  new-btn-color" onClick={handleWithPassword} >{isLoading ? <CircularProgress /> : 'Update'} </Button> : ''}
                        </Grid>
                    </Grid>
                </div>
                :
                <div className="table-loader">
                    <img src={loader} />
                </div>
            }
        </div>
    )
}