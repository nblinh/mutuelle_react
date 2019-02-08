import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import RadioList from '../../../form/RadioList';
import Fieldset from '../../../form/Fieldset';
import GlassCorrectionInput from '../../../form/GlassCorrectionInput';

const styles = {
    content: {
        display: 'flex',
        marginLeft: '8rem',
        marginRight: '5rem',
        alignItems: 'center',
    },
    label: {
        flex: '1 0 0',
        fontFamily: 'bree',
        fontSize: 18,
        letterSpacing: '0.05rem',
        textAlign: 'right',
        marginRight: '5rem',
    },
    field: {
        flexGrow: 3,
    },
};

export const GlassFieldset = ({
    classes,
    className,
    glass,
    label,
    onCorrectionChange,
    onTypeChange,
}) => (
    <Fieldset className={className} label={label}>
        <div className={classes.content}>
            <div className={classes.label}>Type</div>
            <div className={classes.field}>
                <RadioList
                    name={label.replace(/[^a-z0-9]/i, '-')}
                    choices={[
                        { value: 'simple', label: 'Simple' },
                        { value: 'progressif', label: 'Progressif' },
                    ]}
                    onChange={onTypeChange}
                    value={glass.type}
                />
            </div>
        </div>
        <div className={classes.content}>
            <div className={classes.label} style={{ marginTop: '1.75rem' }}>
                Correction
            </div>
            <div className={classes.field}>
                <GlassCorrectionInput
                    value={glass.correction}
                    onChange={onCorrectionChange}
                />
            </div>
        </div>
    </Fieldset>
);

GlassFieldset.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    glass: PropTypes.shape({
        type: PropTypes.oneOf(['simple', 'progressif']),
        correction: PropTypes.number,
    }).isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onCorrectionChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default injectSheet(styles)(GlassFieldset);
