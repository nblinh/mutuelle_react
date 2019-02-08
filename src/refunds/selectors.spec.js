import {
    selectReimbursementDistributions,
    selectAreReimbursementsFetchable,
} from './selectors';
import { getAnswerData } from '../questions/selectors';

jest.mock('../questions/selectors');

describe('Reimbursements Selectors', () => {
    describe('selectReimbursementDistributions', () => {
        it('should compute distributions for all given reimbursements', () => {
            const state = {
                reimbursements: {
                    reimbursements: [{}, {}],
                },
            };

            const distributions = selectReimbursementDistributions(state);
            expect(distributions).toHaveLength(2);
        });

        it('social security reimbursement should never overstep total expense', () => {
            const test = (
                socialSecurity,
                expense,
                expectedSocialSecurityReimbursement,
            ) => {
                const state = {
                    reimbursements: {
                        reimbursements: [
                            {
                                remboursement_securite_sociale: socialSecurity,
                            },
                        ],
                        expense,
                    },
                };

                const distributions = selectReimbursementDistributions(state);
                expect(distributions[0].socialSecurity).toBe(
                    expectedSocialSecurityReimbursement,
                );
            };

            test(12, 25, 12);
            test(25, 12, 12);
        });

        it('mutual reimbursement and social security should never overstep total expense', () => {
            const test = (
                socialSecurity,
                mutualReimbursement,
                expense,
                expectedMutualReimbursement,
            ) => {
                const state = {
                    reimbursements: {
                        reimbursements: [
                            {
                                remboursement_securite_sociale: socialSecurity,
                                remboursement_mutuelle: mutualReimbursement,
                            },
                        ],
                        expense,
                    },
                };

                const distributions = selectReimbursementDistributions(state);
                expect(distributions[0].mutual).toBe(
                    expectedMutualReimbursement,
                );
            };

            test(12, 13, 25, 13);
            test(10, 5, 11, 1);
            test(10, 10, 50, 10);
        });

        it('remaining fees should be the expense minus total social security and mutual reimbursements', () => {
            const state = {
                reimbursements: {
                    reimbursements: [
                        {
                            remboursement_securite_sociale: 50,
                            remboursement_mutuelle: 20,
                        },
                    ],
                    expense: 90,
                },
            };

            const distribution = selectReimbursementDistributions(state);
            expect(distribution[0].remainingFees).toBe(20);
        });
    });

    describe('selectAreReimbursementsFetchable', () => {
        it('should return false if no care type is given', () => {
            getAnswerData.mockImplementation(() => ({
                foo: 'bar',
            }));

            expect(selectAreReimbursementsFetchable()).toBe(false);
        });

        it('should return false if there is less than one answer given', () => {
            getAnswerData.mockImplementation(() => ({
                care_type: 'consultation',
            }));

            expect(selectAreReimbursementsFetchable()).toBe(false);
        });

        it('should return false for optic if equipment has some non specified glasses', () => {
            expect(selectAreReimbursementsFetchable()).toBe(false);

            getAnswerData.mockImplementation(() => ({ care_type: 'optique' }));
            expect(selectAreReimbursementsFetchable()).toBe(false);

            getAnswerData.mockImplementation(() => ({
                care_type: 'optique',
                equipment: 'monture',
            }));
            expect(selectAreReimbursementsFetchable()).toBe(true);

            getAnswerData.mockImplementation(() => ({
                care_type: 'optique',
                equipment: 'monture-verres',
            }));
            expect(selectAreReimbursementsFetchable()).toBe(false);

            getAnswerData.mockImplementation(() => ({
                care_type: 'optique',
                equipment: 'verres',
            }));
            expect(selectAreReimbursementsFetchable()).toBe(false);

            getAnswerData.mockImplementation(() => ({
                care_type: 'optique',
                equipment: 'monture-verres',
                glasses: 'simple-3-progressif+9',
            }));
            expect(selectAreReimbursementsFetchable()).toBe(true);
        });

        it('should return true otherwise', () => {
            getAnswerData.mockImplementation(() => ({
                care_type: 'consultation',
                foo: 'bar',
            }));

            expect(selectAreReimbursementsFetchable()).toBe(true);
        });
    });
});
