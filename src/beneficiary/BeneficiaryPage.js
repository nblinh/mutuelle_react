import qs from 'querystring';
import { compose } from 'recompose';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';

import BeneficiaryForm from './BeneficiaryForm';
import { setBeneficiary } from './reducers';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import withWoopra from '../tracking/withWoopra';

const styles = {
    root: {
        maxWidth: 1280,
        margin: 'auto',
    },
    titleContainer: {
        textAlign: 'center',
        position: 'relative',
        bottom: 85,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '40px',
    },
    title: {
        display: 'inline-block',
        fontFamily: 'Myriad Pro',
        color: '#58585A',
        fontSize: 48,
        lineHeight: '64px',
        backgroundColor: 'white',
        padding: '0 1em',
        width: 'fit-content',
        fontWeight: 'normal',
        margin: '40px auto 0px auto',
    },
    formWrapper: {
        padding: '1rem 2rem',
        marginBottom: '2rem',
    },
};

export class BeneficiaryPage extends Component {
    componentDidMount() {
        const { history, location, setBeneficiary } = this.props;

        const searchParams = qs.parse(location.search.slice(1));
        if (!searchParams.produit) {
            return;
        }

        setBeneficiary({
            product: searchParams.produit,
            age: searchParams.age,
            department: searchParams.departement,
        });

        history.push(`${location.pathname}questions`);
    }

    onSubmit = values => {
        const { history, location, setBeneficiary, tracker } = this.props;

        setBeneficiary(values);
        tracker.track('beneficiary', values);

        history.push(`${location.pathname}questions`);
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Header />
                <div className={classes.formWrapper}>
                    <div className={classes.titleContainer}>
                        <h2 className={classes.title}>Bienvenue sur IRMA</h2>
                        <h2 className={classes.title}>
                            Simulez un remboursement !
                        </h2>
                    </div>
                    <BeneficiaryForm onSubmit={this.onSubmit} />
                </div>
            </Fragment>
        );
    }
}

BeneficiaryPage.propTypes = {
    classes: PropTypes.object,
    tracker: PropTypes.object,
    setBeneficiary: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default compose(
    withRouter,
    withWoopra,
    injectSheet(styles),
    connect(
        null,
        { setBeneficiary },
    ),
    withRouter,
)(BeneficiaryPage);
