import {combineReducers} from 'redux'

import login from '../modules/login/reducer';
import notification from '../modules/notification/reducer';
import dashboardMovie from '../modules/dashboardFilm/reducer/reducer';

const reducer = combineReducers({login, notification, dashboardMovie});

export default reducer;