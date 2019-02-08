import { compose } from 'recompose';
import omit from 'lodash.omit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import { fetchProducts } from './reducers';
import { selectProducts } from './selectors';
import SelectList from '../form/SelectList';

const styles = {
    loader: {
        width: 220,
    },
};

const productMapper = product => ({
    label: product.id,
    value: product.id,
});

export class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        const { classes, products, ...otherProps } = this.props;
        if (!products) {
            return <LinearProgress className={classes.loader} />;
        }

        return (
            <SelectList
                options={products.map(productMapper)}
                {...omit(otherProps, ['fetchProducts'])}
            />
        );
    }
}

ProductList.propTypes = {
    classes: PropTypes.object,
    fetchProducts: PropTypes.func,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            niveau: PropTypes.string,
        }),
    ),
};

export default compose(
    connect(
        state => ({
            products: selectProducts(state),
        }),
        { fetchProducts },
    ),
    withStyles(styles),
)(ProductList);
