import { all, fork } from 'redux-saga/effects';
import questionsSaga from './questions/sagas';
import reimbursementSagas from './refunds/sagas';
import productsSaga from './products/sagas';

export default function*() {
    yield all(
        [questionsSaga, productsSaga, reimbursementSagas].map(saga =>
            fork(saga),
        ),
    );
}
