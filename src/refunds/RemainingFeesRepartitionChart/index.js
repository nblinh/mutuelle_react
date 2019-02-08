import { arc, pie, easeExp, scaleOrdinal } from 'd3';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { NodeGroup } from 'react-move';

import { orange, yellow, blue, blueLight, white, gray } from '../../theme';
import Legend from './Legend';

const TOOLTIP_HEIGHT = 56;
const TOOLTIP_WIDTH = 180;
const TOOLTIP_CHART_MARGIN = 10;

const styles = {
    root: {
        position: 'relative',
    },
    label: {
        fontFamily: 'Bree',
        fontSize: 18,
        cursor: 'pointer',
    },
    title: {
        fontFamily: 'Bree',
        fontSize: 24,
        fontWeight: 'normal',
        fill: gray,
        letterSpacing: '0.05rem',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 140,
        height: 140,
        borderRadius: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    legend: {
        position: 'absolute',
        top: 0,
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        fontSize: 13,
        fontFamily: 'Bree',
        border: '1px solid transparent',
        padding: '8px 16px',
        background: '#fff',
        transition: 'opacity 0.5s',
        '& strong': {
            fontWeight: 'normal',
            color: orange,
        },
        '& .before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            border: 'solid 13px transparent',
        },
        '& .after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            border: 'solid 12px transparent',
        },
    },
    slice: {
        cursor: 'pointer',
    },
};

const getArc = ({ startAngle, endAngle, innerRadius, outerRadius }) =>
    arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)({
        startAngle,
        endAngle,
    });

export const getPieData = pie()
    .sort(({ name: a }, { name: b }) => {
        let [aMin, aMax] = a.split('-');
        aMin = aMin === null ? -1 : aMin;
        aMax = aMax === null ? -1 : aMax;
        let [bMin, bMax] = b.split('-');
        bMin = bMin === null ? -1 : bMin;
        bMax = bMax === null ? -1 : bMax;

        return aMin > bMin && aMax > bMax;
    })
    .value(d => d.value);

export const colorsFactory = domain =>
    scaleOrdinal()
        .domain(domain)
        .range(getRangeFromDomain(domain));

const getFontSizeStyle = fontSize => ({ fontSize });

export const getRangeFromDomain = domain => {
    switch (domain.length) {
        case 2:
            return [orange, blue];
        case 3:
            return [orange, blueLight, blue];
        case 4:
        default:
            return [orange, yellow, blueLight, blue];
    }
};

export const getMatchingExpenseQuartileIndex = (
    selectedRemainingFees,
    quartiles,
) =>
    quartiles.findIndex(q => {
        if (q.min !== null && selectedRemainingFees <= q.min) {
            return false;
        }

        if (q.max !== null && selectedRemainingFees > q.max) {
            return false;
        }

        return true;
    });

export class RemainingFeesRepartitionChart extends Component {
    state = {
        root: null,
        height: null,
        width: null,
        tooltip: null,
    };

    init = node => (this.root = node);

    resize = () => {
        if (!this.root) {
            return;
        }

        const { height, width } = this.root.parentNode.getBoundingClientRect();

        const size = Math.min(height, width);
        const outerHoveredRadius = (size * 0.9) / 2;
        const outerRadius = outerHoveredRadius * 0.9375;
        const innerRadius = outerRadius * 0.6;

        const normalArc = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        this.setState({
            height,
            width,
            outerRadius,
            outerHoveredRadius,
            innerRadius,
            normalArc,
        });
    };

    colors = d => colorsFactory(this.props.domain)(d);

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    getTooltipX = data => {
        const { normalArc, outerHoveredRadius, width } = this.state;

        const [centroidX] = normalArc.centroid(data);

        if (centroidX > 0) {
            return width / 2 + outerHoveredRadius + TOOLTIP_CHART_MARGIN;
        }

        return (
            width / 2 -
            outerHoveredRadius -
            TOOLTIP_CHART_MARGIN -
            TOOLTIP_WIDTH
        );
    };

    getTooltipY = data => {
        const [, centroidY] = this.state.normalArc.centroid(data);
        return this.state.height / 2 + centroidY - TOOLTIP_HEIGHT / 2;
    };

    getTooltipStyle = (d, matchingExpenseQuartileIndex) => ({
        top: this.getTooltipY(d),
        left: this.getTooltipX(d),
        borderColor: this.colors(d.data.name),
        opacity: this.isDataSelectedForTooltip(d, matchingExpenseQuartileIndex)
            ? 1
            : 0,
        width: TOOLTIP_WIDTH,
    });

    getTooltipBeforeArrowStyle = d => {
        const [x] = this.state.normalArc.centroid(d);

        if (x > 0) {
            return {
                right: '100%',
                borderRightColor: this.colors(d.data.name),
            };
        }

        return {
            left: '100%',
            borderLeftColor: this.colors(d.data.name),
        };
    };

    getTooltipAfterArrowStyle = data => {
        const [x] = this.state.normalArc.centroid(data);

        if (x > 0) {
            return {
                right: '100%',
                borderRightColor: '#fff',
            };
        }

        return {
            left: '100%',
            borderLeftColor: '#fff',
        };
    };

    onMouseEnter = d => () => this.setState({ tooltip: d.index });
    onMouseLeave = () => this.setState({ tooltip: null });

    isDataSelectedForTooltip = (d, matchingExpenseQuartileIndex) => {
        const { index } = d;

        return (
            index === this.state.tooltip ||
            (index === matchingExpenseQuartileIndex &&
                this.state.tooltip === null)
        );
    };

    handleRangeClick = index => {
        const { data, setExpense } = this.props;

        return setExpense(data[index].mostFrequentExpense);
    };

    render() {
        const {
            classes,
            data,
            selectedRemainingFees,
            quartiles,
            legend = true,
            labelFontSize,
            title,
            titleFontSize,
        } = this.props;

        const { normalArc } = this.state;

        const pieData = getPieData(data);
        const matchingExpenseQuartileIndex = getMatchingExpenseQuartileIndex(
            selectedRemainingFees,
            quartiles,
        );

        return (
            <div className={classes.root} ref={this.init}>
                {this.state.width > 0 && (
                    <Fragment>
                        {title && (
                            <div
                                className={classes.title}
                                style={{ fontSize: titleFontSize }}
                            >
                                {title}
                            </div>
                        )}
                        <svg
                            width={this.state.width}
                            height={this.state.height}
                        >
                            <NodeGroup
                                data={pieData.filter(
                                    ({ data: { value } }) => value !== 0,
                                )}
                                keyAccessor={d => d.data.name}
                                start={({ startAngle }) => ({
                                    startAngle,
                                    endAngle: startAngle,
                                    innerRadius: this.state.innerRadius,
                                    outerRadius: this.state.outerRadius,
                                })}
                                enter={({ endAngle, index }) => ({
                                    endAngle: [endAngle],
                                    outerRadius:
                                        index === matchingExpenseQuartileIndex
                                            ? this.state.outerHoveredRadius
                                            : this.state.outerRadius,
                                    timing: {
                                        duration: 500,
                                        ease: easeExp,
                                    },
                                })}
                                update={({ index }) => ({
                                    outerRadius:
                                        index === matchingExpenseQuartileIndex
                                            ? [this.state.outerHoveredRadius]
                                            : [this.state.outerRadius],
                                    timing: { duration: 200, ease: easeExp },
                                })}
                                styles={pieData.map(d => ({
                                    key: d.data.name,
                                    data: d,
                                    style: {
                                        d,
                                    },
                                }))}
                            >
                                {interpolated => (
                                    <g
                                        transform={`translate(${this.state
                                            .width / 2},${this.state.height /
                                            2})`}
                                    >
                                        {interpolated.map(
                                            ({ key, data: d, state }) => (
                                                <g
                                                    key={key}
                                                    className={classes.slice}
                                                    onMouseEnter={this.onMouseEnter(
                                                        d,
                                                    )}
                                                    onMouseLeave={
                                                        this.onMouseLeave
                                                    }
                                                    onClick={() =>
                                                        this.handleRangeClick(
                                                            d.index,
                                                        )
                                                    }
                                                >
                                                    <path
                                                        d={getArc(state)}
                                                        fill={this.colors(
                                                            d.data.name,
                                                        )}
                                                    />
                                                </g>
                                            ),
                                        )}
                                        {interpolated.map(
                                            ({ key, data: d }) => (
                                                <text
                                                    key={key}
                                                    onMouseEnter={this.onMouseEnter(
                                                        d,
                                                    )}
                                                    onMouseLeave={
                                                        this.onMouseLeave
                                                    }
                                                    className={classes.label}
                                                    style={getFontSizeStyle(
                                                        labelFontSize,
                                                    )}
                                                    x={normalArc.centroid(d)[0]}
                                                    y={normalArc.centroid(d)[1]}
                                                    textAnchor="middle"
                                                    fill={white}
                                                    onClick={() =>
                                                        this.handleRangeClick(
                                                            d.index,
                                                        )
                                                    }
                                                >
                                                    {`${Math.round(
                                                        d.value,
                                                        2,
                                                    )} %`}
                                                </text>
                                            ),
                                        )}
                                    </g>
                                )}
                            </NodeGroup>
                        </svg>
                        {legend && (
                            <Legend
                                where={legend}
                                data={pieData.map(d => ({
                                    color: this.colors(d.data.name),
                                    label: d.data.label,
                                }))}
                            />
                        )}
                        {pieData.map(d => (
                            <div
                                key={d.data.name}
                                role="tooltip"
                                className={`${classes.tooltip}`}
                                style={this.getTooltipStyle(
                                    d,
                                    matchingExpenseQuartileIndex,
                                )}
                            >
                                <div
                                    className="before"
                                    style={this.getTooltipBeforeArrowStyle(d)}
                                />
                                {d.data.tooltipLabel(d.data)}
                                <div
                                    className="after"
                                    style={this.getTooltipAfterArrowStyle(d)}
                                />
                            </div>
                        ))}
                    </Fragment>
                )}
            </div>
        );
    }
}

RemainingFeesRepartitionChart.propTypes = {
    classes: PropTypes.object,
    selectedRemainingFees: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            tooltipLabel: PropTypes.func.isRequired,
            value: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setExpense: PropTypes.func,
    legend: PropTypes.string,
    labelFontSize: PropTypes.number,
    title: PropTypes.string,
    titleFontSize: PropTypes.number,
    domain: PropTypes.arrayOf(PropTypes.string),
    quartiles: PropTypes.arrayOf(
        PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
        }),
    ),
};

RemainingFeesRepartitionChart.defaultProps = {
    setExpense: () => null,
    legend: true,
    labelFontSize: 18,
    titleFontSize: 24,
};

export default injectSheet(styles)(RemainingFeesRepartitionChart);
