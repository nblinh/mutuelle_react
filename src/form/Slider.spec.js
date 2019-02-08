import TextField from '@material-ui/core/TextField';
import UISlider from '@material-ui/lab/Slider';
import React from 'react';
import { shallow } from 'enzyme';

import { Slider } from './Slider';

describe('<Slider />', () => {
    const defaultProps = {
        classes: {},
        onChange: () => {},
    };

    it('should call `onChange` prop when changing input value', () => {
        const changeSpy = jest.fn();
        const props = {
            ...defaultProps,
            onChange: changeSpy,
            withInput: true,
        };

        const wrapper = shallow(<Slider {...props} />);
        wrapper.find(TextField).prop('onChange')({ target: { value: '10' } });

        expect(changeSpy).toHaveBeenCalledWith(10);
    });

    it('should call `onChange` prop when changing slider position', () => {
        const changeSpy = jest.fn();
        const props = {
            ...defaultProps,
            onChange: changeSpy,
        };

        const wrapper = shallow(<Slider {...props} />);
        wrapper.find(UISlider).prop('onChange')(null, 15);

        expect(changeSpy).toHaveBeenCalledWith(15);
    });

    it('should allow to display or hide the input', () => {
        const test = (withInput, shouldDisplayInput) => {
            const props = {
                ...defaultProps,
                withInput,
            };

            const wrapper = shallow(<Slider {...props} />);
            expect(wrapper.find(TextField).length > 0).toBe(shouldDisplayInput);
        };

        test(false, false);
        test(true, true);
    });

    it('should clamp values between extrema when leaving input field', () => {
        const changeSpy = jest.fn();
        const props = {
            ...defaultProps,
            withInput: true,
            onChange: changeSpy,
            min: 10,
            max: 20,
        };

        const wrapper = shallow(<Slider {...props} />);
        const input = wrapper.find(TextField);

        input.prop('onBlur')({ target: { value: 1 } });
        expect(changeSpy).toHaveBeenCalledWith(10);

        input.prop('onBlur')({ target: { value: 100 } });
        expect(changeSpy).toHaveBeenCalledWith(20);
    });
});
