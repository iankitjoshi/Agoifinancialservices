import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
        // minWidth : '500px'

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        // minWidth : '500px'
    },
}));

export default function CustomModal(props) {
    const classes = useStyles();
    const {
        children,
        open = false,
        onChangeModal,
        onClose,
        maxWidth = 'md'
    } = props;

    return (
        <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={clsx(classes.modal, 'cus-popup')}
            open={open}
            onClose={onClose}
            classes={{ paper: 'custom-modal' }}
            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            maxWidth={maxWidth}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Fade in={open}>
                <div className={classes.paper}>
                    {children}
                </div>

            </Fade>
        </Dialog>
    );
}