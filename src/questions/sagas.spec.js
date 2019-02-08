import { watchForLoadQuestion, fetchQuestions } from './sagas';
import { put, call } from 'redux-saga/effects';
import { saveRetrievedQuestions } from './reducers';
import { setError } from '../layout/reducers';

describe('Questions Sagas', () => {
    describe('watchForLoadQuestion', () => {
        it('should not query questions API if questions are already in state', function() {
            const iterator = watchForLoadQuestion();
            iterator.next();

            const { done } = iterator.next({}); // loading questions from state
            expect(done).toBe(true);
        });

        it('should save questions in state once retrieved', () => {
            const iterator = watchForLoadQuestion();
            iterator.next();

            const { value: fetchValue } = iterator.next(null); // loading questions from state
            expect(fetchValue).toEqual(call(fetchQuestions));

            const { value: putValue } = iterator.next({ id: 1 }); // API call
            expect(putValue).toEqual(put(saveRetrievedQuestions({ id: 1 })));
        });

        it('should put an error in state if questions fetch fails', () => {
            const iterator = watchForLoadQuestion();
            iterator.next();

            iterator.next(null); // loading questions from state

            const err = new Error('Network Error');
            const { value } = iterator.throw(err); // API call
            expect(value).toEqual(
                put(
                    setError({
                        message:
                            'Une erreur est survenue lors du téléchargement des questions.',
                        stack: err.stack,
                    }),
                ),
            );
        });
    });
});
