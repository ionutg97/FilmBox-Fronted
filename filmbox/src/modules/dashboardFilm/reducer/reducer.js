import { combineReducers } from "redux";

const initialEntitiesState = {
   error:""
};

const dashboardMovieReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
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

const dashbordMovie = combineReducers({
    dashboardMovie: dashboardMovieReducer
});

export default dashbordMovie;
