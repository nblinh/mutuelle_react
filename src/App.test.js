import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import Notifications from './layout/Notifications';

describe('Application', () => {
    it('should render without crashing', () => {
        shallow(<App />);
    });

    it('should enable notifications', () => {
        const app = shallow(<App />);
        expect(app.find(Notifications)).toHaveLength(1);
    });
});
