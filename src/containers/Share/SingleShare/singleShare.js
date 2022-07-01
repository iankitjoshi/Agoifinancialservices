import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import * as action from '../actions'
import ImgsViewer from 'react-images-viewer'
import { Button, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
 

function SingleShareDetails(props) {
    const { KycNotification } = props

    const dispatch = useDispatch()

    const [viewerIsOpen, setViewerIsOpen] = useState(false)
    const [imageToOpen, setImageToOpen] = useState(null)
    const [caption, setCaption] = useState('')

    const { userId } = props.match.params;

    useEffect(() => {

    })

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

    const image = 'https://picsum.photos/200/300'

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
                                    {image ? <img className="popup-img" src={image} alt="" width={60} onClick={() => viewerOpen(image, 'episode')} /> : '-'}

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