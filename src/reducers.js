import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { beneficiaryReducer } from './beneficiary/reducers';
import { questionReducer } from './questions/reducers';
import { layoutReducer } from './layout/reducers';
import { reimbursementsReducer } from './refunds/reducers';
import { productsReducer } from './products/reducers';

export default combineReducers({
    layout: layoutReducer,
    beneficiary: beneficiaryReducer,
    questions: questionReducer,
    reimbursements: reimbursementsReducer,
    products: productsReducer,
    form: formReducer,
});
