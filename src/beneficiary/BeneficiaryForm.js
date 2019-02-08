import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import injectSheet from 'react-jss';

import { Button, DepartmentList, Input } from '../form';
import { ProductList } from '../products';
import { red } from '../theme';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > div': {
            marginRight: '1rem',
        },
    },
    inputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productList: {
        width: 220,
    },
    departmentList: {
        width: 320,
    },
    ageInput: {
        width: 100,
    },
    submit: {
        marginTop: 109,
    },
    refund: {
        padding: '1rem 2rem',
    },
    loader: {
        margin: '5rem 26rem',
    },
    error: {
        color: red,
    },
};

export const validate = values => {
    const errors = {};

    ['product', 'department'].forEach(field => {
        if (!values[field]) {
            errors[field] = 'Champ obligatoire';
        }
    });

    if (!values.age) {
        errors.age = 'Champ obligatoire';
    } else if (values.age < 0) {
        errors.age = "L'âge doit être positif.";
    }

    return errors;
};

export const BeneficiaryForm = ({ classes, handleSubmit, invalid }) => (
    <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.inputs}>
            <ProductList
                className={classes.productList}
                placeholder="Produit"
                name="product"
                required
            />
            <Input
                className={classes.ageInput}
                placeholder="Âge"
                type="number"
                name="age"
                required
            />
            <DepartmentList
                className={classes.departmentList}
                placeholder="Département"
                name="department"
                required
            />
        </div>
        <div className={classes.submit}>
            <Button type="submit" color="primary" disabled={invalid}>
                Simuler
            </Button>
        </div>
    </form>
);

BeneficiaryForm.propTypes = {
    classes: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
};

export default compose(
    injectSheet(styles),
    reduxForm({
        form: 'beneficiary',
        validate,
    }),
)(BeneficiaryForm);
