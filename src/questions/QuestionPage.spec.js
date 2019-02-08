import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';

import { QuestionPage } from './QuestionPage';
import Question from './questions/Question';
import {
    TEMPLATE_BUTTON,
    TEMPLATE_GLASSES,
    TEMPLATE_HEXAGON,
} from './questions/gabarits';
import History from './history/History';
import BackButton from '../form/BackButton';
import BeneficiarySummary from './BeneficiarySummary';
import IntermediaryResult from './IntermediaryResult';
import RemainingFeesRepartitionChart from '../refunds/RemainingFeesRepartitionChart';
import ReimbursementDetailsPage from '../refunds/ReimbursementDetailsPage';

describe('<QuestionPage />', () => {
    const defaultProps = {
        classes: {
            history: 'history',
            question: 'question',
            reimbursementDetails: 'reimbursementDetails',
            noResult: 'noResult',
        },
        beneficiary: {},
        loadQuestions: () => {},
        history: {
            location: {
                pathname: '/questions',
            },
            push: () => {},
            goBack: () => {},
        },
        question: {
            question: 'Votre médecin est-il conventionné ?',
            gabarit: TEMPLATE_HEXAGON,
            answers: [
                { value: 1, label: 'Secteur 1' },
                { value: 2, label: 'Secteur 2' },
            ],
        },
        tracker: {
            track: () => {},
        },
        answeredQuestions: {},
        isFirstQuestion: false,
        answerData: {},
        resetReimbursements: () => {},
    };

    it('should load questions when mounting', () => {
        const loadQuestions = jest.fn();
        const props = {
            ...defaultProps,
            loadQuestions,
        };

        const page = shallow(<QuestionPage {...props} />);

        page.instance().componentWillMount();
        expect(loadQuestions).toHaveBeenCalled();
    });

    it('should display beneficiary data', () => {
        const props = {
            ...defaultProps,
            beneficiary: {
                age: 42,
                department: 32,
                product: 'TPSAHPA100',
            },
        };

        const wrapper = shallow(<QuestionPage {...props} />);
        const beneficiary = wrapper.find(BeneficiarySummary);
        expect(beneficiary.props()).toEqual({
            age: 42,
            department: 32,
            product: 'TPSAHPA100',
        });
    });

    it('should redirect to beneficiary form if there is no beneficiary in state', () => {
        const push = jest.fn();

        const props = {
            ...defaultProps,
            beneficiary: null,
            history: {
                ...defaultProps.history,
                push,
            },
        };

        const wrapper = shallow(<QuestionPage {...props} />);
        wrapper.instance().componentWillMount();

        expect(push).toHaveBeenCalledWith('/');
    });

    it('should redirect to URL including given answer when validating form', () => {
        const push = jest.fn();
        const props = {
            ...defaultProps,
            history: {
                ...defaultProps.history,
                location: {
                    ...defaultProps.history.location,
                    pathname: '/questions',
                },
                push,
            },
            question: {
                ...defaultProps.question,
                answers: [{ value: 'secteur-2', label: 'Secteur 2' }],
            },
        };

        const page = shallow(<QuestionPage {...props} />);

        const onQuestionValidate = page.find(Question).prop('onValidate');
        onQuestionValidate('secteur-2');

        expect(push).toHaveBeenCalledWith('/questions/secteur-2');
    });

    it('should append "oui" or "non" instead of booleans for toggle questions', () => {
        const push = jest.fn();
        const props = {
            ...defaultProps,
            question: {
                ...defaultProps.question,
                gabarit: TEMPLATE_BUTTON,
                answers: [{ value: 'oui', label: 'Oui' }],
            },
            history: {
                ...defaultProps.history,
                push,
            },
        };

        const page = shallow(<QuestionPage {...props} />);

        const onQuestionValidate = page.find(Question).prop('onValidate');
        onQuestionValidate('oui');

        expect(push).toHaveBeenCalledWith('/questions/oui');
    });

    it('should fetch reimbursement data if reimbursements are fetchable', () => {
        const getReimbursements = jest.fn();

        const test = (
            areReimbursementsFetchable,
            shouldFetchReimbursements,
        ) => {
            getReimbursements.mockReset();

            const props = {
                ...defaultProps,
                answeredQuestions: {},
                areReimbursementsFetchable,
                getReimbursements,
            };

            const page = shallow(<QuestionPage {...props} />);
            page.instance().componentDidUpdate({
                answeredQuestions: { foo: 'bar' },
            });

            expect(getReimbursements.mock.calls.length > 0).toBe(
                shouldFetchReimbursements,
            );
        };

        test(true, true);
        test(false, false);
    });

    it('should reset reimbursements data if there was an error when fetching them', () => {
        const resetReimbursements = jest.fn();
        const props = {
            ...defaultProps,
            resetReimbursements,
        };

        const page = shallow(<QuestionPage {...props} />);
        page.instance().componentDidUpdate({
            reimbursementsError: 'Previous error',
        });

        expect(resetReimbursements).toHaveBeenCalled();
    });

    it('should not fetch reimbursement data when on first questions', () => {
        const getReimbursements = jest.fn();
        const props = {
            ...defaultProps,
            beneficiary: { age: 12 },
            getReimbursements,
            isFirstQuestion: true,
        };

        const page = shallow(<QuestionPage {...props} />);

        page.instance().componentDidUpdate({
            answeredQuestions: {
                type: {
                    answer: { value: 'generaliste', label: 'Généraliste' },
                },
                referring: {
                    answer: { value: 'oui', label: 'Oui' },
                },
            },
            answerData: {
                type: 'generaliste',
                referring: 'oui',
            },
        });
        expect(getReimbursements).not.toHaveBeenCalled();
    });

    it('should display a message if no reimbursements were found', () => {
        const props = { ...defaultProps, reimbursementsError: 'Boom!' };
        const page = shallow(<QuestionPage {...props} />);

        expect(page.find('.noResult')).toHaveLength(1);
    });

    it('should display history if it has any item', () => {
        const test = (questionsHistory, shouldDisplayHistory) => {
            const props = { ...defaultProps, questionsHistory };
            const page = shallow(<QuestionPage {...props} />);

            expect(page.find(History).length > 0).toBe(shouldDisplayHistory);
        };

        test(null, false);
        test([], false);
        test([{}], true);
    });

    it('should display current question', () => {
        const props = {
            ...defaultProps,
            questionsTree: {
                question: 'Votre médecin est-il conventionné ?',
                answers: [
                    { value: 1, label: 'Secteur 1' },
                    { value: 2, label: 'Secteur 2' },
                ],
            },
        };

        const page = shallow(<QuestionPage {...props} />);
        expect(page.find(Question).prop('question')).toBe(
            'Votre médecin est-il conventionné ?',
        );

        expect(page.find(Question).prop('answers')).toEqual([
            { value: 1, label: 'Secteur 1' },
            { value: 2, label: 'Secteur 2' },
        ]);
    });

    it('should display a loader if reimbursements are currently retrieved', () => {
        const test = (reimbursementsLoading, shouldDisplayLoader) => {
            const props = {
                ...defaultProps,
                areReimbursementsFetchable: true,
                reimbursementsLoading,
            };
            const page = shallow(<QuestionPage {...props} />);

            expect(page.find(CircularProgress).length > 0).toBe(
                shouldDisplayLoader,
            );
        };

        test(true, true);
        test(false, false);
    });

    it('should render BackButton', () => {
        const page = shallow(<QuestionPage {...defaultProps} />);
        expect(page.find(BackButton)).toHaveLength(1);
    });

    it('should display backButton on all but first question', () => {
        const props = {
            ...defaultProps,
            isFirstQuestion: true,
        };
        const page = shallow(<QuestionPage {...props} />);
        expect(page.find(BackButton)).toHaveLength(0);
    });

    describe('Intermediary result', () => {
        it('should not display Intermediary result on first question', () => {
            const props = {
                ...defaultProps,
                isFirstQuestion: true,
                reimbursements: [],
            };

            const wrapper = shallow(<QuestionPage {...props} />);
            expect(wrapper.find(CircularProgress)).toHaveLength(0);
            expect(wrapper.find(IntermediaryResult)).toHaveLength(0);
        });

        it('should not display Intermediary result if no reimbursement is available', () => {
            const props = { ...defaultProps, reimbursements: null };
            const wrapper = shallow(<QuestionPage {...props} />);

            expect(wrapper.find(CircularProgress)).toHaveLength(0);
            expect(wrapper.find(IntermediaryResult)).toHaveLength(0);
        });

        it('should not display Intermediary result if no question', () => {
            const props = {
                ...defaultProps,
                question: null,
                reimbursements: [
                    {
                        pourcentage_reste_a_charge_par_quartile: {},
                    },
                ],
            };
            const wrapper = shallow(<QuestionPage {...props} />);

            expect(wrapper.find(CircularProgress)).toHaveLength(0);
            expect(wrapper.find(IntermediaryResult)).toHaveLength(0);
        });

        it('should display a loader while reimbursement are loading', () => {
            const props = {
                ...defaultProps,
                areReimbursementsFetchable: true,
                reimbursementsLoading: true,
            };
            const wrapper = shallow(<QuestionPage {...props} />);

            expect(wrapper.find(CircularProgress)).toHaveLength(1);
            expect(wrapper.find(IntermediaryResult)).toHaveLength(0);
        });

        it('should display IntermediaryResult once reimbursements are retrieved', () => {
            const props = {
                ...defaultProps,
                areReimbursementsFetchable: true,
                reimbursementsLoading: false,
                reimbursements: [
                    {
                        pourcentage_reste_a_charge_par_quartile: {
                            zero: 47,
                        },
                        reste_a_charge_maximum: 40,
                    },
                ],
            };
            const wrapper = shallow(<QuestionPage {...props} />);

            const intermediaryResult = wrapper.find(IntermediaryResult);
            expect(intermediaryResult.prop('reimbursements')).toEqual({
                pourcentage_reste_a_charge_par_quartile: {
                    zero: 47,
                },
                reste_a_charge_maximum: 40,
            });
        });

        it('should not display RemainingFeesRepartitionChart if question', () => {
            const props = {
                ...defaultProps,
                reimbursements: [
                    {
                        pourcentage_reste_a_charge_par_quartile: {
                            zero: 60,
                            petit: 35,
                            grand: 5,
                        },
                        other: 'do not care',
                    },
                ],
            };
            const wrapper = shallow(<QuestionPage {...props} />);

            expect(wrapper.find(CircularProgress)).toHaveLength(0);
            expect(wrapper.find(RemainingFeesRepartitionChart)).toHaveLength(0);
        });
    });

    it('should display reimbursements details if there is no more questions', () => {
        const props = {
            ...defaultProps,
            question: null,
            reimbursements: [
                {
                    pourcentage_reste_a_charge_par_quartile: {
                        zero: 60,
                        petit: 35,
                        grand: 5,
                    },
                    other: 'do not care',
                },
            ],
        };
        const wrapper = shallow(<QuestionPage {...props} />);
        expect(wrapper.find(ReimbursementDetailsPage)).toHaveLength(1);
    });

    it('should track submitted response when validating choice (consultations)', () => {
        const tracker = {
            track: jest.fn(),
        };

        const props = {
            ...defaultProps,
            tracker,
            question: {
                ...defaultProps.question,
                question: 'Quel secteur ?',
                answers: [{ value: 'secteur-2', label: 'Secteur 2' }],
            },
        };

        const page = shallow(<QuestionPage {...props} />);

        const onQuestionValidate = page.find(Question).prop('onValidate');
        onQuestionValidate('secteur-2');

        expect(tracker.track).toHaveBeenCalledWith('reponse', {
            question: 'Quel secteur ?',
            reponse: 'Secteur 2',
        });
    });

    it('should track submitted response when validating choice (optic)', () => {
        const tracker = {
            track: jest.fn(),
        };

        const props = {
            ...defaultProps,
            tracker,
            question: {
                ...defaultProps.question,
                question: 'Quels verres ?',
                gabarit: TEMPLATE_GLASSES,
            },
        };

        const page = shallow(<QuestionPage {...props} />);

        const onQuestionValidate = page.find(Question).prop('onValidate');
        onQuestionValidate('simple-3_progressif+2');

        expect(tracker.track).toHaveBeenCalledWith('reponse', {
            question: 'Quels verres ?',
            reponse: 'verre simple -3 et verre progressif +2',
        });
    });
});
