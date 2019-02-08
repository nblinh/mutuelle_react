import React from 'react';
import { shallow } from 'enzyme';
import { HexagonalIcon } from './HexagonalIcon';

describe('<HexagonalIcon />', () => {
    const defaultProps = {
        classes: {
            root: 'root',
            icon: 'icon',
        },
        children: <div />,
    };

    it('should set correct dimensions taking into account hexagon ratio', () => {
        const props = { ...defaultProps, size: 128 };
        const wrapper = shallow(<HexagonalIcon {...props} />);

        const style = wrapper.find('.root').prop('style');
        expect(style.width).toBe(128);
        expect(style.height).toBe(160);
    });

    it('should set an "hexagon" class on the icon (to customize hover effect)', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<HexagonalIcon {...props} />);

        expect(wrapper.find('.hexagon')).toHaveLength(1);
    });

    it('should render children within the hexagon', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(
            <HexagonalIcon {...props}>
                <h1>Hello world!</h1>
            </HexagonalIcon>,
        );

        expect(wrapper.find('h1').text()).toBe('Hello world!');
    });
});
