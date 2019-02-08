import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firstNotificationSelector } from './selectors';
import { closeNotification } from './reducers';

import Notification from './Notification';

export const Notifications = ({ closeNotification, notification }) =>
    !notification ? null : (
        <Notification {...notification} onClose={closeNotification} />
    );

Notifications.propTypes = {
    closeNotification: PropTypes.func,
    notification: PropTypes.object,
};

export default connect(
    state => ({ notification: firstNotificationSelector(state) }),
    { closeNotification },
)(Notifications);
