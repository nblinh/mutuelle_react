import { createAction, handleActions } from 'redux-actions';

export const GET_REIMBURSEMENTS = 'GET_REIMBURSEMENTS';

export const getReimbursements = createAction(GET_REIMBURSEMENTS);
export const saveRetrievedReimbursements = createAction('SAVE_REIMBURSEMENTS');
export const startReimbursementsLoading = createAction(
    'START_REIMBURSEMENTS_LOADING',
);
export const setReimbursementsError = createAction('SET_REIMBURSEMENTS_ERROR');
export const selectRemainingFeesRange = createAction('SELECT_REMAINS_RANGE');
export const setExpense = createAction('SET_EXPENSE');
export const resetReimbursements = createAction('RESET_REIMBURSEMENTS');

const initialState = {
    loading: false,
    reimbursements: null,
    error: null,
    selectedRemainingFeesRange: 0,
    expense: null,
};

const getMostFrequentExpenseForFirstNotNullRemainingFeesRange = reimbursements => {
    const index = getFirstNotNullRemainingFeesRangeQuartileName(reimbursements);
    return reimbursements.depense_plus_frequente[index];
};

const getFirstNotNullRemainingFeesRangeQuartileName = reimbursements =>
    reimbursements.pourcentage_reste_a_charge_par_quartile.findIndex(
        v => v > 0,
    );

export const handleSaveRetrievedReimbursements = (
    state,
    { payload: reimbursements },
) => ({
    ...state,
    reimbursements,
    loading: false,
    selectedRemainingFeesRange: getFirstNotNullRemainingFeesRangeQuartileName(
        reimbursements[0],
    ),
    expense: getMostFrequentExpenseForFirstNotNullRemainingFeesRange(
        reimbursements[0],
    ),
});

export const handleSelectRemainingFeesRange = (
    state,
    { payload: quartileName },
) => ({
    ...state,
    selectedRemainingFeesRange: quartileName,
    expense: state.reimbursements[0].depense_plus_frequente[quartileName],
});

export const getSelectedRemainingFeesRangeFromRemainsFee = (
    remainsFee,
    quartiles,
) =>
    quartiles.findIndex(
        ({ min, max }) =>
            (min === null || remainsFee > min) &&
            (max === null || remainsFee <= max),
    );

export const handleSetExpense = (state, { payload }) => ({
    ...state,
    expense: payload,
    selectedRemainingFeesRange: getSelectedRemainingFeesRangeFromRemainsFee(
        payload -
            state.reimbursements[0].remboursement_securite_sociale -
            state.reimbursements[0].remboursement_mutuelle,
        state.reimbursements[0].quartiles,
    ),
});

export const reimbursementsReducer = handleActions(
    {
        [saveRetrievedReimbursements]: handleSaveRetrievedReimbursements,
        [startReimbursementsLoading]: state => ({
            ...state,
            reimbursements: null,
            loading: true,
        }),
        [setReimbursementsError]: (state, { payload: error }) => ({
            ...state,
            error,
            loading: false,
        }),
        [selectRemainingFeesRange]: handleSelectRemainingFeesRange,
        [setExpense]: handleSetExpense,
        [resetReimbursements]: () => initialState,
    },
    initialState,
);
