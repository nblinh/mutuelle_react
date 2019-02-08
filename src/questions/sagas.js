import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { loadedQuestionsSelector } from './selectors';
import { setError } from '../layout/reducers';
import { LOAD_QUESTIONS, saveRetrievedQuestions } from './reducers';
import { getQuestions } from '../services/request';

export const fetchQuestions = () => getQuestions().then(({ data }) => data);

export function* watchForLoadQuestion() {
    const loadedQuestions = yield select(loadedQuestionsSelector);
    if (loadedQuestions) {
        return;
    }

    try {
        const questions = yield call(fetchQuestions);
        yield put(saveRetrievedQuestions(questions));
    } catch (err) {
        yield put(
            setError({
                message:
                    'Une erreur est survenue lors du téléchargement des questions.',
                stack: err.stack,
            }),
        );
    }
}

export default function* questionsSaga() {
    yield all([takeLatest(LOAD_QUESTIONS, watchForLoadQuestion)]);
}
