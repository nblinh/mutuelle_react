import React from 'react';
import { shallow } from 'enzyme';

import { RadioList } from './RadioList';
import FormControlLabel from '@material-ui/core/FormControlLabel';

describe('<RadioList />', () => {
    const defaultProps = {
        classes: {},
        name: 'foo',
        onChange: () => {},
    };

    it('should render a list of radio button for each given choice', () => {
        const props = {
            ...defaultProps,
            choices: [
                { value: 'foo', label: 'Foo' },
                { value: 'bar', label: 'Bar' },
                { value: 'quz', label: 'Quz' },
            ],
        };

        const wrapper = shallow(<RadioList {...props} />);
        const controls = wrapper.find(FormControlLabel);
        expect(
            controls.map(c => ({
                label: c.prop('label'),
                value: c.prop('value'),
            })),
        ).toEqual([
            { value: 'foo', label: 'Foo' },
            { value: 'bar', label: 'Bar' },
            { value: 'quz', label: 'Quz' },
        ]);
    });
});
