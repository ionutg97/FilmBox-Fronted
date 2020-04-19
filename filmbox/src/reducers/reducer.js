import {combineReducers} from 'redux'

import login from '../modules/login/reducer';

const reducer = combineReducers({login});

export default reducer;