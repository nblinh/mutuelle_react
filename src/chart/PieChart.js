import { select, scaleOrdinal, interpolate, easeExp } from 'd3';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pie, arc } from 'd3-shape';
import { orange, blue, red, blueLight } from '../theme';

const STROKE_WIDTH = 1;

const getArc = radius =>
    arc()
        .innerRadius(0)
        .outerRadius(Math.floor(radius));

const getPieData = pie().sortValues((a, b) => a - b);

export class PieChart extends Component {
    state = {
        root: null,
    };

    init = ref => this.setState({ root: select(ref) }, this.redraw);

    shouldComponentUpdate() {
        return false;
    }

    color = scaleOrdinal().range(this.props.colors);

    redraw() {
        const { data: rawData, radius, strokeColor } = this.props;
        const pieData = getPieData(rawData);

        const arc = getArc(radius);

        const slices = this.state.root.selectAll('.slice').data(pieData);

        const arcTween = function(d) {
            const interpolateFn = interpolate(
                { startAngle: 0, endAngle: 0 },
                d,
            );
            return function(t) {
                return arc(interpolateFn(t));
            };
        };

        slices.exit().remove();

        slices
            .enter()
            .append('path')
            .classed('slice', true)
            .attr('fill', (d, index) => this.color(index))
            .attr(
                'transform',
                `translate(${radius + STROKE_WIDTH},${radius + STROKE_WIDTH})`,
            )
            .attr('stroke', strokeColor)
            .transition()
            .duration(1000)
            .ease(easeExp)
            .attrTween('d', arcTween);
    }

    render() {
        const { radius, style } = this.props;
        const outerRadius = (radius + STROKE_WIDTH) * 2;

        return (
            <svg
                ref={this.init}
                width={outerRadius}
                height={outerRadius}
                style={style}
            />
        );
    }
}

PieChart.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    radius: PropTypes.number.isRequired,
    strokeColor: PropTypes.string,
    style: PropTypes.object,
};

PieChart.defaultProps = {
    colors: [blue, orange, red, blueLight],
};

export default PieChart;
