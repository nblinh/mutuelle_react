import React, { Component, Fragment } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/core/styles/withStyles';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Route from './Route';

import { theme } from './theme';
import store from './store';
import BeneficiaryPage from './beneficiary/BeneficiaryPage';
import QuestionPage from './questions/QuestionPage';
import Notifications from './layout/Notifications';
import WoopraProvider from './tracking/WoopraProvider';

const styles = {
    wrapper: {
        maxWidth: 1440,
        margin: 'auto',
    },
};

export class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <MuiThemeProvider theme={theme}>
                    <WoopraProvider>
                        <Router>
                            <Fragment>
                                <div style={styles.wrapper}>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/"
                                            component={BeneficiaryPage}
                                        />
                                        <Route
                                            path="/questions/:answers*"
                                            component={QuestionPage}
                                        />
                                    </Switch>
                                </div>
                                <Notifications />
                            </Fragment>
                        </Router>
                    </WoopraProvider>
                </MuiThemeProvider>
            </ReduxProvider>
        );
    }
}

export default withStyles(styles)(App);
