import React from 'react';
import { shallow } from 'enzyme';

import { Toggle } from './Toggle';
import Switch from '@material-ui/core/Switch';

describe('<Toggle />', () => {
    const defaultProps = {
        classes: {},
        name: 'foo',
    };

    it('should toggle the switch off when clicking on left label', () => {
        const onChange = jest.fn();
        const props = { ...defaultProps, onChange };
        const wrapper = shallow(<Toggle {...props} />);

        wrapper
            .find('span')
            .at(0)
            .simulate('click');

        expect(onChange).toHaveBeenCalledWith(false);
    });

    it('should toggle the switch on when clicking on right label', () => {
        const onChange = jest.fn();
        const props = { ...defaultProps, onChange };
        const wrapper = shallow(<Toggle {...props} />);

        wrapper
            .find('span')
            .at(1)
            .simulate('click');

        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should toggle switch value when clicking on it', () => {
        const onChange = jest.fn();
        const props = { ...defaultProps, onChange };
        const wrapper = shallow(<Toggle {...props} />);

        wrapper.find(Switch).prop('onChange')({}, true);

        expect(onChange).toHaveBeenCalledWith(true);
    });
});
