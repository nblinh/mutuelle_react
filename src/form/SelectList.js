/* eslint-disable react/prop-types */

import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import withField from './withField';

import 'react-select/dist/react-select.css';

const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '2rem',
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            border: 0,
            height: 'auto',
            background: 'transparent !important',
            padding: '10px 22px',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        '.Select--single': {
            padding: 0,
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
        },
        '.Select--multi .Select-input': {
            margin: 0,
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: 0,
            color: theme.palette.text.primary,
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2,
        },
        '.Select-input': {
            display: 'inline-flex !important',
            padding: 0,
            height: 'auto',
        },
        '.Select-input input': {
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            margin: 0,
            outline: 0,
        },
        '.Select-placeholder, .Select--single .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: '1rem',
            padding: '10px 22px !important',
        },
        '.Select-placeholder': {
            opacity: 0.42,
            color: theme.palette.common.black,
        },
        '.Select-menu-outer': {
            border: '1px solid #979797',
            backgroundColor: '#F3F3F3',
            fontSize: '1rem',
            position: 'absolute',
            left: 0,
            top: `calc(100% + ${theme.spacing.unit}px)`,
            width: '100%',
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5,
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            boxShadow: 'none',
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto',
        },
        '.Select-menu div': {
            boxSizing: 'content-box',
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1,
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1,
        },
    },
});

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

const SelectWrapped = ({ classes, ...otherProps }) => (
    <Select
        optionComponent={Option}
        noResultsText={
            <Typography>
                {'Aucun résultat ne correspond à votre recherche.'}
            </Typography>
        }
        arrowRenderer={() => null}
        clearRenderer={() => null}
        valueComponent={valueProps => {
            const { children } = valueProps;
            return <div className="Select-value">{children}</div>;
        }}
        {...otherProps}
    />
);

class SelectList extends React.Component {
    render() {
        const {
            classes,
            choices,
            label,
            input,
            meta: { error, touched },
            name,
            options,
            ...otherProps
        } = this.props;

        return (
            <div className={classes.root}>
                <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    placeholder={label}
                    inputProps={{
                        classes,
                        name,
                        instanceId: name,
                        simpleValue: true,
                        options,
                    }}
                    error={error && touched}
                    {...input}
                    onBlur={() =>
                        input && input.onBlur && input.onBlur(input.value)
                    }
                    {...otherProps}
                />
            </div>
        );
    }
}

SelectList.propTypes = {
    classes: PropTypes.object.isRequired,
};

SelectList.defaultProps = {
    meta: {},
};

export const SimpleSelectList = withStyles(styles)(SelectList);

export default compose(
    withStyles(styles),
    withField,
)(SelectList);
