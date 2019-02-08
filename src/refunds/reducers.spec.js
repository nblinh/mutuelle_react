import {
    handleSelectRemainingFeesRange,
    handleSaveRetrievedReimbursements,
    getSelectedRemainingFeesRangeFromRemainsFee,
    handleSetExpense,
} from './reducers';

describe('Reimbursements Reducers', () => {
    describe('handleSaveRetrievedReimbursements', () => {
        it('should set currently selected range as the first range with non null probability', () => {
            const test = (
                percentagePerQuantile,
                expectedSelectedRemainingFeesRange,
            ) => {
                const action = {
                    payload: [
                        {
                            pourcentage_reste_a_charge_par_quartile: percentagePerQuantile,
                            depense_plus_frequente: {},
                        },
                    ],
                };

                const updatedState = handleSaveRetrievedReimbursements(
                    {},
                    action,
                );
                expect(updatedState.selectedRemainingFeesRange).toBe(
                    expectedSelectedRemainingFeesRange,
                );
            };

            test([0, 25, 75], 1);

            test([10, 30, 60], 0);

            test([0, 0, 100], 2);
        });

        it('should set expense as the most frequent expense of first non null probability range', () => {
            const test = (
                percentagePerQuantile,
                mostFrequentExpense,
                expectedExpense,
            ) => {
                const action = {
                    payload: [
                        {
                            pourcentage_reste_a_charge_par_quartile: percentagePerQuantile,
                            depense_plus_frequente: mostFrequentExpense,
                        },
                    ],
                };

                const updatedState = handleSaveRetrievedReimbursements(
                    {},
                    action,
                );
                expect(updatedState.expense).toBe(expectedExpense);
            };

            test([0, 25, 75], [12, 35, 100], 35);

            test([10, 30, 60], [12, 35, 100], 12);

            test([0, 0, 100], [12, 35, 100], 100);
        });
    });

    describe('handleSelectRemainingFeesRange', () => {
        it('should update selected remaining fees range with selected quartile name', () => {
            const initialState = {
                reimbursements: [
                    {
                        depense_plus_frequente: {},
                    },
                ],
            };

            const smallUpdatedState = handleSelectRemainingFeesRange(
                initialState,
                {
                    payload: 'petit',
                },
            );
            expect(smallUpdatedState.selectedRemainingFeesRange).toBe('petit');

            const bigUpdatedState = handleSelectRemainingFeesRange(
                initialState,
                {
                    payload: 'grand',
                },
            );
            expect(bigUpdatedState.selectedRemainingFeesRange).toBe('grand');
        });

        it('should update current expense with most frequent expense of selected quartile', () => {
            const initialState = {
                reimbursements: [
                    {
                        depense_plus_frequente: [23, 25, 50],
                    },
                ],
            };

            const smallUpdatedState = handleSelectRemainingFeesRange(
                initialState,
                {
                    payload: 1,
                },
            );
            expect(smallUpdatedState.expense).toBe(25);

            const bigUpdatedState = handleSelectRemainingFeesRange(
                initialState,
                {
                    payload: 2,
                },
            );
            expect(bigUpdatedState.expense).toBe(50);
        });

        describe('getSelectedRemainingFeesRangeFromRemainsFee', () => {
            it('should return quartile index based on remains', () => {
                const quartiles = [
                    { min: null, max: 0 },
                    { min: 0, max: 25 },
                    { min: 25, max: null },
                ];
                expect(
                    getSelectedRemainingFeesRangeFromRemainsFee(0, quartiles),
                ).toBe(0);
                expect(
                    getSelectedRemainingFeesRangeFromRemainsFee(12, quartiles),
                ).toBe(1);
                expect(
                    getSelectedRemainingFeesRangeFromRemainsFee(50, quartiles),
                ).toBe(2);
            });
        });

        describe('handleSetExpense', () => {
            it('should set expense and selectedRemainingFeesRange based on received payload', () => {
                const state = {
                    reimbursements: [
                        {
                            quartiles: [
                                { min: null, max: 0 },
                                { min: 0, max: 25 },
                                { min: 25, max: null },
                            ],
                            remboursement_securite_sociale: 5,
                            remboursement_mutuelle: 10,
                        },
                    ],
                };

                let nextState = handleSetExpense(state, {
                    payload: 15,
                });

                expect(nextState.expense).toBe(15);
                expect(nextState.selectedRemainingFeesRange).toBe(0);

                nextState = handleSetExpense(state, { payload: 35 });
                expect(nextState.expense).toBe(35);
                expect(nextState.selectedRemainingFeesRange).toBe(1);

                nextState = handleSetExpense(state, { payload: 45 });
                expect(nextState.expense).toBe(45);
                expect(nextState.selectedRemainingFeesRange).toBe(2);
            });
        });
    });
});
