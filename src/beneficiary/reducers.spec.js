import { handleSetBeneficiary } from './reducers';

describe('Beneficiary Reducers', () => {
    describe('handleSetBeneficiary', () => {
        it('should set payload as beneficiary state', () => {
            const initialState = null;
            const beneficiary = { age: 12 };
            const updatedState = handleSetBeneficiary(initialState, {
                payload: beneficiary,
            });

            expect(updatedState).toEqual({ age: 12 });
        });

        it('should cast age from string to number', () => {
            const initialState = null;
            const beneficiary = { age: '12' };
            const updatedState = handleSetBeneficiary(initialState, {
                payload: beneficiary,
            });

            expect(updatedState).toEqual({ age: 12 });
        });
    });
});
