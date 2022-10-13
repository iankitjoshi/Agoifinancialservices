import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import * as action from '../actions'
import ImgsViewer from 'react-images-viewer'
import { Button, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { DataValue, positiveAmount } from "utils";
import { useLocation } from 'react-router';


function SingleOrderDetails(props) {
    const dispatch = useDispatch()

    const { singleOrder = {}, isLoading = false } = useSelector(state => state.order) || {}
    const { data = {} } = singleOrder || {}
    const { user_id = {}, stock_id = {} } = data || {}

    const paramData = useLocation().search;
    const tabNumber = new URLSearchParams(paramData).get('tab') || 0;
    const orderType = new URLSearchParams(paramData).get('orderType') || 0;


    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const [rejectReason, setRejectReason] = useState('')

    const { KycNotification } = props
    const { orderID } = props.match.params;

    useEffect(() => {
        dispatch(action.getOrderID(orderID))
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
            is_order_approved: typeSelected == 'Accept' ? true : false,
            order_feedback: rejectReason
        }
        dispatch(action.UpdateOrder(formData, orderID))
            .then(({ res = "" }) => {
                props.toast.success(res || "User added successfully");
                dispatch(action.getOrderID(orderID))

            })
            .catch(({ message = "" }) => {
                props.toast.error(message || 'Oops! Something went wrong')
            })
    }

    const handleNameClick = (_id) => {
        props.history.push(`/user/${_id}`)
    }

    return (
        <div className="user-page">
            {/* {KycNotification} */}
            <div className="category-page">
                <Grid container spacing={3} className="mb-3 heading-sec d-flex align-items-center justify-content-end" >
                    <Grid item xs={12} sm={12} md={12} lg={12} className="align-self-center heading-top">
                        <h5 className="page-heading">
                            <KeyboardBackspaceIcon onClick={() => props.history.goBack()} /> {' '}
                            <span className="page-heading" >{isLoading ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> : DataValue(user_id?.name)} </span>
                        </h5>
                    </Grid>
                </Grid>

                {!isLoading ?
                    <div className="category-grid" >
                        <Grid container spacing={4} className="category-section">
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Name: </label>
                                    <strong onClick={() => handleNameClick(user_id?._id)} style={{ fontSize: '15px', textDecoration: "underline", cursor: "pointer" }} > {DataValue(user_id?.name)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Order Amount: </label>
                                    <strong> {DataValue(data?.order_amount)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> No. of Stocks: </label>
                                    <strong> {DataValue(data?.no_of_stocks)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Price Per Share: </label>
                                    <strong> {positiveAmount(data?.price_per_share)} </strong>
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
                                    <label> Order Type: </label>
                                    <strong> {orderType ? orderType
                                        : tabNumber == '1' ? 'Purchase'
                                            : 'Sell'} </strong>
                                </p>
                            </Grid>

                        </Grid>


                        {
                            !data?.is_order_approved ?
                                <div>
                                    <h6 className="mt-5" >Order Status</h6>
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

export default SingleOrderDetails