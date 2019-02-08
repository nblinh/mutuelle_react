import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import RemainingFeesRepartitionChart from '../refunds/RemainingFeesRepartitionChart';
import { orange, blue } from '../theme';

const styles = {
    root: {
        display: 'flex',
        fontFamily: 'bree',
        fontWeight: 'bold',
        fontSize: '18px',
        backgroundColor: 'rgba(126,170,191,0.1)',
        border: `1px solid rgba(126,170,191,0.2)`,
        padding: '0 40px',
        marginBottom: '40px',
        height: 210,
    },
    chartWrapper: {
        flexGrow: 1,
    },
    leftText: {
        flex: '0 0 150px',
        alignSelf: 'center',
        color: blue,
    },
    rightText: {
        flex: '0 0 150px',
        textAlign: 'center',
        alignSelf: 'center',
        color: orange,
    },
};

export const IntermediaryResultTooltip = data => (
    <Fragment>
        <strong>{data.value} %</strong> des adhérents <br />ont un reste à
        charge{' '}
        {data.name === 'zero' && (
            <Fragment>
                de <strong>0 €</strong>
            </Fragment>
        )}
    </Fragment>
);

export const IntermediaryResult = ({ reimbursements, classes }) => (
    <div className={classes.root}>
        <div className={classes.leftText}>
            Résultat de votre simulation à cette étape
        </div>
        <div className={classes.chartWrapper}>
            <RemainingFeesRepartitionChart
                labelFontSize={13}
                titleFontSize={14}
                legend={null}
                selectedRemainingFees={0}
                title="Reste à payer"
                quartiles={reimbursements.quartiles}
                data={[
                    {
                        name: 'zero',
                        label: '0 €',
                        tooltipLabel: props => (
                            <IntermediaryResultTooltip {...props} />
                        ),
                        value: Math.round(
                            reimbursements
                                .pourcentage_reste_a_charge_par_quartile[0],
                        ),
                    },
                    {
                        name: 'grand',
                        label: `${reimbursements.reste_a_charge_maximum} €`,
                        tooltipLabel: props => (
                            <IntermediaryResultTooltip {...props} />
                        ),
                        value: Math.round(
                            100 -
                                reimbursements
                                    .pourcentage_reste_a_charge_par_quartile[0],
                        ),
                    },
                ]}
                domain={['zero', 'grand']}
            />
        </div>
        <div className={classes.rightText}>
            Votre mutuelle prend soin de vous
        </div>
    </div>
);

IntermediaryResult.propTypes = {
    reimbursements: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntermediaryResult);
