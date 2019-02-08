import { getAnswerData } from '../questions/selectors';

export const selectReimbursements = state =>
    state.reimbursements.reimbursements;

export const reimbursementsLoadingSelector = state =>
    state.reimbursements.loading;

export const reimbursementsErrorSelector = state => state.reimbursements.error;

export const selectSelectedRemainingFeesRange = state =>
    state.reimbursements.selectedRemainingFeesRange;

export const selectReimbursementDistributions = state => {
    const { expense } = state.reimbursements;

    return state.reimbursements.reimbursements.map(reimbursement => {
        const {
            remboursement_securite_sociale: socialSecurityReimbursement,
            remboursement_mutuelle: mutualReimbursement,
        } = reimbursement;

        const socialSecurity = Math.min(
            socialSecurityReimbursement,
            Math.abs(expense),
        );

        const mutual = Math.min(
            mutualReimbursement,
            Math.abs(expense - socialSecurity),
        );

        const remainingFees = Math.max(0, expense - socialSecurity - mutual);

        return {
            socialSecurity,
            maximumMutual: mutualReimbursement,
            mutual,
            remainingFees,
        };
    });
};

export const selectAreReimbursementsFetchable = (state, props) => {
    const answers = getAnswerData(state, props);
    if (!answers) {
        return false;
    }

    const keys = Object.keys(answers);

    if (!keys.length || !answers.care_type) {
        return false;
    }

    const careType = answers.care_type;
    if (careType === 'optique') {
        if (answers.equipment !== 'monture') {
            return !!answers.glasses;
        }
    }

    if (careType === 'consultation') {
        return keys.length > 1;
    }

    return true;
};

export const selectExpense = state => state.reimbursements.expense;
