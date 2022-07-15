import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import {
    Grid, Button, CircularProgress, TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'
import CustomLoader from "components/common/Loader";
import { positiveAmount } from 'utils';
import { NoDataFound } from 'components/common/NoDataFound';
import EnhancedTableHead from '../../../components/common/EnhancedTableHead';

const headCells = [
    { id: "index", numeric: false, disablePadding: false, label: "Order ID" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Date" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Customer" },
    { id: "email", numeric: false, disablePadding: false, label: "Total" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Status" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Stock" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Orders" },
];

const CashOutHeadCells = [
    { id: "index", numeric: false, disablePadding: false, label: "S.No." },
    { id: "is_active", numeric: false, disablePadding: false, label: "Name" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Mobile No." },
    { id: "email", numeric: false, disablePadding: false, label: "Cashout Amount" },
    { id: "email", numeric: false, disablePadding: false, label: "Status" },
];

const NotificationHeadCells = [
    { id: "index", numeric: false, disablePadding: false, label: "S.No." },
    { id: "is_active", numeric: false, disablePadding: false, label: "Date" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Notification" },
];

const ReferralHeadCells = [
    { id: "index", numeric: false, disablePadding: false, label: "Sender" },
    { id: "is_active", numeric: false, disablePadding: false, label: "Date" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Purchase" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Referral Amount" },
    { id: "user_name", numeric: false, disablePadding: false, label: "Availed" },
];

function SingleUserDetails(props) {
    const dispatch = useDispatch()

    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const [isEdit, setIsEdit] = useState(true)
    const [walletBalance, setWalletBalance] = useState(1000)
    let isLoading = false
    const { userId } = props.match.params;
    const { KycNotification } = props

    useEffect(() => {

    })

    const handleRadio = (event) => {
        setTypeSelected(event.target.value);
    }

    const handleUpdateWallet = () => {
        setIsEdit(!isEdit)
    }

    const handleWalletChange = (e) => {
        const { value = "", name = "" } = e.target
        let balanceRegex = /^(\d+(\.\d{0,5})?|\.?\d{1,2})$/;
        if (['walletBalance'].includes(name) && value && !balanceRegex.test(value)) return;
        if (name == "walletBalance" && value.length > 10) return;
        setWalletBalance(value)
    }

    const handleSeeKYC = () => {

    }

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
                            <UserCardField>
                                <label> Mobile: </label> <strong> 9876543210 </strong>
                            </UserCardField>
                            <UserCardField>
                                <label> Email: </label> <strong> A@GMAIL.COM </strong>
                            </UserCardField>
                            <UserCardField>
                                <label> PAN: </label> <strong> BJDS78CDSBHJ </strong>
                            </UserCardField>
                            <UserCardField>
                                <label> Aadhar: </label> <strong> 1234 1234 1234 </strong>
                            </UserCardField>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <p>
                                    <label> Wallet Balance: </label>
                                    {!isEdit ?
                                        <InputField value={walletBalance} className="new-input" name="walletBalance" error={''} onChange={handleWalletChange} />
                                        :
                                        <strong> {positiveAmount(walletBalance)}</strong>
                                    }

                                    {isEdit
                                        ?
                                        <Button className="button-btn new-btn-color" onClick={handleUpdateWallet} > Edit </Button>
                                        :
                                        <Button className={`button-btn new-btn-color ${!walletBalance && 'disabled'} `} onClick={handleUpdateWallet}>{false ? <CircularProgress width={5} /> : 'Update'} </Button>
                                    }
                                </p>
                            </Grid>
                            <UserCardField>
                                <label> Invested: </label> <strong> {positiveAmount(walletBalance)}</strong>
                            </UserCardField>
                            <UserCardField>
                                <label> UPI Address: </label> <strong> Ankit</strong>
                            </UserCardField>
                            <UserCardField>
                                <label> Beneficiary Name: </label> <strong> Ankit</strong>
                            </UserCardField>
                            <UserCardField>
                                <p>
                                    <label> Account Number: </label> <strong> 123232324324</strong>
                                    <label> IFSC Code: </label> <strong> Ankit</strong>
                                </p>
                            </UserCardField>
                            <UserCardField>
                                <p><label> NSDL: </label> <strong> 48384289347498</strong></p>
                                <label> CDSL: </label> <strong> 48384289347498</strong>
                            </UserCardField>
                            <UserCardField>
                                <label> Referred By: </label> <strong> Ankit</strong>
                            </UserCardField>
                            <UserCardField>
                                <Button className="button-btn new-btn-color" onClick={handleSeeKYC} > See full KYC </Button>
                            </UserCardField>
                        </Grid>

                        :
                        <CustomLoader />
                    }
                </div>

                <span className="page-heading" >Order Sell History </span>
                <div className="cust-table mt-3 mb-3">
                    {!isLoading ?
                        <div>
                            <TableContainer className={`${props?.classes?.container} mt-2`}>
                                <Table className="table-program" stickyHeader aria-label="sticky table" id="customer-table">
                                    <EnhancedTableHead
                                        headCells={headCells}
                                    />
                                    <TableBody>
                                        {true ?
                                            [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                                                const { is_live = "", name = "", email = "", phone = "", id = "", is_active = "" } = item || {}
                                                return (
                                                    <TableRow hover key={id} className="cursor_default" >
                                                        <TableCell className="table-custom-width" data-title="S NO."> #143567 </TableCell>
                                                        <TableCell className="table-custom-width" data-title="USER NAME">22/01/2021 </TableCell>
                                                        <TableCell className="table-custom-width" data-title="EMAIL">Dominik Lamakani</TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS">{positiveAmount(129)}</TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS"><span className={`${true ? 'user-active' : 'user-inactive'}`}> {true ? 'Approved' : 'Inactive'}</span> </TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS">Chennai Superkings</TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS">5</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={headCells.length + 1} className="text-center"> <NoDataFound /> </TableCell>
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
                <span className="page-heading" >Wallet Cashout History </span>
                <div className="cust-table mt-3 mb-3">
                    {!isLoading ?
                        <div>
                            <TableContainer className={`${props?.classes?.container} mt-2`}>
                                <Table className="table-program" stickyHeader aria-label="sticky table" id="customer-table">
                                    <EnhancedTableHead
                                        headCells={CashOutHeadCells}
                                    />
                                    <TableBody>
                                        {true ?
                                            [1, 2, 3, 4,]?.map((item, index) => {
                                                const { is_live = "", name = "", email = "", phone = "", id = "", is_active = "" } = item || {}
                                                return (
                                                    <TableRow hover key={id} className="cursor_default" >
                                                        <TableCell className="table-custom-width" data-title="S NO.">{index + 1}. </TableCell>
                                                        <TableCell className="table-custom-width" data-title="USER NAME">Ankit Joshi </TableCell>
                                                        <TableCell className="table-custom-width" data-title="MOBILE NO."> 9876543210 </TableCell>
                                                        <TableCell className="table-custom-width" data-title="EMAIL">{positiveAmount(100)}</TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS"><span className={`${true ? 'user-active' : 'user-inactive'}`}> {true ? 'Approved' : 'Inactive'}</span> </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={headCells.length + 1} className="text-center"> <NoDataFound /> </TableCell>
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
                                                <TableCell colSpan={headCells.length + 1} className="text-center"> <NoDataFound /> </TableCell>
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
                <span className="page-heading" >Referral History </span>
                <div className="cust-table mt-3 mb-3">
                    {!isLoading ?
                        <div>
                            <TableContainer className={`${props?.classes?.container} mt-2`}>
                                <Table className="table-program" stickyHeader aria-label="sticky table" id="customer-table">
                                    <EnhancedTableHead
                                        headCells={ReferralHeadCells}
                                    />
                                    <TableBody>
                                        {true ?
                                            [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                                                const { is_live = "", name = "", email = "", phone = "", id = "", is_active = "" } = item || {}
                                                return (
                                                    <TableRow hover key={id} className="cursor_default" >
                                                        <TableCell className="table-custom-width" data-title="S NO."> Ankit </TableCell>
                                                        <TableCell className="table-custom-width" data-title="USER NAME">22/01/2021 </TableCell>
                                                        <TableCell className="table-custom-width" data-title="EMAIL"> Purchase </TableCell>
                                                        <TableCell className="table-custom-width" data-title="EMAIL"> {positiveAmount(100)} </TableCell>
                                                        <TableCell className="table-custom-width" data-title="STATUS"><span className={`${true ? 'user-active' : 'user-inactive'}`}> {true ? 'Yes' : 'No'}</span> </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={headCells.length + 1} className="text-center"> <NoDataFound /> </TableCell>
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
        </div >
    )
}

export default SingleUserDetails

function UserCardField(props) {
    return <Grid item xs={12} sm={3} md={3} lg={3}>
        <p>
            {props.children}
        </p>
    </Grid>
}
