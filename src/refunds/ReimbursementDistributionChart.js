import { scaleOrdinal, stack, scaleLinear, select } from 'd3';
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { lightGreen, green, darkGreen, blue } from '../theme';

const LABEL_WIDTH = 168;

const color = scaleOrdinal()
    .domain(['socialSecurity', 'mutual', 'remainingFees'])
    .range([lightGreen, green, darkGreen]);

const getStackData = stack().keys([
    'socialSecurity',
    'mutual',
    'remainingFees',
]);

const labels = {
    socialSecurity: 'de remboursement sécurité sociale',
    mutual: 'de remboursement mutuelle',
    remainingFees: 'de reste à payer par vous',
};

const styles = {
    root: {
        fontFamily: 'Myriad Pro',
    },
    barContainer: {
        display: 'flex',
    },
    bar: {
        transition: 'width 0.5s',
    },
    labelContainer: {
        position: 'relative',
    },
    label: {
        boxSizing: 'border-box',
        position: 'absolute',
        border: '1px solid',
        maxWidth: LABEL_WIDTH,
        padding: '8px',
        marginTop: '24px',
        transition: 'left 0.5s',
    },
    labelBefore: {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        marginLeft: '-23px',
        width: 0,
        height: 0,
        borderBottom: `solid 23px ${darkGreen}`,
        borderLeft: 'solid 23px transparent',
        borderRight: 'solid 23px transparent',
    },
    labelAfter: {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        marginLeft: '-22px',
        width: 0,
        height: 0,
        borderBottom: 'solid 22px white',
        borderLeft: 'solid 22px transparent',
        borderRight: 'solid 22px transparent',
    },
    priceLabel: {
        fontSize: '1.5rem',
    },
    typeLabel: {
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05rem',
    },
};

const formatCurrency = amount =>
    new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    })
        .format(amount)
        .replace(',00', '');

export class ReimbursementDistributionChart extends Component {
    state = {
        width: null,
    };

    init = ref => (this.root = select(ref));

    getRectStyle = (d, x) => {
        const { height } = this.props;
        return {
            width: x(d[0][1] - d[0][0]),
            height: height / 4,
            backgroundColor: color(d.key),
        };
    };

    getLabelStyle = (d, x) => {
        if (!d) {
            return {
                width: 5,
                height: this.props.height / 4,
                backgroundColor: blue,
            };
        }
        return {
            borderColor: d.key === 'remainingFees' ? 'transparent' : darkGreen,
            backgroundColor: d.key === 'remainingFees' ? darkGreen : 'white',
            color: d.key === 'remainingFees' ? 'white' : 'black',
            left: x(d[0][1]) - x(d[0][1] - d[0][0]) / 2 - LABEL_WIDTH / 2,
        };
    };

    componentDidMount() {
        const { width } = this.root.node().getBoundingClientRect();

        this.setState({
            width: width - LABEL_WIDTH / 2, // handle null remaining fees
        });
    }

    render() {
        const {
            classes,
            height,
            socialSecurity,
            mutual,
            remainingFees,
            style,
        } = this.props;

        const total = socialSecurity + mutual + remainingFees;

        const x = scaleLinear()
            .range([0, this.state.width])
            .domain([0, total]);

        const stackData = getStackData([
            { socialSecurity, mutual, remainingFees },
        ]);

        return (
            <div
                ref={this.init}
                className={classes.root}
                height={height}
                style={{
                    ...style,
                    marginBottom: height,
                }}
            >
                <div className={classes.barContainer}>
                    <div className={classes.bar} style={this.getLabelStyle()} />
                    {stackData.map(d => (
                        <div
                            className={classes.bar}
                            key={d.key}
                            style={this.getRectStyle(d, x)}
                        />
                    ))}
                </div>
                <div className={classes.labelContainer}>
                    {stackData.map(d => {
                        const value = d[0].data[d.key];
                        return (
                            <div
                                className={classes.label}
                                role="tooltip"
                                key={d.key}
                                style={this.getLabelStyle(d, x)}
                            >
                                <div className={classes.labelBefore} />
                                <div>
                                    {formatCurrency(
                                        d.key === 'socialSecurity'
                                            ? value - 1
                                            : value,
                                    )}
                                </div>
                                <div>{labels[d.key]}</div>
                                {d.key !== 'remainingFees' && (
                                    <div className={classes.labelAfter} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

ReimbursementDistributionChart.propTypes = {
    socialSecurity: PropTypes.number.isRequired,
    mutual: PropTypes.number,
    remainingFees: PropTypes.number,
    classes: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles)(ReimbursementDistributionChart);
