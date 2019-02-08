import { watchForGetReimbursements, fetchreimbursements } from './sagas';
import {
    startReimbursementsLoading,
    saveRetrievedReimbursements,
    setReimbursementsError,
} from './reducers';
import { call, put } from 'redux-saga/effects';
import { setError } from '../layout/reducers';

describe('Reimbursement Sagas', () => {
    describe('watchForGetReimbursements', () => {
        it('should start reimbursement loader at the beginning', () => {
            const iterator = watchForGetReimbursements({});
            const { value } = iterator.next();

            expect(value).toEqual(put(startReimbursementsLoading()));
        });

        it('should call the API to get reimbursements probabilities', () => {
            const iterator = watchForGetReimbursements({
                payload: { params: true },
            });
            iterator.next(); // set loading on
            const { value } = iterator.next();

            expect(value).toEqual(call(fetchreimbursements, { params: true }));
        });

        it('should save retrieved reimbursements if API call succeeded', () => {
            const iterator = watchForGetReimbursements({});
            iterator.next(); // set loading on
            iterator.next(); // API call

            const { value } = iterator.next({ reimbursement: true });
            expect(value).toEqual(
                put(saveRetrievedReimbursements({ reimbursement: true })),
            );
        });

        it('should set an error if API call failed', () => {
            const iterator = watchForGetReimbursements({});
            iterator.next(); // set loading on
            iterator.next(); // API call

            const error = new Error('Boom!');
            const { value } = iterator.throw(error);
            expect(value).toEqual(put(setReimbursementsError('Boom!')));
        });
    });
});
