import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import * as action from '../actions'
import ImgsViewer from 'react-images-viewer'
import { Button, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { DataValue } from "utils";


function SingleKYCDetails(props) {
    const dispatch = useDispatch()

    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const [rejectReason, setRejectReason] = useState('')
    const [viewerIsOpen, setViewerIsOpen] = useState(false)
    const [imageToOpen, setImageToOpen] = useState(null)
    const [caption, setCaption] = useState('')

    const { singleKYC = {}, isLoading = false } = useSelector(state => state.KYC) || {}
    const { data = {} } = singleKYC || {}
    const { kycId } = props.match.params;
    const { KycNotification } = props

    useEffect(() => {
        dispatch(action.geyKYCByID(kycId))
    }, [])

    const isValid = () => {
        if (!typeSelected) return false
        if (typeSelected == 'Reject') {
            if (!rejectReason) return false
            return true
        } else {
            return true
        }
    }

    const handleRadio = (event) => {
        setTypeSelected(event.target.value);
        if (typeSelected === 'Accept') setRejectReason('')
    }

    const handleChange = (e) => {
        const { value = "" } = e.target
        setRejectReason(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            is_kyc_approved: typeSelected == 'Accept' ? "Approve" : "Reject",
            kyc_feedback: rejectReason,
            is_approved: typeSelected == 'Accept' ? true : false
        }
        dispatch(action.UpdateKYC(formData, kycId))
            .then(({res = ''}) => {
                props && props.toast && props.toast.success(res || "KYC Updated successfully");
                dispatch(action.geyKYCByID(kycId))
            })
            .catch(({ message = "" }) => {
                props.toast.error(message || 'Oops! Something went wrong')
            })
    }

    const viewerOpen = (currImg, caption) => {
        setImageToOpen(currImg)
        setViewerIsOpen(true)
        setCaption(caption)
    }

    const closeViewer = () => {
        setViewerIsOpen(false)
        setImageToOpen(null)
        setCaption('')
    }


    return (
        <div className="user-page">
            {/* {KycNotification} */}
            <div className="category-page">
                <Grid container spacing={3} className="mb-3 heading-sec d-flex align-items-center justify-content-end" >
                    <Grid item xs={12} sm={12} md={12} lg={12} className="align-self-center heading-top">
                        <h5 className="page-heading">
                            <KeyboardBackspaceIcon onClick={() => props.history.goBack()} />
                            <span className="page-heading" >{isLoading ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> :  DataValue(data?.name)} </span>
                        </h5>
                    </Grid>
                </Grid>

                <div className="category-grid" >
                    {true ?
                        <Grid container spacing={4} className="category-section">
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Mobile Number: </label>
                                    <strong> {DataValue(data?.mobile_number)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Email: </label>
                                    <strong> {DataValue(data?.email_id)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Pan Card: </label>
                                    <strong> {DataValue(data?.pan_card_number)} </strong>
                                    {data?.pan_card_link ? <img className="popup-img" src={data?.pan_card_link} alt="" width={60} onClick={() => viewerOpen(data?.pan_card_link, data?.pan_card_number)} /> : '-'}

                                </p>  
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Account Number: </label>
                                    <strong> {DataValue(data?.account_number)} </strong>
                                    {data?.account_number_link ? <img className="popup-img" src={data?.account_number_link} alt="" width={60} onClick={() => viewerOpen(data?.account_number_link, data?.account_number)} /> : '-'}

                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Aadhar Number: </label>
                                    <strong> {DataValue(data?.aadhar_number)} </strong>
                                    {/* {data?.account_number_link ? <img className="popup-img" src={data?.account_number_link} alt="" width={60} onClick={() => viewerOpen(data?.account_number_link, data?.aadhar_number)} /> : '-'} */}

                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Demat Number: </label>
                                    <strong> {DataValue(data?.demat_acc_no)} </strong>
                                    {data?.demat_screenshot ? <img className="popup-img" src={data?.demat_screenshot} alt="" width={60} onClick={() => viewerOpen(data?.demat_screenshot, data?.demat_acc_no)} /> : '-'}

                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Nominee Name: </label>
                                    <strong> {DataValue(data?.nominee_name)} </strong>
                                </p>
                            </Grid>
                        </Grid>

                        :
                        <CustomLoader />
                    }

                    {
                        data?.is_kyc_approved === 'Pending' ?
                            <div>
                                <h6 className="mt-5" >KYC Status</h6>
                                <FormControl className="m-2" >
                                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                        {
                                            types.map((type, i) => {
                                                return (
                                                    <FormControlLabel value={type}
                                                        onChange={handleRadio} error={'errors.types'} name="credit"
                                                        control={<Radio color="primary" />} label={type} />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>

                                {
                                    typeSelected == 'Reject' ?
                                        <Grid item xs={12} sm={12}>
                                            <InputField
                                                type="textarea"
                                                name='rejectReason'
                                                value={rejectReason}
                                                label="Reason"
                                                placeholder="Please enter Reason"
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        :
                                        null
                                }
                                <Button onClick={handleSubmit} className={`button-btn cat-button new-btn-color ${!isValid() ? 'disabled' : ''}`} disabled={!isValid()} > Submit</Button>
                            </div>
                            :
                            null
                    }
                </div>
            </div >
            <ImgsViewer
                imgs={[{ src: imageToOpen, caption }]}
                isOpen={viewerIsOpen}
                onClose={closeViewer}
                closeBtnTitle={'Close'}
                showImgCount={false}
                backdropCloseable={true}
            />
        </div >
    )
}

export default SingleKYCDetails