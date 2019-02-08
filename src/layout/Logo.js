import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';

export const Logo = ({ width = 200 }) => (
    <img
        src={logo}
        alt="Harmonie Mutuelle"
        title="Harmonie Mutuelle"
        width={width}
    />
);

Logo.propTypes = {
    classes: PropTypes.object,
    width: PropTypes.number,
};

export default Logo;
