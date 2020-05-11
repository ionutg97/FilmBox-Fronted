import { combineReducers } from "redux";

const initialEntitiesState = {
   movies:[],
   allIdChunck:[],
   error:""
};

const notificationReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
        case "GET_MOVIES": {
            return {
                ...state,
                movies: action.payload.movies
            }
        }
        case "GET_ALL_ID_CHUNCKS": {
            return {
                ...state,
                allIdChunck: action.payload.allIdChunck
            }
        }
        case "ERROR":{
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: {
            return state;
        }
    }
}

const notification = combineReducers({
    notification: notificationReducer
});

export default notification;
