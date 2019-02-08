import { createAction, handleActions } from 'redux-actions';

const initialState = {
    products: null,
};

export const PRODUCTS_FETCH = 'PRODUCTS_FETCH';
export const fetchProducts = createAction(PRODUCTS_FETCH);

export const storeRetrievedProducts = createAction('PRODUCTS_FETCH_SUCCESS');
export const handleStoreRetrievedProducts = (state, { payload: products }) => ({
    ...state,
    products,
});

export const productsReducer = handleActions(
    {
        [storeRetrievedProducts]: handleStoreRetrievedProducts,
    },
    initialState,
);
