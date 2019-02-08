import React from 'react';
import { Field } from 'redux-form';

export default BaseComponent => {
    const Component = props => <Field component={BaseComponent} {...props} />;

    Component.displayName = BaseComponent.displayName;

    return Component;
};
