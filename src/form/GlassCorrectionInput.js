import range from 'lodash.range';
import { scaleQuantize } from 'd3';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { orange, white } from '../theme';

const STEP_RADIUS = 2;
const NUMBER_STEPS = 13;
const CENTER_STEP_WIDTH = 10;
const CURSOR_WIDTH = 36;

const styles = {
    root: {
        boxSizing: 'border-box',
        position: 'relative',
        marginTop: '3rem',
    },
    background: {
        height: 4,
        borderRadius: `${STEP_RADIUS}px`,
        background: '#f7c679',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            width: CENTER_STEP_WIDTH,
            height: CENTER_STEP_WIDTH,
            background: orange,
            borderRadius: '50%',
            left: `calc(50% - ${CENTER_STEP_WIDTH / 2}px)`,
            top: `calc(50% - ${CENTER_STEP_WIDTH / 2}px)`,
        },
        display: 'flex',
        justifyContent: 'space-between',
    },
    gauge: {
        background: orange,
        transition: 'all 0.25s ease',
        position: 'absolute',
        height: '100%',
        borderRadius: `${STEP_RADIUS}px`,
    },
    step: {
        display: 'inline-block',
        flexBasis: 4,
        height: 4,
        borderRadius: 4,
        background: orange,
    },
    extrema: {
        fontSize: '0.75rem',
        fontFamily: 'bree',
        fontWeight: 300,
        display: 'flex',
        '& > span': {
            flexGrow: 1,
            '&:last-child': {
                textAlign: 'right',
            },
        },
    },
    valueCursor: {
        cursor: 'move',
        background: orange,
        color: white,
        width: CURSOR_WIDTH,
        height: '2rem',
        borderRadius: '50%',
        textAlign: 'center',
        fontFamily: 'bree',
        fontSize: '0.75rem',
        lineHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: '-2.55rem',
        marginLeft: -CURSOR_WIDTH / 2,
        '& small': {
            display: 'block',
            fontSize: '0.5rem',
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            border: '0.75rem solid transparent',
            borderTopColor: orange,
            top: '1.65rem',
            left: '50%',
            transform: 'translateX(-50%)',
        },
    },
};

export class GlassCorrectionInput extends PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number,
    };

    static defaultProps = {
        value: 0,
    };

    state = {
        dragging: false,
        x: 50,
        value: 0,
    };

    init = ref => {
        this.root = ref;
    };

    componentDidMount() {
        const { left } = this.root.getBoundingClientRect();

        this.left = left;

        this.scale = scaleQuantize()
            .domain([0, 100])
            .range(range(-12, 13));

        if (this.state.x === null) {
            this.setState({ x: this.scale.invertExtent(this.state.value) });
        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseDown = e => {
        // only left mouse button
        if (e.button !== 0) {
            return;
        }

        this.setState({
            dragging: true,
        });

        e.stopPropagation();
        e.preventDefault();
    };

    onMouseUp = e => {
        this.setState({
            dragging: false,
        });

        e.stopPropagation();
        e.preventDefault();
    };

    onMouseMove = e => {
        if (!this.state.dragging) {
            return;
        }

        const unzoomedX = e.clientX / global.devicePixelRatio;

        let x =
            (100 * (unzoomedX - this.left)) /
            this.root.getBoundingClientRect().width;

        if (x < 0) {
            x = 0;
        } else if (x > 100) {
            x = 100;
        }

        const value = this.scale(x);
        this.setState({ x, value });

        this.props.onChange(value);

        e.stopPropagation();
        e.preventDefault();
    };

    getGaugeStyle() {
        if (!this.width) {
            return {};
        }

        const { value } = this.state;

        const left =
            value >= 0
                ? this.width / 2
                : (value * this.width) / 24 + this.width / 2;

        const right =
            value <= 0
                ? this.width / 2
                : this.width - ((value * this.width) / 24 + this.width / 2);

        return { left, right };
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div
                className={classes.root}
                ref={this.init}
                role="slider"
                aria-valuemax="12"
                aria-valuemin="-12"
                aria-valuenow={value}
            >
                <div className={classes.background}>
                    {range(0, NUMBER_STEPS).map(i => (
                        <span className={classes.step} key={i} />
                    ))}
                    <div
                        className={classes.gauge}
                        style={this.getGaugeStyle()}
                    />
                </div>
                <div className={classes.extrema}>
                    <span>-12</span>
                    <span>+12</span>
                </div>
                <div
                    className={`cursor ${classes.valueCursor}`}
                    style={{ left: `${this.state.x}%` }}
                    onMouseDown={this.onMouseDown}
                >
                    {value > 0 ? `+${value}` : value}
                    {value >= 12 && <small>ou plus</small>}
                    {value <= -12 && <small>ou moins</small>}
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(GlassCorrectionInput);
