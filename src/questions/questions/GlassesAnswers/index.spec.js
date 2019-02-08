import React from 'react';
import { shallow } from 'enzyme';

import GlassFieldset from './GlassFieldset';
import { GlassesAnswers, labelizeGlassesAnswer } from './index';
import { Button } from '../../../form';
import Toggle from '../../../form/Toggle';

describe('labelizeGlassesAnswer', () => {
    it('should labelize correctly condensed answer', () => {
        expect(labelizeGlassesAnswer('progressif+3_simple-2')).toBe(
            'verre progressif +3 et verre simple -2',
        );
    });
});

describe('<GlassesAnswers />', () => {
    const defaultProps = {
        classes: {},
        onValidate: () => {},
    };

    it('should disable validation button if one of glasses are incomplete', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<GlassesAnswers {...props} />);

        const button = wrapper.find(Button);
        expect(button.prop('disabled')).toBe(true);

        const fieldsets = wrapper.find(GlassFieldset);
        fieldsets.forEach(f => f.prop('onTypeChange')('simple'));
        wrapper.update();

        const enabledButton = wrapper.find(Button);
        expect(enabledButton.prop('disabled')).toBe(false);
    });

    it('should redirect to correct equipment URL when validating question', () => {
        const onValidateSpy = jest.fn();

        const props = { ...defaultProps, onValidate: onValidateSpy };
        const wrapper = shallow(<GlassesAnswers {...props} />);
        wrapper.find(Toggle).prop('onChange')(true);
        wrapper.update();

        const fieldsets = wrapper.find(GlassFieldset);
        fieldsets.at(0).prop('onTypeChange')('simple');
        fieldsets.at(0).prop('onCorrectionChange')(-5);

        fieldsets.at(1).prop('onTypeChange')('progressif');
        fieldsets.at(1).prop('onCorrectionChange')(+3);

        wrapper.find(Button).prop('onClick')();
        expect(onValidateSpy).toHaveBeenCalledWith('simple-5_progressif+3');
    });

    it('should duplicate glass description if both glasses are the same', () => {
        const onValidateSpy = jest.fn();

        const props = { ...defaultProps, onValidate: onValidateSpy };
        const wrapper = shallow(<GlassesAnswers {...props} />);

        const fieldsets = wrapper.find(GlassFieldset);
        fieldsets.at(0).prop('onTypeChange')('simple');
        fieldsets.at(0).prop('onCorrectionChange')(-5);

        wrapper.find(Button).prop('onClick')();
        expect(onValidateSpy).toHaveBeenCalledWith('simple-5_simple-5');
    });

    describe('Different Glasses', () => {
        it('should update fieldset labels correctly depending of glass difference toggle', () => {
            const test = (differentGlasses, expectedFieldsetLabels) => {
                const props = { ...defaultProps };
                const wrapper = shallow(<GlassesAnswers {...props} />);
                wrapper.find(Toggle).prop('onChange')(differentGlasses);
                wrapper.update();

                const fieldsets = wrapper.find(GlassFieldset);
                expect(fieldsets.map(f => f.prop('label'))).toEqual(
                    expectedFieldsetLabels,
                );
            };

            test(false, ['Verre n°1 et 2']);
            test(true, ['Verre n°1', 'Verre n°2']);
        });

        it('should create a new empty glass fieldset', () => {
            const props = { ...defaultProps };
            const wrapper = shallow(<GlassesAnswers {...props} />);
            wrapper.find(Toggle).prop('onChange')(true);
            wrapper.update();

            const secondGlassFieldset = wrapper.find(GlassFieldset).at(1);
            expect(secondGlassFieldset.prop('glass')).toEqual({
                type: null,
                correction: 0,
            });
        });
    });
});
