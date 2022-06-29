import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
    CircularProgress
} from '@material-ui/core';

function CustomDialogBox(props) {
    const {
        open,
        handleClose = () => { },
        title = '',
        isLoading = false,
        dialogtext = '',
        confirmAction = () => { },
        text = '',
        isLogout,
        removeLive
    } = props;


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth={true}
            className="cus-dialog py-3"
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogtext}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div className="dialog-btns">
                    <Button onClick={handleClose} color="primary" className="button-btn secondary-btn mr-3" disabled={isLoading}>
                        {text || 'No, Cancel'}
                    </Button>
                    <Button onClick={confirmAction} color="primary" className="button-btn new-btn-color" disabled={isLoading}>
                        {isLoading ? <CircularProgress size="28px" /> : (isLogout ? 'Yes, Logout' : removeLive ? removeLive : 'Yes, Delete')}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialogBox;