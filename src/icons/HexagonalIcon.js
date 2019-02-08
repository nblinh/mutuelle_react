import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Hexagon from './Hexagon';
import { blueLight } from '../theme';

const styles = {
    root: {
        position: 'relative',
    },
    hexagon: {
        position: 'absolute',
        top: 0,
        left: 0,
        '& path': {
            stroke: blueLight,
            strokeWidth: 4,
        },
    },
    icon: {
        textAlign: 'center',
        fontSize: '0.5em',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-45%)',
    },
};

export const HexagonalIcon = ({ classes, className, children, size }) => (
    <div
        className={`${className} ${classes.root}`}
        style={{ width: size, height: size * 1.25, fontSize: size }}
    >
        <div className={classes.hexagon}>
            {/* keep this classname to allow customizing hover style */}
            <Hexagon className="hexagon" />
        </div>
        <div className={classes.icon}>{children}</div>
    </div>
);

HexagonalIcon.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.number,
};

HexagonalIcon.defaultProps = {
    className: '',
    size: 64,
};

export default withStyles(styles)(HexagonalIcon);
