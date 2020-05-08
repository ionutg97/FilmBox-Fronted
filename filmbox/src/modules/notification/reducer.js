import { combineReducers } from "redux";

const initialEntitiesState = {
   movies:[]
};

const notificationReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
        case "GET_MOVIES": {
            return {
                ...state,
                movies: action.payload.movies
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
