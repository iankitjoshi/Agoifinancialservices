import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import UserLoader from "../../../assets/images/userLoader.gif";

import { Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'

function SingleUserDetails(props) {
    const [types, setTypes] = useState(['Accept', 'Reject'])
    const [typeSelected, setTypeSelected] = useState('')
    const dispatch = useDispatch()
    const { userId } = props.match.params;

    useEffect(() => {

    })

    const handleRadio = (event) => {
        setTypeSelected(event.target.value);
    }

    return (
        <div className="user-page">
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
                                A
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                B
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                C
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                D
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                E
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                F
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                G
                            </Grid>
                        </Grid>

                        :
                        <div className="table-loader">
                            Loader
                        </div>
                    }
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            {
                                types.map((type, i) => {
                                    return (
                                        <FormControlLabel value={type}
                                            onChange={handleRadio} error={'errors.types'} name="credit"
                                            control={<Radio color="primary" />} label={type} />
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default SingleUserDetails


