import { call, put, takeLatest } from 'redux-saga/effects';
import { getRefunds } from '../services/request';

import {
    GET_REIMBURSEMENTS,
    saveRetrievedReimbursements,
    startReimbursementsLoading,
    setReimbursementsError,
} from './reducers';

export const fetchreimbursements = params =>
    getRefunds(params).then(({ data }) => data);

export function* watchForGetReimbursements({ payload }) {
    yield put(startReimbursementsLoading());

    try {
        const reimbursements = yield call(fetchreimbursements, payload);
        yield put(saveRetrievedReimbursements(reimbursements));
    } catch (err) {
        yield put(setReimbursementsError(err.message));
    }
}

export default function* reimbursementSagas() {
    yield takeLatest(GET_REIMBURSEMENTS, watchForGetReimbursements);
}
