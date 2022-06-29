import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { getObject } from "../../utils";

function PublicMain(props) {

    React.useEffect(() => {
        let publicKey = getObject("public-key");
        if (publicKey && window.location.pathname.includes('/user'))
            props.history.push('/user/user_transaction?currentPage=0&rowsPerPage=25')
        return () => {
            // Anything in here is fired on component unmount.
        }
    }, []);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} className="cus-public-header  text-center">
                    {props.children}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PublicMain;