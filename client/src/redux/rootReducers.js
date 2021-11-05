import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import taskReducer from './task/reducer'

const rootReducers = combineReducers({
    auth: authReducer,
    task: taskReducer
});

export default rootReducers;