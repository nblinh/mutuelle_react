import { Route as RouteBase } from 'react-router-dom';
import { lifecycle } from 'recompose';

import withWoopra from './tracking/withWoopra';

const locationToUrl = location =>
    `${location.pathname}${location.hash}${location.search}`;

export const Route = lifecycle({
    componentDidUpdate(prevProps) {
        if (
            this.props.location.pathname === prevProps.location.pathname &&
            this.props.location.hash === prevProps.location.hash &&
            this.props.location.search === prevProps.location.search
        ) {
            return;
        }

        this.props.tracker.track('viewed_page', {
            url: locationToUrl(this.props.location),
        });
    },
    componentDidMount() {
        this.props.tracker.track('viewed_page', {
            url: locationToUrl(this.props.location),
        });
    },
})(RouteBase);

export default withWoopra(Route);
