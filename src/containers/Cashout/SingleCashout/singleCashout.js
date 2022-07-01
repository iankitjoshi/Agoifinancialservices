import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import * as action from '../actions'
import { Button, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
 

function SingleCashoutDetails(props) {
    const dispatch = useDispatch()

    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const [rejectReason, setRejectReason] = useState('')

    const { userId } = props.match.params;
    const { KycNotification } = props


    useEffect(() => {

    })

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
    }

    const handleChange = (e) => {
        const { value = "" } = e.target
        setRejectReason(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            typeSelected,
            rejectReason
        }
        // dispatch(action.CreateUser(formData))
        //     .then(({ res = "" }) => {
        //         props.toast.success(res || "User added successfully");
        //         props.onClose()
        //         props.afterAction()
        //     })
        //     .catch(({ message = "" }) => {
        //         props.toast.error(message || 'Oops! Something went wrong')
        //     })
    }

    return (
        <div className="user-page">
            {KycNotification}
            <div className="category-page">
                <Grid container spacing={3} className="mb-3 heading-sec d-flex align-items-center justify-content-end" >
                    <Grid item xs={12} sm={12} md={12} lg={12} className="align-self-center heading-top">
                        <h5 className="page-heading">
                            <KeyboardBackspaceIcon onClick={() => props.history.goBack()} />
                            <span className="page-heading" >{false ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> : 'csdc'} </span>
                        </h5>
                    </Grid>
                </Grid>

                <div className="category-grid" >
                    {true ?
                        <Grid container spacing={4} className="category-section">
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong> Ankit Joshi </strong>
                                </p>
                            </Grid>

                        </Grid>

                        :
                        <CustomLoader />
                    }
                    <h6 className="mt-5" >Cashout Status</h6>
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
                </div>
                <Button onClick={handleSubmit} className={`button-btn cat-button new-btn-color ${!isValid() ? 'disabled' : ''}`} disabled={!isValid()} > Submit</Button>
            </div>
        </div>
    )
}

export default SingleCashoutDetails