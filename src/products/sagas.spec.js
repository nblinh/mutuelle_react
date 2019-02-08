import { call, put } from 'redux-saga/effects';

import { handleProductsFetch } from './sagas';
import { getProducts } from '../services/request';
import { storeRetrievedProducts } from './reducers';

describe('Products Saga', () => {
    describe('handleProductsFetch', () => {
        it('should not fetch products again if there are already fetched', () => {
            const iterator = handleProductsFetch();
            iterator.next();

            iterator.next([{ id: '1' }]);
            const { done } = iterator.next();

            expect(done).toBe(true);
        });

        it('should store API retrieved products into state', () => {
            const iterator = handleProductsFetch();
            iterator.next();

            const { value: apiCallValue } = iterator.next(null);
            expect(apiCallValue).toEqual(call(getProducts));

            const { value: storeValue } = iterator.next([{ id: '1' }]);
            expect(storeValue).toEqual(
                put(storeRetrievedProducts([{ id: '1' }])),
            );
        });

        it('should set application error if products are not fetchable', () => {
            const iterator = handleProductsFetch();
            iterator.next();

            iterator.next(null);
            const { value } = iterator.throw(new Error('Boom!'));

            const { type, payload } = value.PUT.action;
            expect(type).toBe('SET_ERROR');
            expect(payload.message).toBe(
                'Une erreur est survenue lors de la récupération des produits disponibles.',
            );
        });
    });
});
