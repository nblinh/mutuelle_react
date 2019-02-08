import {
    answeredQuestionsSelector,
    currentQuestionSelector,
    isFirstQuestionSelector,
    getAnswerData,
    getHistoryAnswers,
} from './selectors';
import { TEMPLATE_GLASSES } from './questions/gabarits';

describe('Questions Selectors', () => {
    describe('answeredQuestionsSelector', () => {
        it('should return an empty array if questions tree has not been retrieved yet', () => {
            const state = {
                questions: {
                    questions: null,
                },
            };

            const answers = answeredQuestionsSelector(state);
            expect(answers).toEqual({});
        });

        it('should return a list of questions with given answers from URL', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'type',
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                        nextQuestion: {
                            gynecologue: {
                                name: 'secteur',
                                question: 'Votre médecin est-il conventionné ?',
                                answers: [
                                    { label: 'Secteur 1', value: 'secteur-1' },
                                ],
                                nextQuestion: {
                                    'secteur-1': {},
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'gynecologue/secteur-1',
                    },
                },
            };

            const answers = answeredQuestionsSelector(state, props);
            expect(answers).toEqual({
                type: {
                    question: 'Quel type de praticien désirez-vous consulter ?',
                    answer: {
                        label: 'Gynécologue',
                        value: 'gynecologue',
                    },
                },
                secteur: {
                    question: 'Votre médecin est-il conventionné ?',
                    answer: {
                        label: 'Secteur 1',
                        value: 'secteur-1',
                    },
                },
            });
        });

        it('should transform glasses answer value into a more humane format', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'glasses',
                        gabarit: TEMPLATE_GLASSES,
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'progressif+2_simple-3',
                    },
                },
            };

            const answers = answeredQuestionsSelector(state, props);
            expect(answers).toEqual({
                glasses: {
                    answer: {
                        label: 'verre progressif +2 et verre simple -3',
                        value: 'progressif+2_simple-3',
                    },
                    gabarit: 'verre',
                },
            });
        });
    });

    describe('currentQuestionSelector', () => {
        it('should return current question data for given answer level', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'type',
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                        nextQuestion: {
                            gynecologue: {
                                name: 'secteur',
                                question: 'Votre médecin est-il conventionné ?',
                                answers: [
                                    { label: 'Secteur 1', value: 'secteur-1' },
                                ],
                                nextQuestion: {
                                    'secteur-1': {
                                        question:
                                            'Votre médecin est-il membre du réseau OPTAM ?',
                                        answers: [
                                            { label: 'Oui', value: true },
                                            { label: 'Non', value: false },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'gynecologue/secteur-1',
                    },
                },
            };

            const currentQuestion = currentQuestionSelector(state, props);
            expect(currentQuestion).toEqual({
                question: 'Votre médecin est-il membre du réseau OPTAM ?',
                answers: [
                    { label: 'Oui', value: true },
                    { label: 'Non', value: false },
                ],
            });
        });

        it('should return first question if no answer has been given', () => {
            const state = {
                questions: {
                    questions: {
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: null,
                    },
                },
            };

            const currentQuestion = currentQuestionSelector(state, props);
            expect(currentQuestion).toEqual({
                question: 'Quel type de praticien désirez-vous consulter ?',
                answers: [{ label: 'Gynécologue', value: 'gynecologue' }],
            });
        });
    });

    describe('isFirstQuestionSelector', () => {
        it('should return true if no answer given yet', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'type',
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                        nextQuestion: {
                            gynecologue: {
                                name: 'secteur',
                                question: 'Votre médecin est-il conventionné ?',
                                answers: [
                                    { label: 'Secteur 1', value: 'secteur-1' },
                                ],
                                nextQuestion: {
                                    'secteur-1': {},
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: '',
                    },
                },
            };

            const answers = isFirstQuestionSelector(state, props);
            expect(answers).toBe(true);
        });

        it('should return false if answer given', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'type',
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                        nextQuestion: {
                            gynecologue: {
                                name: 'secteur',
                                question: 'Votre médecin est-il conventionné ?',
                                answers: [
                                    { label: 'Secteur 1', value: 'secteur-1' },
                                ],
                                nextQuestion: {
                                    'secteur-1': {},
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'gynecologue',
                    },
                },
            };

            const answers = isFirstQuestionSelector(state, props);
            expect(answers).toBe(false);
        });
    });

    describe('getAnswerData', () => {
        it('should return answer as a literal', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'type',
                        question:
                            'Quel type de praticien désirez-vous consulter ?',
                        answers: [
                            { label: 'Gynécologue', value: 'gynecologue' },
                        ],
                        nextQuestion: {
                            gynecologue: {
                                name: 'secteur',
                                question: 'Votre médecin est-il conventionné ?',
                                answers: [
                                    { label: 'Secteur 1', value: 'secteur-1' },
                                ],
                                nextQuestion: {
                                    'secteur-1': {},
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'gynecologue/secteur-1',
                    },
                },
            };

            const answers = getAnswerData(state, props);
            expect(answers).toEqual({
                type: 'gynecologue',
                secteur: 'secteur-1',
            });
        });
    });

    describe('getHistoryAnswers', () => {
        it('should not select "care_type" question', () => {
            const state = {
                questions: {
                    questions: {
                        name: 'care_type',
                        question: 'Quel type de soin ?',
                        answers: [
                            { label: 'Consultations', value: 'consultation' },
                        ],
                        nextQuestion: {
                            consultation: {
                                name: 'type',
                                question:
                                    'Quel type de praticien désirez-vous consulter ?',
                                answers: [
                                    {
                                        label: 'Gynécologue',
                                        value: 'gynecologue',
                                    },
                                ],
                                nextQuestion: {
                                    gynecologue: {
                                        name: 'secteur',
                                        question:
                                            'Votre médecin est-il conventionné ?',
                                        answers: [
                                            {
                                                label: 'Secteur 1',
                                                value: 'secteur-1',
                                            },
                                        ],
                                        nextQuestion: {
                                            'secteur-1': {},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            };

            const props = {
                match: {
                    params: {
                        answers: 'consultation/gynecologue/secteur-1',
                    },
                },
            };

            const historyAnswers = getHistoryAnswers(state, props);
            expect(
                historyAnswers.find(a => a.answer.value === 'consultation'),
            ).toBeFalsy();
        });
    });
});
