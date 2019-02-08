import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import isEqual from 'lodash.isequal';
import { getFormValues, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { loadQuestions } from './reducers';
import { getReimbursements, resetReimbursements } from '../refunds/reducers';
import Question from './questions/Question';
import {
    answeredQuestionsSelector,
    currentQuestionSelector,
    isFirstQuestionSelector,
    getAnswerData,
    getHistoryAnswers,
} from './selectors';
import {
    selectReimbursements,
    reimbursementsLoadingSelector,
    selectAreReimbursementsFetchable,
    reimbursementsErrorSelector,
} from '../refunds/selectors';
import { beneficiarySelector } from '../beneficiary/selectors';
import History from './history/History';
import BackButton from '../form/BackButton';
import Header from '../layout/Header';
import BeneficiarySummary from './BeneficiarySummary';
import IntermediaryResult from './IntermediaryResult';

import ReimbursementDetailsPage from '../refunds/ReimbursementDetailsPage';
import { blueLighter, blueLight } from '../theme';
import withWoopra from '../tracking/withWoopra';
import { TEMPLATE_GLASSES } from './questions/gabarits';
import { labelizeGlassesAnswer } from './questions/GlassesAnswers';
import { questionPropType } from '../propTypes';

const FORM_NAME = 'question';

const styles = {
    root: {
        margin: 'auto',
        display: 'flex',
    },
    history: {
        display: 'flex',
        flex: '0 0 224px',
        flexDirection: 'column',
        marginTop: 10,
        padding: '0 27px 10px 27px',
        borderRight: '2px solid #ccc',
    },
    question: {
        display: 'flex',
    },
    noResult: {
        backgroundColor: blueLighter,
        border: `1px solid ${blueLight}`,
        fontFamily: 'bree',
        fontSize: '1rem',
        padding: '24px 53px',
    },
    reimbursements: {
        marginTop: 10,
    },
    loaderWrapper: {
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Myriad Pro',
        fontWeight: 600,
        letterSpacing: '0.05rem',
        textTransform: 'uppercase',
        fontSize: 24,
        lineHeight: '29px',
        marginBottom: '0.5rem',
    },
    beneficiaryData: {
        marginTop: 0,
        lineHeight: '1rem',
    },
    backArrow: {
        flex: '0 0 44px',
        paddingTop: 7,
        marginRight: '20px',
    },
    mainContent: {
        marginLeft: 20,
        flex: '1',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
    },
};

export class QuestionPage extends Component {
    componentWillMount() {
        if (!this.props.beneficiary) {
            this.props.history.push('/');
            return;
        }

        this.props.loadQuestions();
    }

    getAnswers = () => {
        const { answeredQuestions } = this.props;
        if (!answeredQuestions) {
            return [];
        }

        return Object.values(answeredQuestions).map(
            q => q.answer && q.answer.value,
        );
    };

    onValidate = answerValue => {
        const {
            history: {
                location: { pathname },
                push,
            },
            question,
        } = this.props;

        let answerLabel = null;
        switch (question.gabarit) {
            case TEMPLATE_GLASSES:
                answerLabel = labelizeGlassesAnswer(answerValue);
                break;

            default: {
                const matchingAnswer = question.answers.find(
                    a => a.value === answerValue,
                );

                if (matchingAnswer) {
                    answerLabel = matchingAnswer.label;
                }
            }
        }

        if (answerLabel) {
            this.props.tracker.track('reponse', {
                question: this.props.question.question,
                reponse: answerLabel,
            });
        } else {
            console.warn(
                `No answer found for value "${answerValue}". Skipping tracking.`,
            );
        }

        const nextPageUrl = `${pathname}/${answerValue}`;
        push(nextPageUrl);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.reimbursementsError) {
            this.props.resetReimbursements();
        }

        if (
            this.props.areReimbursementsFetchable &&
            !isEqual(prevProps.answeredQuestions, this.props.answeredQuestions)
        ) {
            this.props.getReimbursements({
                ...this.props.beneficiary,
                ...this.props.answerData,
            });
        }
    }

    getAnswersLabels = () =>
        Object.values(this.props.answeredQuestions).map(q => q.answer.label);

    goToPreviousQuestion = () => {
        this.props.history.goBack();
    };

    render() {
        const {
            areReimbursementsFetchable,
            beneficiary,
            questionsHistory,
            isFirstQuestion,
            question,
            classes,
            reimbursements,
            reimbursementsError,
            reimbursementsLoading,
            values,
        } = this.props;

        return (
            <Fragment>
                <Header smallLogo={true}>
                    <h1 className={classes.title}>
                        Simulation de remboursement
                    </h1>
                    <h2 className={classes.beneficiaryData}>
                        {beneficiary && <BeneficiarySummary {...beneficiary} />}
                    </h2>
                </Header>
                <div className={classes.root}>
                    {questionsHistory &&
                        questionsHistory.length > 0 && (
                            <div className={classes.history}>
                                <History steps={questionsHistory} />
                            </div>
                        )}
                    <div className={classes.mainContent}>
                        {reimbursementsError ? (
                            <div className={classes.noResult}>
                                <p>
                                    Les informations fournies ne permettent pas
                                    de donner une réponse pertinente.
                                </p>
                                <p>
                                    Pour aller plus loin, vous pouvez réaliser
                                    une{' '}
                                    <Link to="/questions">
                                        nouvelle simulation
                                    </Link>{' '}
                                    en modifiant les paramètres ou contacter un
                                    conseiller Harmonie Mutuelle.
                                </p>
                            </div>
                        ) : (
                            <Fragment>
                                {areReimbursementsFetchable &&
                                    question &&
                                    (reimbursements ||
                                        reimbursementsLoading) && (
                                        <div className={classes.reimbursements}>
                                            {reimbursementsLoading ? (
                                                <div
                                                    className={
                                                        classes.loaderWrapper
                                                    }
                                                >
                                                    <CircularProgress
                                                        className={
                                                            classes.loader
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <IntermediaryResult
                                                    reimbursements={
                                                        reimbursements[0]
                                                    }
                                                />
                                            )}
                                        </div>
                                    )}
                                <div className={classes.question}>
                                    {!isFirstQuestion && (
                                        <div className={classes.backArrow}>
                                            <BackButton
                                                onClick={
                                                    this.goToPreviousQuestion
                                                }
                                            />
                                        </div>
                                    )}
                                    {question && (
                                        <Question
                                            {...question}
                                            onValidate={this.onValidate}
                                            value={
                                                values && values[question.name]
                                            }
                                        />
                                    )}
                                    {!question &&
                                        (!reimbursements ||
                                        reimbursementsLoading ? (
                                            <div
                                                className={
                                                    classes.loaderWrapper
                                                }
                                            >
                                                <CircularProgress
                                                    className={classes.loader}
                                                />
                                            </div>
                                        ) : (
                                            reimbursements && (
                                                <ReimbursementDetailsPage />
                                            )
                                        ))}
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

QuestionPage.propTypes = {
    answeredQuestions: PropTypes.object,
    beneficiary: PropTypes.object,
    classes: PropTypes.object,
    loadQuestions: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
        push: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    }),
    reimbursements: PropTypes.arrayOf(PropTypes.object),
    question: questionPropType,
    getReimbursements: PropTypes.func,
    reimbursementsLoading: PropTypes.bool,
    values: PropTypes.object,
    isFirstQuestion: PropTypes.bool.isRequired,
    areReimbursementsFetchable: PropTypes.bool.isRequired,
    answerData: PropTypes.object.isRequired,
    questionsHistory: PropTypes.arrayOf(PropTypes.object),
    reimbursementsError: PropTypes.string,
    resetReimbursements: PropTypes.func.isRequired,
    tracker: PropTypes.object,
};

QuestionPage.defaultProps = {
    areReimbursementsFetchable: false,
};

export default compose(
    withStyles(styles),
    withRouter,
    reduxForm({
        form: FORM_NAME,
    }),
    withWoopra,
    connect(
        (state, ownProps) => ({
            beneficiary: beneficiarySelector(state),
            question: currentQuestionSelector(state, ownProps),
            answeredQuestions: answeredQuestionsSelector(state, ownProps),
            reimbursements: selectReimbursements(state),
            reimbursementsLoading: reimbursementsLoadingSelector(state),
            reimbursementsError: reimbursementsErrorSelector(state),
            values: getFormValues(FORM_NAME)(state),
            areReimbursementsFetchable: selectAreReimbursementsFetchable(
                state,
                ownProps,
            ),
            isFirstQuestion: isFirstQuestionSelector(state, ownProps),
            answerData: getAnswerData(state, ownProps),
            questionsHistory: getHistoryAnswers(state, ownProps),
        }),
        { resetReimbursements, getReimbursements, loadQuestions },
    ),
)(QuestionPage);
