import React from 'react';

import { WoopraContext } from './WoopraProvider';

export default BaseComponent => props => (
    <WoopraContext.Consumer>
        {({ tracker }) => <BaseComponent tracker={tracker} {...props} />}
    </WoopraContext.Consumer>
);
