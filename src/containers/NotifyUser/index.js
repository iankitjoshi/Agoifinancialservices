import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../components/common/InputField'
import * as action from './actions'
import {
    CircularProgress, TextField, Button, TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody, Grid
} from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import DummyData from './DummyData.json'
import { Autocomplete } from '@material-ui/lab';
import { positiveAmount } from 'utils';
import { NoDataFound } from 'components/common/NoDataFound';
import EnhancedTableHead from '../../components/common/EnhancedTableHead';

const NotificationHeadCells = [
    { id: "index", numeric: false, disablePadding: false, label: "S.No." },
    { id: "is_active", numeric: false, disablePadding: false, label: "Date" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Notification" },
];

function NotifyUser(props) {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [selectedGroup, setSelectedGroup] = useState([])
    const [searchingTimeout, setSearchingTimeout] = useState(null)

    let allGroups = DummyData, isLoading = false
    const { userId } = props.match.params;
    const { KycNotification } = props

    console.log(DummyData, 'DummyData')

    useEffect(() => {

    })

    const isValid = () => {
        if (message && selectedGroup.length) return true
        else return false
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
    let groupOption = [{ id: 1, name: 'Select All', value: 'Select All' }, ...allGrouplist]
    if (selectedGroup && selectedGroup.length === allGrouplist.length) {
        groupOption = groupOption.slice(1)
    }

    return (
        <div className="user-page">
            {KycNotification}
            <div className="category-page user-notify">
                <div className="category-grid" >
                    <h5 className="text-centre mb-5" >Notify User:</h5>
                    <Grid container >
                        <Grid item xs={12} sm={12} lg={8} >
                            <Autocomplete
                                className="custom-autocomplete"
                                id="asynchronous-demo"
                                options={groupOption}
                                getOptionSelected={(option, value) => option?.id === value?.id}
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

                    <Grid item xs={12} sm={12} lg={8} className="mt-3" >
                        <InputField
                            type="textarea"
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
            <span className="page-heading" >All Notification History </span>
            <div className="cust-table mt-3 mb-3">
                {!isLoading ?
                    <div>
                        <TableContainer className={`${props?.classes?.container} mt-2`}>
                            <Table className="table-program" stickyHeader aria-label="sticky table" id="customer-table">
                                <EnhancedTableHead
                                    headCells={NotificationHeadCells}
                                />
                                <TableBody>
                                    {true ?
                                        [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                                            const { is_live = "", name = "", email = "", phone = "", id = "", is_active = "" } = item || {}
                                            return (
                                                <TableRow hover key={id} className="cursor_default" >
                                                    <TableCell className="table-custom-width" data-title="S NO."> {index + 1}. </TableCell>
                                                    <TableCell className="table-custom-width" data-title="USER NAME">22/01/2021 </TableCell>
                                                    <TableCell className="table-custom-width" data-title="EMAIL">In publishing and graphic design, </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={NotificationHeadCells.length + 1} className="text-center"> <NoDataFound /> </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    :
                    <CustomLoader />
                }
            </div>
        </div>
    )
}

export default NotifyUser