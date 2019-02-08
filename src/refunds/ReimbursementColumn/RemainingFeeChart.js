import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { PieChart } from '../../chart/PieChart';
import { blueLight, gray } from '../../theme';

import labelArrow from './label-arrow.png';

const styles = {
    root: {
        marginBottom: 12,
    },
    chart: {
        textAlign: 'center',
    },
    legend: {
        border: `1px solid ${blueLight}`,
        fontSize: 14,
        lineHeight: '19px',
        fontWeight: 300,
        fontFamily: 'bree',
        color: gray,
        letterSpacing: '0.035rem',
        '& strong': {
            color: blueLight,
            fontWeight: 'normal',
        },
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: "''",
            background: `url(${labelArrow}) no-repeat`,
            width: 21,
            height: 20,
            bottom: -20,
            left: 'calc(50% - 10px)',
        },
        padding: '8px 10px',
        marginBottom: 28,
    },
};

export const RemainingFeeChart = ({
    classes,
    colors,
    data,
    legend,
    strokeColor,
}) => (
    <div className={classes.root}>
        <div className={classes.legend}>{legend}</div>
        <div className={classes.chart}>
            <PieChart
                radius={48}
                colors={colors}
                data={data}
                strokeColor={strokeColor}
            />
        </div>
    </div>
);

RemainingFeeChart.propTypes = {
    classes: PropTypes.object,
    colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    data: PropTypes.array,
    legend: PropTypes.node,
    strokeColor: PropTypes.string,
};

export default injectSheet(styles)(RemainingFeeChart);
