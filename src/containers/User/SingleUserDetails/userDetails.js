import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";
import InputField from '../../../components/common/InputField'
import { Grid, Button, CircularProgress, Radio, FormControl, FormLabel } from '@material-ui/core'
import CustomLoader from "components/common/Loader";
 
import { positiveAmount } from 'utils';

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

    return (
        <div className="user-page">
            {KycNotification}
            <div className="category-page">
                <Grid container spacing={3} className="mb-3 heading-sec d-flex align-items-center justify-content-end" >
                    <Grid item xs={12} sm={12} md={3} lg={3} className="align-self-center heading-top">
                        <h5 className="page-heading">
                            <KeyboardBackspaceIcon onClick={() => props.history.goBack()} />
                            <span className="page-heading" >{false ? <img src={UserLoader} alt="" style={{ width: '100px' }} /> : 'csdc'} </span>
                        </h5>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} className="search-bar">
                        {/* <div className="right-search-btn">
                            vdfk
                            <div className="text-right">
cscsd
                            </div>
                        </div> */}
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
                        </Grid>

                        :
                        <CustomLoader />
                    }
                </div>

            </div>
        </div>
    )
}

export default SingleUserDetails


