import React, { useEffect, useState } from "react"
import {
    Grid,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    withStyles,
    Card,
    Box,
    CardContent,
} from '@material-ui/core'
import { withTranslation } from "react-i18next"
import EnhancedTableHead from 'components/common/EnhancedTableHead'
import CustomTablePagination from 'components/common/CustomPagination';
import { useDispatch, useSelector } from "react-redux"
import * as action from './actions'
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import CustomDialogBox from "components/common/CustomDialogBox"
import { stableSort, getComparator, tablestyle, getTimeStamps, } from "utils"
import { dateFilter } from 'constant'
import loader from 'assets/images/loader.gif'
import IOSSwitch from "components/common/IOSSwitch";
import moment from 'moment'
import CustomSelect from 'components/common/CustomSelect'
import NoDataFound from "components/common/NoDataFound";
import Datepicker from "components/common/Datepicker";

const headCells = [
    { id: "index", numeric: false, disablePadding: false, label: "S.No." },
    { id: "is_active", numeric: false, disablePadding: false, label: "status" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Username" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Status" },
    { id: "authorizedCredit", numeric: false, disablePadding: false, label: "Mobile No." },
    { id: "group.name", numeric: false, disablePadding: false, label: "Live on TV" },
    { id: "a", numeric: false, disablePadding: false, label: "Action" },
];

function User(props) {
    const { toast } = props
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [currentPage, setCurrentPage] = useState(0)
    const [filter, setFilter] = useState({ label: 'Last 30 Days', value: 'last30Days' })
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [focusedInput, setFocusedInput] = useState(false)
    const [timeOut, setTimeOut] = useState(null)
    const [userFilterSelect, setUserFilterSelect] = useState("")
    const [addUserModal, setAddUserModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [openUserLiveModal, setOpenUserLiveModal] = useState(false)
    const [removeLiveConfirmModal, setRemoveLiveConfirmModal] = useState(false)


    const { userList = {}, isLoading = false } = useSelector(state => state.users) || {}

    const {  total = "", current_page = "" } = userList || {}

    const data = [
        {id : 1, name : 'a'},
        {id : 2, name : 'b'},
        {id : 3, name : 'ac'},
    ]

    useEffect(() => {
        if (!startDate || !endDate) return;
        getData()
    }, [startDate, endDate])

    useEffect(() => {
        if (filter?.value) {
            const { startDate: newStartDate, endDate: newEndDate } = getTimeStamps(filter.value, startDate, endDate)
            if (filter.value !== 'customDate') {
                setEndDate(moment(newEndDate))
                setStartDate(moment(newStartDate))
            }
        }
    }, [filter])

    const startDateValue = moment(startDate).startOf('day').valueOf()
    const endDateValue = moment(endDate).endOf('day').valueOf()

    function getData() {
        const data = {
            startDate: startDateValue,
            endDate: endDateValue,
        }
        dispatch(action.getUserByFilter({ startDate: data?.startDate, endDate: data?.endDate, limit: rowsPerPage, start: currentPage, term: search }))
    }

    function handleDateChange({ startDate, endDate }) {
        if (startDate) setStartDate(startDate)
        if (endDate) setEndDate(endDate)
    }

    const handleChange = (e) => {

        if (timeOut) {
            clearTimeout(timeOut);
        }
        const { name = "", value = "" } = e.target;

        setSearch(value)
        setTimeOut(setTimeOut(() => {
            searchUser(value)
        }, 700))
        props.history.replace(`/user?page=${0}&limit=${5}`)
    }

    const searchUser = (value) => {
        if (value.length != 1) {
            dispatch(action.getUserByFilter({ limit: rowsPerPage, start: currentPage, term: value, type: userFilterSelect }));
        }
    }

    const handleItemType = ({ target: { value } }) => {
        setUserFilterSelect(value)
        setSearch('')
        if (search !== '') (
            dispatch(action.getUserList())
        )
    }

    const deleteModal = (id) => {
        setUserId(id)
        setOpenDeleteModal(true)
    }

    const onUpdateStatus = (e, user) => {
        e.preventDefault();
        update(user)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, currentPage, pageLimit) => {
        setCurrentPage(currentPage)
        dispatch(action.getUserByFilter({ limit: rowsPerPage, page: currentPage + 1, term: search, startDate: startDateValue, endDate: endDateValue }));
        props.history.replace(`/user?page=${currentPage}&limit=${rowsPerPage}`)
    }

    const handleChangeRowsPerPage = (rowsPerPage) => {
        let { value = 10 } = rowsPerPage.target;
        value = value === "All" ? props.customer.length : value
        setRowsPerPage(value)
        setCurrentPage(0)
        dispatch(action.getUserByFilter({ limit: value, start: currentPage, term: search, startDate: startDateValue, endDate: endDateValue }))
        props.history.replace(`/user?page=${currentPage}&limit=${value}`)
    }

    const update = (user) => {
        let is_active = user?.is_active && JSON.parse(user?.is_active)
        dispatch(action.UpdateActiveUser({ ...user, is_active: (!JSON.parse(user.is_active)).toString() }))
            .then(() => {
                dispatch(action.getUserList({ limit: rowsPerPage, start: currentPage, startDate: startDateValue, endDate: endDateValue }))
                toast.success(`User has been ${is_active ? 'deactivated' : 'activated'} successfully!`)
                afterAction()
            })
            .catch(({ message = '' }) => {
                toast.error(message || 'Oops! Something went wrong')
            })
    }

    const deleteUser = () => {
        dispatch(action.DeleteUser(userId))
            .then(res => {
                dispatch(action.getUserList({ limit: rowsPerPage, start: currentPage, startDate: startDateValue, endDate: endDateValue }))
                toast.success("User has been deleted successfully")
                setOpenDeleteModal(false)
                afterAction()
            })
            .catch(({ message = '' }) => {
                toast.error(message || 'Oops! Something went wrong')
            })
    }

    const handleCloseAddUserModal = () => {
        setAddUserModal(false)
        setIsEdit(false)
        setUserDetails({})
    }

    const handleEditUser = (users) => {
        setUserDetails(users)
        setAddUserModal(true)
        setIsEdit(true)
    }

    const handleAddModal = () => {
        setAddUserModal(true)
    }

    const afterAction = () => {
        setSearch('')
        setUserFilterSelect('')
        setUserId(null)
    }

    const usersFilter = [
        { id: 1, value: 'user_name', label: 'Username' },
        { id: 3, value: 'email', label: 'Email' },
        { id: 4, value: 'mobile', label: 'Mobile Number' },
    ]

    const handleCloseUserLiveModal = () => {
        setOpenUserLiveModal(false)
    }

    const handleSingleUser = (e,item) => {
        const { id = "" } = item
        props.history.push(`/user/${id}`)
    }


    let labelData = usersFilter.find(item => item.value === userFilterSelect);

    return (
        <div className="user-page">
            <Grid container spacing={3} className="mb-3 heading-sec" >
                <Grid item xs={12} sm={12} md={12} lg={1} className="align-self-center">
                    <h5 className="page-heading" >Users</h5>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={11} className="custom-date-field d-flex align-items-center justify-content-end">
                    <Box className="custom-box" display="flex" justifyContent="flex-end" alignItems="center">
                        <CustomSelect
                            className="cust-select"
                            minWidth={180}
                            options={dateFilter}
                            placeholder="Filter"
                            isSearchable
                            onChange={(opt) => setFilter(opt)}
                            value={filter}
                        />
                        {
                            filter?.value !== "customDate" ?
                                ''
                                :
                                <div className="date-range-picker">
                                    <Datepicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                        handleDateChange={handleDateChange}
                                    />
                                </div>
                        }
                    </Box>
                </Grid>
            </Grid>

            <div className="cust-table">
                {!isLoading ?
                    <div>
                        <TableContainer className={`${props.classes.container} mt-2`}>
                            <Table className="table-program" stickyHeader aria-label="sticky table" id="customer-table">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {true ?
                                        stableSort(data || [], getComparator(order, orderBy)).map((item, index) => {
                                            const { is_live = "", name = "", email = "", phone = "", id = "", is_active = "" } = item || {}
                                            return (
                                                <TableRow hover key={id} className="cursor_default" onClick={(e) => handleSingleUser(e, item)} >
                                                    <TableCell className="table-custom-width" data-title="S NO.">{name}. </TableCell>
                                                    <TableCell className="table-custom-width" data-title="USER NAME"><IOSSwitch onChange={(e) => onUpdateStatus(e, item)} checked={is_active && JSON.parse(is_active)} /></TableCell>
                                                    <TableCell className="table-custom-width" data-title="USER NAME">csdc </TableCell>
                                                    <TableCell className="table-custom-width" data-title="EMAIL">csdcsd</TableCell>
                                                    <TableCell className="table-custom-width" data-title="STATUS">cscs </TableCell>
                                                    <TableCell className="table-custom-width" data-title="MOBILE NO."> cvfd </TableCell>
                                                    {/* <TableCell className="table-custom-width" data-title="ACTION">
                                                        <CustomToolTip title="Edit" >
                                                            <span className="edit-icon mr-2" onClick={() => handleEditUser(item)} >
                                                                <img src={editIcon} alt="" />
                                                            </span>
                                                        </CustomToolTip>
                                                        <CustomToolTip title="Delete" >
                                                            <span className="delete-icon" onClick={() => deleteModal(id)} >
                                                                <img src={deleteIcon} alt="" />
                                                            </span>
                                                        </CustomToolTip>
                                                    </TableCell> */}
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={headCells.length + 1} className="text-center"><NoDataFound /></TableCell>
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
                    <div className="table-loader">
                        <img src={loader} alt="" />
                    </div>
                }
            </div>

            <CustomDialogBox
                handleClose={() => setOpenDeleteModal(false)}
                confirmAction={deleteUser}
                open={openDeleteModal}
                title="Warning"
                dialogtext={`Are you sure you want to delete this user?`}
                isLoading={isLoading}
                text="Keep User"
            />

        </div>
    )
}

export default withTranslation("translations")(withStyles(tablestyle)(User));

function UserCardField(props) {
    return <Grid item xs={12} sm={3} md={3} lg={3}>
        <Card className="user-cards" >
            <CardContent>
                <Grid container>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <div className="user-card-img">
                            <img src={props.img} className="user-card-img" alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        <div className="user-card-connent" >
                            {props?.children}
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
}