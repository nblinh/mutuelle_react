import React from 'react';
import { shallow } from 'enzyme';

import { Fieldset } from './Fieldset';

describe('<Fieldset />', () => {
    const defaultProps = {
        classes: {
            label: 'label',
        },
    };

    it('should display label if provided', () => {
        const test = (label, expectedLabel) => {
            const props = { ...defaultProps, label };
            const wrapper = shallow(<Fieldset {...props} />);

            const labelElement = wrapper.find('.label');
            if (expectedLabel) {
                expect(labelElement.text()).toBe(expectedLabel);
                return;
            }

            expect(labelElement).toHaveLength(0);
        };

        test('Verre n°1', 'Verre n°1');
        test(null, false);
    });

    it('should render passed children', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(
            <Fieldset {...props}>
                <h1>Hello world!</h1>
            </Fieldset>,
        );

        expect(wrapper.find('h1').text()).toBe('Hello world!');
    });
});
