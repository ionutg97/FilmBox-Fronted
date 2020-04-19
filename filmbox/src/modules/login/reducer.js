import { combineReducers } from "redux";


const initialEntitiesState = {
    type:"",
    isAdmin:false
};

const loginReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isAdmin: action.payload.isAdmin
            }
        }
        default: {
            return state;

        }
    }
}


const login = combineReducers({
    login: loginReducer
});

export default login;