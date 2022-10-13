import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import * as action from '../actions'
import { Button, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { DataValue } from 'utils';


function SingleCashoutDetails(props) {
    const dispatch = useDispatch()

    const { singleCashout = {}, isLoading = false } = useSelector(state => state.cashout) || {}
    const { data = {} } = singleCashout || {}
    const { user_id = {} } = data || {}


    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const [rejectReason, setRejectReason] = useState('')

    const { cashoutId } = props.match.params;
    const { KycNotification } = props


    useEffect(() => {
        dispatch(action.geyCashoutByID(cashoutId))
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
            cashout_status: typeSelected == 'Accept' ? true : false,
            cashout_feedback: rejectReason
        }
        dispatch(action.UpdateCashOut(formData, cashoutId))
            .then(({ res = "" }) => {
                props.toast.success(res || "Cashout Status added successfully");
                dispatch(action.geyCashoutByID(cashoutId))
            })
            .catch(({ message = "" }) => {
                props.toast.error(message || 'Oops! Something went wrong')
            })
    }

    return (
        <div className="user-page">
            {/* {KycNotification} */}
            <div className="category-page">
                <Grid container spacing={3} className="mb-3 heading-sec d-flex align-items-center justify-content-end" >
                    <Grid item xs={12} sm={12} md={12} lg={12} className="align-self-center heading-top">
                        <h5 className="page-heading">
                            <KeyboardBackspaceIcon onClick={() => props.history.goBack()} />
                            <span className="page-heading" >{isLoading ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> : DataValue(user_id?.name)} </span>
                        </h5>
                    </Grid>
                </Grid>
                {!isLoading ?
                    <div className="category-grid" >

                        <Grid container spacing={4} className="category-section">
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Amount: </label>
                                    <strong> {DataValue(data?.cashout_amount)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Mobile Number: </label>
                                    <strong> {DataValue(user_id?.mobile_number)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Email: </label>
                                    <strong> {DataValue(user_id?.email_id)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Cashout Status: </label>
                                    <strong> {data?.cashout_status ? 'Success' : 'Pending/Reject'} </strong>
                                </p>
                            </Grid>
                        </Grid>


                        {
                            !data?.cashout_status ?
                                <div>
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
                                    <Button onClick={handleSubmit} className={`button-btn cat-button new-btn-color ${!isValid() ? 'disabled' : ''}`} disabled={!isValid()} > Submit</Button>

                                </div>
                                :
                                null
                        }

                    </div>
                    :
                    <CustomLoader />
                }
            </div>
        </div>
    )
}

export default SingleCashoutDetails