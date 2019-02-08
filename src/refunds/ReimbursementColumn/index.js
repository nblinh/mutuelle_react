import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { blueLight, blue, white } from '../../theme';
import RemainingFeeChart from './RemainingFeeChart';

const styles = {
    root: {
        border: `1px solid ${blueLight}`,
        padding: '25px 14px',
    },
    title: {
        color: blue,
        fontFamily: 'Myriad Pro',
        fontWeight: 600,
        fontSize: 18,
        lineHeight: '23px',
        textAlign: 'center',
        margin: '0 0 12px 0',
    },
};

export const ReimbursementColumn = ({
    classes,
    maximumRemainingFees,
    percentageWithNoRemainingFees,
}) => (
    <div className={classes.root}>
        <h2 className={classes.title}>Votre mutuelle prend soin de vous !</h2>
        <RemainingFeeChart
            colors={[blue, white]}
            data={[
                percentageWithNoRemainingFees,
                100 - percentageWithNoRemainingFees,
            ]}
            strokeColor={blue}
            legend={
                <Fragment>
                    <strong>{percentageWithNoRemainingFees} %</strong> des
                    adhérents dans votre situation ont un reste à charge de{' '}
                    <strong>0 €</strong>
                </Fragment>
            }
        />
        <RemainingFeeChart
            colors={[blue, white]}
            data={[
                100 - percentageWithNoRemainingFees,
                percentageWithNoRemainingFees,
            ]}
            strokeColor={blue}
            legend={
                <Fragment>
                    <strong>{100 - percentageWithNoRemainingFees} %</strong> des
                    adhérents dans votre situation ont un reste à charge
                    inférieur à <strong>{maximumRemainingFees} €</strong>
                </Fragment>
            }
        />
    </div>
);

ReimbursementColumn.propTypes = {
    classes: PropTypes.object,
    percentageWithNoRemainingFees: PropTypes.number.isRequired,
    maximumRemainingFees: PropTypes.number.isRequired,
};

export default injectSheet(styles)(ReimbursementColumn);
