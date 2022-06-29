import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import { logOut } from "../../utils";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
}));

let logoutSeconds = 0;

export default function CustomModal(props) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);

    const {
        open = false
    } = props;

    React.useEffect(() => {
        const timer = setInterval(() => {
            logoutSeconds = logoutSeconds + 1;
            setProgress((oldProgress) => {
                if (oldProgress >= 99) {
                    logOut('8thIcon-token');
                    clearTimeout();
                    props.continueWorking();
                    return 0;
                }
                const diff = Math.random() * 10;
                return parseInt((logoutSeconds) * 100) / 60;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            logoutSeconds = 0;
        };
    }, []);

    function logOutOnClick() {
        props.continueWorking();
        logOut('8thIcon-token');
    }

    return (
        <Dialog
            aria-labelledby="IdleTimer-modal-title"
            aria-describedby="IdleTimer-modal-description"
            className={clsx(classes.modal, 'cus-popup', 'IdleTimer-modal')}
            open={open}
            classes={{ paper: 'custom-modal idletimermodal' }}
            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} sm={12} sm={12} lg={12} className="text-center mt-3">
                            <p>
                                Session is about to expire due to long inactivity. Please click Continue to stay in the session.
                        </p>
                            <p>
                                Automatic Logout after <span>{60 - logoutSeconds} seconds</span>.
                        </p>
                        </Grid>
                        <Grid item xs={12} sm={12} sm={12} lg={12} className="text-center mt-3">
                            <div className={classes.root}>
                                <LinearProgress variant="determinate" value={progress} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} sm={12} lg={12} className="text-center mt-3">
                            <button type="button" className="btn-custom-border button-btn mr-3" onClick={props.continueWorking}>Continue</button>
                            <button type="submit" className="btn-custom-black button-btn" onClick={logOutOnClick}>Logout</button>
                        </Grid>
                    </Grid>
                </div>

            </Fade>
        </Dialog >
    );
}