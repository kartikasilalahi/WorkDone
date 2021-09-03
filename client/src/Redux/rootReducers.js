import { combineReducers } from 'redux';
import authReducer from './Auth/reducer';

const rootReducers = combineReducers({
    auth: authReducer
});

export default rootReducers;