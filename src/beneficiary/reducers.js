import { createAction, handleActions } from 'redux-actions';

const initialState = null;

export const handleSetBeneficiary = (state, { payload: beneficiary }) => ({
    ...beneficiary,
    age: +beneficiary.age,
});

export const setBeneficiary = createAction('SET_BENEFICIARY');
export const beneficiaryReducer = handleActions(
    {
        [setBeneficiary]: handleSetBeneficiary,
    },
    initialState,
);
