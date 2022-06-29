import React from 'react'
import moment from 'moment'
import EventIcon from '@material-ui/icons/Event'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import { Box } from '@material-ui/core';


function Datepicker(props) {
    const {
        startDate,
        endDate,
        handleDateChange = () => { },
        focusedInput,
        setFocusedInput
    } = props

    return (
        <Box pl={1}>
            <DateRangePicker
                // disabled={filter?.value !== "customDate"}
                startDate={startDate}
                startDateId="startDate"
                startDatePlaceholderText="From..."
                endDatePlaceholderText="To..."
                customArrowIcon={<p className="start-end-date-divider">|</p>}
                endDate={endDate}
                endDateId="endDate"
                customInputIcon={<EventIcon className="date-picker-icon" />}
                isOutsideRange={date =>
                    date.isBefore(moment().year()) ||
                    date.isAfter(moment())
                }
                onDatesChange={handleDateChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                orientation={window.innerWidth >= 1200 ? 'horizontal' : 'vertical'}
                numberOfMonths={window.innerWidth >= 1200 ? 2 : 1}
                verticalHeight={380}
                customCloseIcon={null}
                anchorDirection="left"
                inputIconPosition="after"
                hideKeyboardShortcutsPanel
                readOnly={true}
                displayFormat="MMM DD YYYY"
            >
            </DateRangePicker>
        </Box>
    )
}

export default Datepicker

