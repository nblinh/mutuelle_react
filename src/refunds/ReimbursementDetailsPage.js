import { scaleOrdinal } from 'd3';
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import uniqBy from 'lodash.uniqby';

import kalivia from './kalivia.png';
import { selectRemainingFeesRange, setExpense } from '../refunds/reducers';
import {
    selectReimbursementDistributions,
    selectReimbursements,
    selectExpense,
    selectSelectedRemainingFeesRange,
} from '../refunds/selectors';
import RemainingFeesRepartitionChart, {
    getPieData,
    getRangeFromDomain,
} from './RemainingFeesRepartitionChart';
import Legend from './RemainingFeesRepartitionChart/Legend';
import ReimbursementDistributionChart from './ReimbursementDistributionChart';
import Slider from '../form/Slider';
import { blue } from '../theme';
import withWoopra from '../tracking/withWoopra';

const styles = {
    root: {
        flexGrow: 1,
    },
    sliderWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    kaliviaWrapper: {
        position: 'absolute',
        top: '15%',
        left: '18%',
    },
    kaliviaLogo: {
        width: 36,
        height: 36,
    },
    legend: {
        position: 'relative',
        height: '3rem',
    },
    donutsWrapper: {
        display: 'flex',
        height: 300,
    },
    donutWrapper: {
        position: 'relative',
        flexGrow: 1,
        height: '100%',
    },
    sliderPrefix: {
        flex: '0 0 15rem',
    },
    slider: {
        fontSize: 24,
        lineHeight: '48px',
        flex: '0 0 300px',
    },
    sliderSuffix: {
        flex: '0 0 2rem',
    },
    distributionChartsWrapper: {
        display: 'flex',
    },
    distributionChartWrapper: {
        flexGrow: 1,
    },
    franchise: {
        fontFamily: 'bree',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'baseline',
    },
    franchiseColor: {
        display: 'inline-block',
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: blue,
        marginRight: '5px',
    },
};

export const RemainingFeesRepartitionTooltip = ({ prefix, value, label }) => (
    <Fragment>
        {prefix}
        <strong>{Math.round(value, 2)} %</strong> des adhérents ont un reste à
        charge de <strong>{label}</strong>
    </Fragment>
);

RemainingFeesRepartitionTooltip.propTypes = {
    prefix: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

const getLabel = (min, max) => {
    if (min === null) {
        return `${max} €`;
    }
    if (max === null) {
        return `plus de ${min} €`;
    }
    return `${min + 1} à ${max} €`;
};

const getRemainingFeeQuartileData = reimbursement =>
    reimbursement.quartiles.map(({ min, max }, index) => ({
        name: `${min}-${max}`,
        label: getLabel(min, max),
        value: Math.round(
            reimbursement.pourcentage_reste_a_charge_par_quartile[index],
        ),
    }));

const getDonutsLegendData = (reimbursement, domain) => {
    const colors = scaleOrdinal()
        .domain(domain)
        .range(getRangeFromDomain(domain));

    const data = getPieData(getRemainingFeeQuartileData(reimbursement));

    return data.map(d => ({
        label: d.data.label,
        color: colors(d.index),
    }));
};

const prepareRemainingFeesData = reimbursement =>
    getRemainingFeeQuartileData(reimbursement).map((d, quartileIndex) => ({
        ...d,
        mostFrequentExpense:
            reimbursement.depense_plus_frequente[quartileIndex],
        tooltipLabel: props => (
            <RemainingFeesRepartitionTooltip
                prefix={reimbursement.tooltipPrefix}
                {...props}
            />
        ),
    }));

export class ReimbursementDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.expenseSliderMoved = false;
    }

    componentDidMount() {
        this.props.tracker &&
            this.props.tracker.track('reimbursements_details');
    }

    onSliderChange = value => {
        const { setExpense, tracker } = this.props;

        // do not trigger expense_slider_moved event twice
        if (!this.expenseSliderMoved) {
            tracker.track('expense_slider_moved');
            this.expenseSliderMoved = true;
        }

        setExpense(value);
    };

    render() {
        const {
            classes,
            expense,
            reimbursements,
            reimbursementDistributions,
            setExpense,
        } = this.props;

        const remainingFeesDomain = reimbursements[0].quartiles.map(
            ({ min, max }) => `${min}-${max}`,
        );

        const uniqueReimbursementDistributions = uniqBy(
            reimbursementDistributions,
            'maximumMutual',
        );

        return (
            <div className={classes.root}>
                <div className={classes.donutsWrapper}>
                    {reimbursements.map((reimbursement, index) => (
                        <div
                            key={reimbursement.id}
                            className={classes.donutWrapper}
                        >
                            {reimbursement.id === 'kalivia' && (
                                <div className={classes.kaliviaWrapper}>
                                    <img
                                        className={classes.kaliviaLogo}
                                        src={kalivia}
                                        alt="Kalivia"
                                        title="Réseau Kalivia"
                                    />
                                </div>
                            )}
                            {reimbursement.id === 'optam' && (
                                <div className={classes.kaliviaWrapper}>
                                    optam
                                </div>
                            )}
                            <RemainingFeesRepartitionChart
                                selectedRemainingFees={
                                    reimbursementDistributions[index]
                                        .remainingFees
                                }
                                setExpense={setExpense}
                                quartiles={reimbursement.quartiles}
                                title={reimbursement.nom}
                                titleFontSize={16}
                                legend={null}
                                data={prepareRemainingFeesData(reimbursement)}
                                domain={remainingFeesDomain}
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.legend}>
                    <Legend
                        where="bottom"
                        data={getDonutsLegendData(
                            reimbursements[0],
                            remainingFeesDomain,
                        )}
                    />
                </div>
                <div className={classes.sliderWrapper}>
                    {reimbursements[0].depense_plus_frequente[0] !==
                    reimbursements[0].depense_maximale ? (
                        <Fragment>
                            <div className={classes.sliderPrefix}>
                                Pour une dépense prévue de
                            </div>
                            <div className={classes.slider}>
                                <Slider
                                    onChange={this.onSliderChange}
                                    value={expense}
                                    withInput
                                    min={
                                        reimbursements[0]
                                            .depense_plus_frequente[0]
                                    }
                                    max={reimbursements[0].depense_maximale}
                                />
                            </div>
                            <div className={classes.sliderSuffix}>€</div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            Pour une dépense prévue de{' '}
                            {reimbursements[0].depense_maximale}&nbsp;€
                        </Fragment>
                    )}
                </div>
                {reimbursementDistributions && (
                    <div className={classes.distributionChartsWrapper}>
                        {uniqueReimbursementDistributions.map(distribution => (
                            <div
                                className={classes.distributionChartWrapper}
                                key={distribution.maximumMutual}
                            >
                                <ReimbursementDistributionChart
                                    {...distribution}
                                    height={144}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className={classes.franchise}>
                    <span className={classes.franchiseColor} />Franchise de 1 €
                </div>
            </div>
        );
    }
}

ReimbursementDetailsPage.propTypes = {
    classes: PropTypes.object,
    expense: PropTypes.number.isRequired,
    distribution: PropTypes.object,
    selectedRemainingFeesRange: PropTypes.number,
    selectRemainingFeesRange: PropTypes.func.isRequired,
    setExpense: PropTypes.func,
    tracker: PropTypes.object,
    reimbursements: PropTypes.arrayOf(PropTypes.object),
    reimbursementDistributions: PropTypes.arrayOf(
        PropTypes.shape({
            socialSecurity: PropTypes.number,
            mutual: PropTypes.number,
            remainingFees: PropTypes.number,
        }),
    ),
};

export default compose(
    withStyles(styles),
    withWoopra,
    connect(
        state => ({
            expense: selectExpense(state),
            reimbursements: selectReimbursements(state),
            reimbursementDistributions: selectReimbursementDistributions(state),
            selectedRemainingFeesRange: selectSelectedRemainingFeesRange(state),
        }),
        { setExpense, selectRemainingFeesRange },
    ),
)(ReimbursementDetailsPage);
