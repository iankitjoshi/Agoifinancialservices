import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, Chip, Avatar, Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';


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

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,

    },
}))(Tooltip);

function NewlineText(text) {
    return text.split('\n').map(str => <p>{str}</p>);
}

export default function DataShowMore(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    let {
        data = [],
        textStrong = false,
        showNumber = 7,
        toolTip = true
    } = props



    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleSingleUser = (_id) => {
        props.history.push(`/user/${_id}`)
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const datas = Array.isArray(data) && data.length ? data.map(item => {
        return <React.Fragment>
            {
                toolTip ?
                    <LightTooltip style={{ whiteSpace: 'pre' }} className="custom-tooltip show-pointer" title={NewlineText(`Mobile No.:  ${(item?.mobile_number || '-') || '-'} \n  Email:  ${item?.email_id || '-'}`)} placement="top" aria-label="add">
                        <Chip onClick={() => handleSingleUser(item._id)} key={item._id} className="chip-tax show-pointer" label={item?.name || '-'} size="small" variant="outlined" />
                    </LightTooltip>
                    :
                    <Chip key={item._id} className="chip-tax" label={item?.name || '-'} size="small" variant="outlined" />
            }
        </React.Fragment>
    }) : '' || '-'

    const dataLength = Array.isArray(data) && data.length
    if (data && data.length >= showNumber) {
        return (
            <div className="d-flex">
                <p className="pr-1">{datas.slice(0, showNumber) || '-'}</p>
                {dataLength > showNumber ? <p className="text-more" onClick={handleClick}>{open ? 'Show Less' : 'Show More'}</p> : ''}
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={e => handleClose(e)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <p className={classes.customWidth}>
                        {datas.slice(showNumber, dataLength) || '-'}
                    </p>
                </Popover>
            </div>
        )
    }

    return (
        <React.Fragment>
            {textStrong ? <strong>{datas}</strong> : datas || '-'}
        </React.Fragment >
    );
}
