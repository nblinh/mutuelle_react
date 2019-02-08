import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Woopra from './woopra';

const defaultWoopraProvider = {
    tracker: null,
};

export const WoopraContext = React.createContext(defaultWoopraProvider);

export class WoopraProvider extends Component {
    state = {
        tracker: null,
    };

    componentDidMount() {
        const tracker = new Woopra.Tracker('woopra');
        tracker.identify({ id: uuid() });

        if (process.env.REACT_APP_DOMAIN) {
            tracker.config({
                domain: process.env.REACT_APP_DOMAIN,
            });
        } else {
            tracker.track = (...args) => {
                console.debug('Woopra Tracking:', ...args); // eslint-disable-line
            };
        }

        this.setState({ tracker });
    }

    render() {
        return (
            <WoopraContext.Provider value={this.state}>
                {this.state.tracker ? this.props.children : null}
            </WoopraContext.Provider>
        );
    }
}

WoopraProvider.propTypes = {
    children: PropTypes.element,
};

export default WoopraProvider;
