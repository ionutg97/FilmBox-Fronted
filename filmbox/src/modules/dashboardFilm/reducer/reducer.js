import { combineReducers } from "redux";

const initialEntitiesState = {
   error:"",
   numberComm:null,
   comments:[],
   upload:false
};

const dashboardMovieReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
        case "ERROR":{
            return {
                ...state,
                error: action.payload.error
            }
        }
        case "COMM_NUMBER":{
            return {
                ...state,
                numberComm: action.payload.numberComm
            }
        }
        case "COMMENTS":{
            return {
                ...state,
                comments: action.payload.comments
            }
        }
        case "UPLOAD SUCCES":{
            return {
                ...state,
                uploadVideo: action.payload.uploadVideo
            }
        }
        default: {
            return state;
        }
    }
}

const dashboardMovie = combineReducers({
    dashboardMovie: dashboardMovieReducer
});

export default dashboardMovie;
