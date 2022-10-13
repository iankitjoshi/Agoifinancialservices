import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import * as action from '../actions'
import ImgsViewer from 'react-images-viewer'
import { Grid } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { DataValue, isJson, positiveAmount } from "utils";


function SingleShareDetails(props) {
    const { KycNotification } = props

    const dispatch = useDispatch()

    const { singleShare = {}, isLoading = false } = useSelector(state => state.share) || {}
    const { data = {} } = singleShare || {}

    const [viewerIsOpen, setViewerIsOpen] = useState(false)
    const [imageToOpen, setImageToOpen] = useState(null)
    const [caption, setCaption] = useState('')

    const { shareId } = props.match.params;

    useEffect(() => {
        dispatch(action.getShareByID(shareId))
    }, [])

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
                            <span className="page-heading" >{isLoading ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> : data?.stock_name} </span>
                        </h5>
                    </Grid>
                </Grid>
                <div className="category-grid" >
                    {!isLoading ?
                        <Grid container spacing={4} className="category-section">
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Share ID: </label>
                                    <strong> {DataValue(data?.stock_sp_id)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Face Value: </label>
                                    <strong> {positiveAmount(data?.face_value)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Price Per Share: </label>
                                    <strong> {positiveAmount(data?.price_per_lot)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label>  Status: </label>
                                    <strong> {DataValue(data?.stock_status)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Company Type: </label>
                                    <strong> {DataValue(data?.companyType)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label>  Quantity: </label>
                                    <strong> {DataValue(data?.share_per_lot)} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label>  Available On: </label>

                                    <strong> {isJson(data?.available_on) ? JSON.parse(data?.available_on).join(', ') : '-'} </strong>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label>  Icon: </label>
                                    {data?.stock_icon ? <img className="popup-img" src={data?.stock_icon} alt="" width={60} onClick={() => viewerOpen(data?.stock_icon, data?.stock_name)} /> : '-'}
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <p>
                                    <label>  Discription: </label>
                                    <strong> {DataValue(data?.discription)} </strong>
                                </p>
                            </Grid>
                        </Grid>

                        :
                        <CustomLoader />
                    }
                </div>
            </div>
            <ImgsViewer
                imgs={[{ src: imageToOpen, caption }]}
                isOpen={viewerIsOpen}
                onClose={closeViewer}
                closeBtnTitle={'Close'}
                showImgCount={false}
                backdropCloseable={true}
            />
        </div>
    )
}

export default SingleShareDetails