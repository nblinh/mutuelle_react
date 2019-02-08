import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { selectProducts } from './selectors';
import { setError } from '../layout/reducers';
import { PRODUCTS_FETCH, storeRetrievedProducts } from './reducers';
import { getProducts } from '../services/request';

export function* handleProductsFetch() {
    const products = yield select(selectProducts);
    if (products) {
        return;
    }

    try {
        const fetchedProducts = yield call(getProducts);
        yield put(storeRetrievedProducts(fetchedProducts));
    } catch (err) {
        yield put(
            setError({
                message:
                    'Une erreur est survenue lors de la récupération des produits disponibles.',
                stack: err.stack,
            }),
        );
    }
}

export default function* productsSaga() {
    yield all([takeLatest(PRODUCTS_FETCH, handleProductsFetch)]);
}
