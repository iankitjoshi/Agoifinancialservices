import React from 'react'
import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 12,
        arrow: {
            color: 'rgba(0, 0, 0, 0.87)',
        },
    },
}))(Tooltip);

function CustomToolTip(props) {
    let {
        children,
        title = "",
        placement = "top"
    } = props

    return (
        <LightTooltip className="custom-tooltip" title={title} placement={placement} aria-label="add"  >
            {children && children[1] || children}
        </LightTooltip>
    )
}
export default CustomToolTip