import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { GlassFieldset } from './GlassFieldset';

import RadioList from '../../../form/RadioList';
import GlassCorrectionInput from '../../../form/GlassCorrectionInput';

describe('<GlassFieldset />', () => {
    const defaultProps = {
        classes: {},
        label: 'Verres n°1 et 2',
        glass: {},
        onCorrectionChange: () => {},
        onTypeChange: () => {},
    };

    it('should add a glass type and correction input', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<GlassFieldset {...props} />);

        const typeInput = wrapper.find(RadioList);
        expect(typeInput.prop('choices').map(c => c.value)).toEqual([
            'simple',
            'progressif',
        ]);

        expect(wrapper.find(GlassCorrectionInput)).toHaveLength(1);
    });

    it('should call correct change handler depending of input', () => {
        const onCorrectionChangeSpy = jest.fn();
        const onTypeChangeSpy = jest.fn();

        const props = {
            ...defaultProps,
            onCorrectionChange: onCorrectionChangeSpy,
            onTypeChange: onTypeChangeSpy,
        };

        const wrapper = shallow(<GlassFieldset {...props} />);

        const typeInput = wrapper.find(RadioList);
        typeInput.prop('onChange')('simple');
        expect(onTypeChangeSpy).toHaveBeenCalledWith('simple');

        const correctionInput = wrapper.find(GlassCorrectionInput);
        correctionInput.prop('onChange')(-8);
        expect(onCorrectionChangeSpy).toHaveBeenCalledWith(-8);
    });
});
