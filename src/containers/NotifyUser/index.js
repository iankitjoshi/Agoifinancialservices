import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../components/common/InputField'
import * as action from './actions'
import * as userAction from '../User/actions'
import {
    CircularProgress, TextField, Button, TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody, Grid
} from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { Autocomplete } from '@material-ui/lab';
import { DataValue, timeFormat } from 'utils';
import NoDataFound from '../../components/common/NoDataFound';
import EnhancedTableHead from '../../components/common/EnhancedTableHead';
import _ from 'lodash'
import DataShowMore from "components/common/DataShowMore";
import CustomTablePagination from "components/common/CustomPagination";

const NotificationHeadCells = [
    { id: "index", numeric: false, disablePadding: false, label: "S.No." },
    { id: "createdAt", numeric: false, disablePadding: false, label: "Date" },
    { id: "message", numeric: false, disablePadding: false, label: "Notification" },
    { id: "message", numeric: false, disablePadding: false, label: "User Name" },
];

function NotifyUser(props) {
    const dispatch = useDispatch()

    const { userList = {} } = useSelector(state => state?.users) || {}
    const { total = "", current_page = "", data: UserList = [] } = userList || {}

    const { notificationList = {}, isLoading = false } = useSelector(state => state?.notifyUser) || {}
    const { data = [] } = notificationList || {}


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [currentPage, setCurrentPage] = useState(0)
    const [message, setMessage] = useState('')
    const [selectedUser, setSelectedGroup] = useState([])
    const [searchingTimeout, setSearchingTimeout] = useState(null)

    const { KycNotification } = props

    useEffect(() => {
        dispatch(action.getNotificationList())
        dispatch(userAction.getUserList())
    }, [])

    const isValid = () => {
        if (message && selectedUser.length) return true
        else return false
    }

    const handleChange = (e) => {
        const { value = "" } = e.target
        setMessage(value)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, currentPage, pageLimit) => {
        setCurrentPage(currentPage)
        dispatch(action.getNotificationList({ limit: rowsPerPage, page: currentPage + 1 }));
        props.history.replace(`/notify-user?page=${currentPage}&limit=${rowsPerPage}`)
    }

    const handleChangeRowsPerPage = (rowsPerPage) => {
        let { value = 10 } = rowsPerPage.target;
        value = value === "All" ? props.customer.length : value
        setRowsPerPage(value)
        setCurrentPage(0)
        dispatch(action.getNotificationList({ limit: value, start: currentPage }))
        props.history.replace(`/notify-user?page=${currentPage}&limit=${value}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user_id = selectedUser?.map((data) => { return data?._id })

        const formData = {
            user_id,
            message
        }
        dispatch(action.CreateNotification(formData))
            .then(({ res = "" }) => {
                props.toast.success(res || "Notification send successfully");
                dispatch(action.getNotificationList())
                setMessage('')
                setSelectedGroup([])
            })
            .catch(({ message = "" }) => {
                props.toast.error(message || 'Oops! Something went wrong')
            })
    }

    const getGroupName = (e) => {
        const { value } = e.target;
        if (searchingTimeout)
            clearTimeout(searchingTimeout);
    }

    const selectAllGroup = (e, selectedUser) => {
        setSelectedGroup(selectedUser)
    }

    const selectGroup = (e, group) => {
        setSelectedGroup(group)
    }



    const allUserlist = Array.isArray(UserList) && UserList.length ? UserList : [] || [];
    let groupOption = [{ id: 1, name: 'Select All', value: 'Select All' }, ...allUserlist]
    if (selectedUser && selectedUser?.length === allUserlist?.length) {
        groupOption = groupOption.slice(1)
    }

    return (
        <div className="user-page">
            {/* {KycNotification} */}
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
                                value={selectedUser}
                                getOptionLabel={(user) => _.isObject(user) && user?.name && user?.name || user?.mobile_number || ''}
                                onChange={(e, value) => {
                                    const isSelectAll = value.find(item => item.value === 'Select All')
                                    if (isSelectAll) {
                                        return selectAllGroup(e, allUserlist)
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
                                        value={selectedUser && selectedUser.name}
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
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    headCells={NotificationHeadCells}
                                />
                                <TableBody>
                                    {data?.length ?
                                        data?.map((item, index) => {
                                            const { is_live = "", name = "", user_id = [], message = "", _id = "", createdAt = "" } = item || {}
                                            return (
                                                <TableRow hover key={_id} className="cursor_default" >
                                                    <TableCell className="table-custom-width" data-title="S NO."> {index + 1}. </TableCell>
                                                    <TableCell className="table-custom-width" data-title="createdAt">{timeFormat(createdAt)} </TableCell>
                                                    <TableCell className="table-custom-width" data-title="message">{DataValue(message)} </TableCell>
                                                    <TableCell className="table-custom-width" data-title="message"> <DataShowMore data={user_id} {...props} /> </TableCell>

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
                        <CustomTablePagination
                            count={total || 10}
                            rowsPerPage={rowsPerPage || 10}
                            currentPage={currentPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                    :
                    <CustomLoader />
                }
            </div>
        </div>
    )
}

export default NotifyUser