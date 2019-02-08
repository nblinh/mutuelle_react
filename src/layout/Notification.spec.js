import React from 'react';
import { shallow } from 'enzyme';

import { Notification } from './Notification';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

describe('<Notification />', () => {
    const defaultProps = {
        classes: {},
        message: 'Boom!',
        type: 'error',
        onClose: () => {},
    };

    it('should be opened when mounting', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Notification {...props} />);
        wrapper.instance().componentWillMount();

        expect(wrapper.find(Snackbar).prop('open')).toBe(true);
    });

    it('should not close when clicking on the page, outside the notification box', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Notification {...props} />);

        wrapper.find(Snackbar).prop('onClose')({}, 'clickaway');
        wrapper.update();

        expect(wrapper.find(Snackbar).prop('open')).toBe(true);
    });

    it('should close when clicking on the `Close` icon', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Notification {...props} />);

        const action = wrapper.find(Snackbar).prop('action');
        const Action = shallow(<action {...action.props} />);
        Action.find('action').prop('onClick')();

        wrapper.update();
        expect(wrapper.find(Snackbar).prop('open')).toBe(false);
    });

    it('should call the `onClose` callback when clicking on the `Close` icon', () => {
        const onClose = jest.fn();
        const props = { ...defaultProps, onClose };
        const wrapper = shallow(<Notification {...props} />);

        const action = wrapper.find(Snackbar).prop('action');
        const Action = shallow(<action {...action.props} />);
        Action.find('action').prop('onClick')();

        expect(onClose).toHaveBeenCalled();
    });

    it('should dismiss itself after 5 seconds', () => {
        const onClose = jest.fn();
        const props = { ...defaultProps, onClose };
        const wrapper = shallow(<Notification {...props} />);

        expect(wrapper.find(Snackbar).prop('autoHideDuration')).toBe(5000);
    });

    it('should display notification message', () => {
        const props = { ...defaultProps, message: 'Boom!' };
        const wrapper = shallow(<Notification {...props} />);

        expect(wrapper.find(Snackbar).prop('message')).toBe('Boom!');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
