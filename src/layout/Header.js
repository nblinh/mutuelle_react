import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        display: 'flex',
        borderBottom: '2px solid #ccc',
        alignItems: 'center',
    },
    logo: {
        flex: '0 0 280px',
        textAlign: 'center',
    },
    title: {
        paddingLeft: '37px',
        borderLeft: '1px solid #979797',
        flex: '1 0 0',
    },
};

const getLogoStyle = smallLogo => ({
    margin: smallLogo ? '20px 0 10px' : '27px',
});

export const Header = ({ classes, children, smallLogo = false }) => (
    <div className={classes.root}>
        <div className={classes.logo} style={getLogoStyle(smallLogo)}>
            <Link to="/">
                <Logo width={smallLogo ? 120 : 200} />
            </Link>
        </div>
        {children && <div className={classes.title}>{children}</div>}
    </div>
);

Header.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
    smallLogo: PropTypes.bool,
};

export default injectSheet(styles)(Header);
