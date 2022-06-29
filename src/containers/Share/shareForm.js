import React, { useEffect } from 'react'
import {
    Button, FormControl, Grid, CircularProgress, FormGroup,
    FormControlLabel, Checkbox
} from '@material-ui/core'
import { useState } from 'react'
import InputField from '../../components/common/InputField'
import userValidation from '../Validation/userValidation'
import * as action from './actions'
import { useDispatch, useSelector } from 'react-redux'
import CustomToolTip from '../../components/common/ToolTip'
import CachedIcon from '@material-ui/icons/Cached';
import cameraIcon from '../../assets/images/camera.svg'
import CrossIconWhite from '../../assets/images/cross-white.svg'


const ShareAvailablePlateform = [
    { id: 1, name: 'NSDL', check: false },
    { id: 2, name: 'CDSL', check: false },
]

const initialUserState = {
    shareName: '',
    shareId: '',
    companyType: '',
    companyState: '',
    faceValue: '',
    pricePerShare: '',
    shareAvailable: [...ShareAvailablePlateform],
    shareQuantity: '',
    description: ''
}



function AddShareForm(props) {
    const dispatch = useDispatch()
    const { isLoading = false } = useSelector(state => state.users) || {}
    const [shares, setUsers] = useState({ ...initialUserState })
    const [shareImage, setShareImage] = useState('')
    const [shareImgBinaryData, setShareImgBinaryData] = useState('')
    const [removeShareImg, setRemoveShareImg] = useState(false)

    const [errors, setError] = useState({})
    const [dataChange, setDataChange] = useState(false)

    const { update } = props

    useEffect(() => {
        const { userDetails, update } = props
        const { user_name = "", email = "", phone = "" } = userDetails

        if (update) {
            setUsers({ ...shares, name: user_name, email, mobile: phone })
        }
    }, [])

    const isValid = () => {
        const { isValid = true, errors = {} } = userValidation({ ...shares, update })
        setError(errors)
        return isValid;
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        let balanceRegex = /^(\d+(\.\d{0,5})?|\.?\d{1,2})$/;
        if (['faceValue', 'pricePerShare', 'shareQuantity'].includes(name) && value && !balanceRegex.test(value)) return;

        setUsers({ ...shares, [name]: value })
        setError({ ...errors, [name]: '' })
        setDataChange(true)
    }

    const handleShareImageChange = (e) => {
        let file = e?.target?.files[0]
        let imageSize = file && file?.size
        if (imageSize <= 2097152) {
            if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setShareImage(reader.result)
                        setShareImgBinaryData(Object.assign(file, { url: URL.createObjectURL(file) }))
                    }
                }
                reader && reader.readAsDataURL(e?.target?.files[0])
            }
            setError({ ...errors, shareImage: '' })
            setDataChange(true)
        } else {
            props.toast.error("Image maximum size is 2 MB")
        }
    }

    const handleRemoveShareImage = () => {
        setShareImage('')
        setRemoveShareImg(true)
    }

    const replaceShareImg = () => {
        setRemoveShareImg(true)
    }

    const handleSubmit = () => {
        const { name = "", email = "", password = "", mobile = "" } = shares
        const { toast, update, userDetails } = props
        const { id } = userDetails
        console.log(shares, 'shares')

        if (isValid()) {
            const formData = {
                shares
            }
            if (update) {
                if (dataChange) {
                    dispatch(action.UpdateUser(formData, id))
                        .then(({ res = "" }) => {
                            dispatch(action.getUserList({ limit: 25 }))
                            toast.success(res || "User updated successfully");
                            props.onClose()
                            setDataChange(false)
                            props.afterAction()
                        })
                        .catch(({ message = '' }) => {
                            toast.error(message || 'Oops! Something went wrong')
                        })
                    return
                } else {
                    setDataChange(false)
                    props.onClose()
                    props.afterAction()
                    return
                }
            }

            dispatch(action.CreateUser(formData))
                .then(({ res = "" }) => {
                    dispatch(action.getUserList({ limit: 25 }))
                    toast.success(res || "User added successfully");
                    props.onClose()
                    props.afterAction()
                })
                .catch(({ message = "" }) => {
                    toast.error(message || 'Oops! Something went wrong')
                })
        }
    }

    const handleChecked = (e,data) => {

        console.log(data)
    }

    return (
        <div className="cat-popup user-modal">
            <h6 className="page-heading">{props.update ? 'Update Share' : 'Add Share'}</h6>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={3} className="input-fields">
                    <Grid item xs={12} sm={6}>
                        <InputField name="shareName" label="Share Name" placeholder="Please enter Share Name"
                            value={shares.shareName} error={errors.shareName} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={shareImage ? "img-grid2" : "img-grid"} >
                            <img src={shareImage} alt="" id="img" className={shareImage ? "img-added" : "img-browse"} />
                            <div className="camera" style={{ display: 'inline-block' }}>
                                <label htmlFor="channel-img" >
                                    {shareImage ?
                                        <CustomToolTip title="Replace Image"><span className="replace-img" onClick={replaceShareImg} > <CachedIcon /> </span></CustomToolTip>
                                        :
                                        <CustomToolTip title="Add Image">   <span className="add-img">  <img src={cameraIcon} alt="" /></span></CustomToolTip>
                                    }
                                </label>
                                <input type="file" accept="image/jpeg, image/png" id="channel-img" onChange={(e) => handleShareImageChange(e)} hidden />
                            </div>
                            {shareImage ? <CustomToolTip title="Remove Image" > <img className="remove-img" src={CrossIconWhite} alt="" onClick={() => handleRemoveShareImage()} /> </CustomToolTip> : ''}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputField name="shareId" label="Share ID" placeholder="Please enter Share ID"
                            value={shares.shareId} error={errors.shareId} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup className="share-available" >
                            {
                                shares.shareAvailable.map(data => {
                                    return <FormControlLabel control={<Checkbox checked={data.check} onChange={(e) => handleChecked(e, data)} name={data.name} />} label={data.name} />

                                })
                            }
                        </FormGroup>

                        {/* <InputField name="shareAvailable" label="Share Available" placeholder="Please enter Share Available"
                            value={shares.shareAvailable} error={errors.shareAvailable} onChange={handleChange} required/> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputField name="companyType" label="Company Type" placeholder="Please enter Company Type"
                            value={shares.companyType} error={errors.companyType} onChange={handleChange} />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className="" fullWidth disabled={isLoading} >
                            <InputLabel id="channel">Company's Origin State</InputLabel>
                            {isLoading ? <div className="field-loader"> <CircularProgress color="primary" size={25} /> </div> : ''}
                            <Select
                                labelId="companyState"
                                id="companyState"
                                value={shares.companyState}
                                onChange={(e) => handleChange(e)}
                                label="company State"
                                name="companyState"
                            >
                                <MenuItem value="" disabled > <em>None</em> </MenuItem>
                                {
                                    StateName?.map(state => {
                                        return <MenuItem value={state} >{state}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <InputField name="faceValue" label="Face Value" placeholder="Please enter Face Value"
                            value={shares.faceValue} error={errors.faceValue} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputField name="pricePerShare" label="Price Per Share" placeholder="Please enter Price Per Share"
                            value={shares.pricePerShare} error={errors.pricePerShare} onChange={handleChange} required />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputField name="shareQuantity" label="Share Quantity" placeholder="Please enter Share Quantity"
                            value={shares.shareQuantity} error={errors.shareQuantity} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputField name="description" label="Description" placeholder="Please enter Description"
                            value={shares.description} error={errors.description} onChange={handleChange}
                            rows={3} required />
                    </Grid>

                </Grid>
            </form>
            <div className="cust-buttons justify-content-center text-center mt-4" >
                <Button onClick={() => props.onClose()} className="button-btn new-btn-color mr-2" >Close</Button>
                <Button onClick={handleSubmit} className='button-btn secondary-btn ml-2' disabled={isLoading} >
                    {isLoading ? <CircularProgress size="28px" color="white" /> : (props.update ? 'Update' : 'Add')}
                </Button>
            </div>
        </div>
    )
}

export default AddShareForm
