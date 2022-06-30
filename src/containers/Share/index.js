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
    InputAdornment,
    IconButton,
    Button,
} from '@material-ui/core'
import { withTranslation } from "react-i18next"
import EnhancedTableHead from 'components/common/EnhancedTableHead'
import CustomTablePagination from 'components/common/CustomPagination';
import InputField from "components/common/InputField"
import { useDispatch, useSelector } from "react-redux"
import * as action from './actions'
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import CustomDialogBox from "components/common/CustomDialogBox"
import { stableSort, getComparator, tablestyle, getTimeStamps, } from "utils"
import { dateFilter } from 'constant'
import editIcon from 'assets/images/editIcon.svg';
import deleteIcon from 'assets/images/deleteIcon.svg'
import totalUserIcon from 'assets/images/totalUserIcon.svg'
import userActiveIcon from 'assets/images/userActiveIcon.svg'
import userInActiveIcon from 'assets/images/userInActiveIcon.svg'
import moment from 'moment'
import CustomSelect from 'components/common/CustomSelect'
import UserLoader from "assets/images/userLoader.gif";
import CustomToolTip from "components/common/ToolTip";
import NoDataFound from "components/common/NoDataFound";
import Datepicker from "components/common/Datepicker";
import CustomModal from "components/common/CustomModal";
import AddShareForm from "./shareForm";
import ClearIcon from '@material-ui/icons/Clear';
import CustomLoader from "components/common/Loader";
import Notification from "components/common/Notification";


const headCells = [
    { id: "is_active", numeric: false, disablePadding: false, label: "Status" },
    { id: "index", numeric: false, disablePadding: false, label: "Image" },
    { id: "index", numeric: false, disablePadding: false, label: "Name" },
    { id: "is_active", numeric: false, disablePadding: false, label: "ID" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Price Per share" },
    { id: "a", numeric: false, disablePadding: false, label: "Action" },
];

function Shares(props) {
    const { toast } = props
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [shareId, setShareId] = useState(null)
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
    const [addShareModal, setAddShareModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [shareDetails, setShareDetails] = useState({})

    const { userList = {}, isLoading = false } = useSelector(state => state.users) || {}

    const { total = "", current_page = "" } = userList || {}

    const data = [
        { id: 1, name: 'Axis Bank', image: '', id: 'NJKNKCD778', price: 10 },
        { id: 2, name: 'Axis Bank', image: '', id: 'NJKNKCD778', price: 10 },
        { id: 3, name: 'Axis Bank', image: '', id: 'NJKNKCD778', price: 10 },
        { id: 4, name: 'Axis Bank', image: '', id: 'NJKNKCD778', price: 10 },
        { id: 5, name: 'Axis Bank', image: '', id: 'NJKNKCD778', price: 10 },
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
        // props.history.replace(`/shares?page=${0}&limit=${5}`)
    }

    const searchUser = (value) => {
        if (value.length != 1) {
            // dispatch(action.getUserByFilter({ limit: rowsPerPage, start: currentPage, term: value, type: userFilterSelect }));
        }
    }

    const deleteModal = (id) => {
        setShareId(id)
        setOpenDeleteModal(true)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, currentPage, pageLimit) => {
        setCurrentPage(currentPage)
        dispatch(action.getUserByFilter({ limit: rowsPerPage, page: currentPage + 1, term: search, startDate: startDateValue, endDate: endDateValue }));
        props.history.replace(`/shares?page=${currentPage}&limit=${rowsPerPage}`)
    }

    const handleChangeRowsPerPage = (rowsPerPage) => {
        let { value = 10 } = rowsPerPage.target;
        value = value === "All" ? props.customer.length : value
        setRowsPerPage(value)
        setCurrentPage(0)
        dispatch(action.getUserByFilter({ limit: value, start: currentPage, term: search, startDate: startDateValue, endDate: endDateValue }))
        props.history.replace(`/shares?page=${currentPage}&limit=${value}`)
    }


    const deleteUser = () => {
        dispatch(action.DeleteUser(shareId))
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
        setAddShareModal(false)
        setIsEdit(false)
        setShareDetails({})
    }

    const handleEditUser = (users) => {
        setShareDetails(users)
        setAddShareModal(true)
        setIsEdit(true)
    }

    const handleAddModal = () => {
        setAddShareModal(true)
    }

    const afterAction = () => {
        setSearch('')
        setUserFilterSelect('')
        setShareId(null)
    }

    const clearSearch = () => {
        setSearch('')
        // dispatch(action.SearchJuryByFilter())
    }


    return (
        <div className="user-page">
            <Notification />
            <Grid container spacing={3} className="mb-3 heading-sec" >
                <Grid item xs={12} sm={12} md={12} lg={1} className="align-self-center">
                    <h5 className="page-heading" >Shares</h5>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={11} className="custom-date-field d-flex align-items-center justify-content-end">
                    <Box className="cust-formfields">
                        <Grid item xs={12} sm={12} md={5} lg={5} className="custom-date-field d-flex align-items-center justify-content-end">
                            <InputField type="search" value={search} name={search} label={`Search share`} inputProps={{ maxlength: 40 }}
                                onChange={(e) => handleChange(e)} fullWidth/>
                        </Grid>
                    </Box>

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
                    <Button onClick={handleAddModal} className="button-btn cat-button new-btn-color" disabled={isLoading} > Add Share</Button>
                </Grid>
            </Grid>

            <Grid container className="user-grid" >
                <ShareCardField img={totalUserIcon}>
                    <h5>Total Shares</h5>
                    <h6>{isLoading ? <img src={UserLoader} alt="" className="user-loader-img" /> : 10}</h6>
                </ShareCardField>

                <ShareCardField img={userActiveIcon}>
                    <h5>Active Shares</h5>
                    <h6>{isLoading ? <img src={UserLoader} alt="" className="user-loader-img" /> : 8} </h6>
                </ShareCardField>

                <ShareCardField img={userInActiveIcon}>
                    <h5>Inactive Shares</h5>
                    <h6>{isLoading ? <img src={UserLoader} alt="" className="user-loader-img" /> : 2} </h6>
                </ShareCardField>

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
                                    {data && data.length ?
                                        stableSort(data || [], getComparator(order, orderBy)).map((item, index) => {
                                            const { image = "", name = "", price = "", id = "", is_active = "" } = item || {}
                                            return (
                                                <TableRow hover key={id} className="cursor_default"  >
                                                    <TableCell className="table-custom-width" data-title="S NO."> {'image'} </TableCell>
                                                    <TableCell className="table-custom-width" data-title="USER NAME"> {name} </TableCell>
                                                    <TableCell className="table-custom-width" data-title="EMAIL">{id}</TableCell>
                                                    <TableCell className="table-custom-width" data-title="STATUS"> {price} </TableCell>
                                                    <TableCell className="table-custom-width" data-title="ACTION">
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
                                                    </TableCell>
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
                    <CustomLoader />
                }
            </div>

            <CustomModal open={addShareModal} maxWidth="xl">
                <AddShareForm
                    {...props}
                    onClose={handleCloseAddUserModal}
                    toast={toast}
                    shareDetails={shareDetails}
                    update={isEdit}
                    afterAction={afterAction}
                />
            </CustomModal>


            <CustomDialogBox
                handleClose={() => setOpenDeleteModal(false)}
                confirmAction={deleteUser}
                open={openDeleteModal}
                title="Warning"
                dialogtext={`Are you sure you want to delete this user?`}
                isLoading={isLoading}
                text="Keep Share"
            />

        </div>
    )
}

export default withTranslation("translations")(withStyles(tablestyle)(Shares));

function ShareCardField(props) {
    return <Grid item xs={12} sm={4} md={4} lg={4}>
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