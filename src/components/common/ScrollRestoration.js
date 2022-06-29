import React, { PureComponent, Fragment } from 'react';

export default class ScrollRestoration extends PureComponent {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            setTimeout(() => {
                window.scrollTo(110, 0);
            }, 150);
        }
    }

    render() {
        return (
            <Fragment>
                {React.cloneElement(this.props.children, { ...this.props })}
            </Fragment>
        )
    }
}