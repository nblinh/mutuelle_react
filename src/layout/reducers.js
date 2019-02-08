import { createAction, handleActions } from 'redux-actions';

export const setError = createAction('SET_ERROR');
export const handleSetError = (state, { payload: error }) => ({
    ...state,
    notifications: [...state.notifications, { ...error, type: 'error' }],
});

export const closeNotification = createAction('CLOSE_NOTIFICATION');
export const handleCloseNotification = state => ({
    ...state,
    notifications: state.notifications.slice(1),
});

const initialState = { notifications: [] };
export const layoutReducer = handleActions(
    {
        [closeNotification]: handleCloseNotification,
        [setError]: handleSetError,
    },
    initialState,
);
