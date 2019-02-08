import React from 'react';
import { shallow } from 'enzyme';

import { Route } from './Route';

describe('<Route />', () => {
    const defaultProps = {
        location: {
            pathname: '/',
            search: '',
            hash: '',
        },
        tracker: { track: () => {} },
    };

    it('should send a `viewed_page` tracking event when mounting', () => {
        const props = {
            ...defaultProps,
            location: {
                ...defaultProps.location,
                pathname: '/foo',
            },
            tracker: { track: jest.fn() },
        };

        shallow(<Route {...props} />);
        expect(props.tracker.track).toHaveBeenCalledWith('viewed_page', {
            url: '/foo',
        });
    });

    it('should send a `viewed_page` tracking event when updating', () => {
        const props = {
            ...defaultProps,
            location: {
                ...defaultProps.location,
                pathname: '/foo',
            },
            tracker: { track: jest.fn() },
        };

        const route = shallow(<Route {...props} />);
        route.setProps({
            location: {
                ...defaultProps.location,
                pathname: '/bar',
            },
        });

        route.setProps({
            location: {
                ...defaultProps.location,
                pathname: '/bar',
            },
        });

        const barTrackingCalls = props.tracker.track.mock.calls.filter(
            c => c[1].url === '/bar',
        );
        expect(barTrackingCalls).toHaveLength(1);
    });
});
