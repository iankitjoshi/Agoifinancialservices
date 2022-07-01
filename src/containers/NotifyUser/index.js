import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import InputField from '../../components/common/InputField'
import * as action from './actions'
import ImgsViewer from 'react-images-viewer'
import { CircularProgress, TextField, Button, FormControlLabel, Radio, FormControl, FormLabel, Grid } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import Notification from "components/common/Notification";
import { Autocomplete } from '@material-ui/lab';

function NotifyUser(props) {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [selectedGroup, setSelectedGroup] = useState([])
    const [searchingTimeout, setSearchingTimeout] = useState(null)

    let allGroups = [], isLoading = false
    const { userId } = props.match.params;

    useEffect(() => {

    })

    const isValid = () => {
        if (!message && !selectedGroup) {
            return true
        } else {
            return false
        }
    }


    const handleChange = (e) => {
        const { value = "" } = e.target
        setMessage(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            message
        }
        dispatch(action.CreateUser(formData))
            .then(({ res = "" }) => {
                props.toast.success(res || "User added successfully");
                props.onClose()
                props.afterAction()
            })
            .catch(({ message = "" }) => {
                props.toast.error(message || 'Oops! Something went wrong')
            })
    }

    const getGroupName = (e) => {
        const { value } = e.target;
        if (searchingTimeout)
            clearTimeout(searchingTimeout);

        // if (value.length != 1) {
        //     setSearchingTimeout(setTimeout(() =>
        //         dispatch(groupAction.SearchGroupByFilter({ term: value, limit: "all" }))
        //         , 100))
        // }

    }

    const selectAllGroup = (e, selectedGroup) => {
        setSelectedGroup(selectedGroup)
    }

    const selectGroup = (e, group) => {
        setSelectedGroup(group)
    }



    const allGrouplist = Array.isArray(allGroups) && allGroups.length ? allGroups : [] || [];
    let groupOption = [{ _id: 1, name: 'Select All', value: 'Select All' }, ...allGrouplist]
    if (selectedGroup && selectedGroup.length === allGrouplist.length) {
        groupOption = groupOption.slice(1)
    }

    return (
        <div className="user-page">
            <Notification />
            <div className="category-page user-notify">
                <div className="category-grid" >
                    <h5 className="text-centre mb-5" >Notify User:</h5>
                    <Grid container >
                        <Grid item xs={12} sm={12} lg={8} >
                            <Autocomplete
                                className="custom-autocomplete"
                                id="asynchronous-demo"
                                options={groupOption}
                                getOptionSelected={(option, value) => option?._id === value?._id}
                                value={selectedGroup}
                                getOptionLabel={(groups) => groups?.name}
                                onChange={(e, value) => {
                                    const isSelectAll = value.find(item => item.value === 'Select All')
                                    if (isSelectAll) {
                                        return selectAllGroup(e, allGrouplist)
                                    } else {
                                        selectGroup(e, value)
                                    }
                                }}
                                // onChange={(e, value) => selectGroup(e, value)}
                                fullWidth
                                limitTags={5}
                                filterSelectedOptions
                                multiple
                                loading={isLoading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="User Name"
                                        variant="outlined"
                                        name="parentCategory"
                                        // placeholder="Enter and select user name"
                                        value={selectedGroup && selectedGroup.name}
                                        className="width-drop-down cus-select-box"
                                        onChange={e => getGroupName(e)}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {isLoading ? <div className="contact-loader">
                                                        <CircularProgress size={15} />
                                                    </div> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} className="mt-5" >
                        <InputField
                            type="textarea"
                            width='68%'
                            name='message'
                            value={message}
                            label="Message"
                            placeholder="Please enter Message"
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Button onClick={handleSubmit} className={`button-btn cat-button new-btn-color mt-4 ${!isValid() ? 'disabled' : ''}`} disabled={!isValid()} > Submit</Button>

                </div>

            </div>
        </div>
    )
}

export default NotifyUser