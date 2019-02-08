import React from 'react';
import PropTypes from 'prop-types';

import {
    AnalysisIcon,
    DentistIcon,
    FrameGlassesIcon,
    GlassesIcon,
    HospitalIcon,
    OpticIcon,
    OtherIcon,
    PharmacyIcon,
} from '.';

const Icon = ({ name, ...otherProps }) => {
    switch (name) {
        case 'Analysis':
            return <AnalysisIcon {...otherProps} />;

        case 'Dentist':
            return <DentistIcon {...otherProps} />;

        case 'Hospital':
            return <HospitalIcon {...otherProps} />;

        case 'Optic':
            return <OpticIcon {...otherProps} />;

        case 'Other':
            return <OtherIcon {...otherProps} />;

        case 'Pharmacy':
            return <PharmacyIcon {...otherProps} />;

        case 'Glasses':
            return <GlassesIcon {...otherProps} />;

        case 'FrameGlasses':
            return <FrameGlassesIcon {...otherProps} />;

        default:
            return null;
    }
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
