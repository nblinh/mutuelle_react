import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';

import { ProductList } from './ProductList';

describe('<ProductList />', () => {
    const defaultProps = {
        classes: {},
        fetchProducts: () => {},
    };

    it('should fetch products from API at mount time', () => {
        const fetchProducts = jest.fn();
        const props = { ...defaultProps, fetchProducts };
        const wrapper = shallow(<ProductList {...props} />);

        wrapper.instance().componentDidMount();

        expect(fetchProducts).toHaveBeenCalled();
    });

    it('should display a select list with retrieved products', () => {
        const props = {
            ...defaultProps,
            products: [{ id: 'Foo' }, { id: 'Bar' }],
        };
        const wrapper = shallow(<ProductList {...props} />);

        expect(wrapper.prop('options')).toEqual([
            { label: 'Foo', value: 'Foo' },
            { label: 'Bar', value: 'Bar' },
        ]);
    });

    it('should display a loader if no products is available yet', () => {
        const props = {
            ...defaultProps,
            products: null,
        };
        const wrapper = shallow(<ProductList {...props} />);
        expect(wrapper.find(LinearProgress)).toHaveLength(1);
    });
});
