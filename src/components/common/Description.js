import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Popover, Button, Chip} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    customWidth: {
        fontSize: 14,
        color: 'black',
        backgroundColor: '#fff',
        padding: '16px',
        wordBreak: 'break-word',
        margin: '0'
    }
}));


export default function Description(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    let {
        data = "",
    } = props

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
        return (
            <div className="d-flex des-pop-con">
                <button className="des-btn button-btn" onClick={handleClick}>Description</button>
                {/* <Button onClick={handleClick} className="button-btn new-btn-color text-end" >Description</Button> */}
                <Popover
                    id={id}
                    open={open}
                    className="des-popover"
                    anchorEl={anchorEl}
                    onClose={e => handleClose(e)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <p className='des-data'>
                        {data}
                    </p>
                </Popover>
            </div>
        )    
}
