import {combineReducers} from 'redux'

import login from '../modules/login/reducer';
import notification from '../modules/notification/reducer';

const reducer = combineReducers({login,notification});

export default reducer;