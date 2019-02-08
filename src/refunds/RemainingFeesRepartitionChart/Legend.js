import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    root: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Bree',
        fontSize: 18,
    },
    label: {
        display: 'flex',
        marginRight: '2rem',
        marginBottom: '0.5rem',
        alignItems: 'center',
    },
    color: {
        marginRight: '0.5rem',
        width: 14,
        height: 14,
        borderRadius: '50%',
    },
};

const getRootStyle = where => {
    return where === 'bottom'
        ? {
              left: 0,
              right: 0,
          }
        : {
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              flexDirection: 'column',
          };
};

export const Legend = ({ classes, data, where }) => (
    <div className={classes.root} style={getRootStyle(where)}>
        {data.map(({ color, label }) => (
            <div className={classes.label} key={color}>
                <div className={classes.color} style={{ background: color }} />
                <div>{label}</div>
            </div>
        ))}
    </div>
);

Legend.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ),
    where: PropTypes.oneOf(['bottom', 'aside']),
};

export default withStyles(styles)(Legend);
