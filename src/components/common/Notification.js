import React from "react"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Badge, Fab } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import useWindowDimensions from "./WindowWidth";


const Notification = () => {
    const MobileWidth = 768;
    const { width } = useWindowDimensions();


    return (
        <Fab color="primary" aria-label="add" href="/kyc"
            style={{ position: 'absolute', right: '45px', ...(width < MobileWidth ? { top: '65px' } : { bottom: '40px' }) }} >
            <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
            </Badge>
        </Fab>
    )
}

export default Notification