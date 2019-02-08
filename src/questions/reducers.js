import { createAction, handleActions } from 'redux-actions';

const initialState = {
    questions: null,
};

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';

export const saveRetrievedQuestions = createAction('SAVE_RETRIEVED_QUESTIONS');
export const loadQuestions = createAction(LOAD_QUESTIONS);

export const handleSaveRetrievedQuestions = (
    state,
    { payload: questions },
) => ({
    ...state,
    questions,
});

export const questionReducer = handleActions(
    {
        [saveRetrievedQuestions]: handleSaveRetrievedQuestions,
    },
    initialState,
);
