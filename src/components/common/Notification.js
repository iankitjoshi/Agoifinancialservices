import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/HighlightOff';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Notification extends Component {

	state = {
		isOpen: false,
		message: ''
	}

	close = () => {
		this.setState({ isOpen: false });
	}

	open = (message) => {
		this.setState({ isOpen: true, message });
	}

	render() {
		const { duration = 5000, severity } = this.props;
		const { message } = this.state;

		return (
			<Snackbar
				className="notificationMessage"
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={this.state.isOpen}
				onClose={this.close}
				autoHideDuration={duration}
			>
				<Alert onClose={this.close} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		);
	}
}