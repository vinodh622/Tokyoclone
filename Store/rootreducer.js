import {combineReducers} from 'redux';
import {loginReducer} from '../Reducers/loginReducer';

const reducer = combineReducers({
  loginDetails: loginReducer,
});

export default reducer;