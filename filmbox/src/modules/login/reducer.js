import { combineReducers } from "redux";


const initialEntitiesState = {
    type:"",
    role:null,
    name:null,
    isLogged: false
};

const loginReducer = (state = initialEntitiesState, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                isLogged: action.payload.isLogged,
                role: action.payload.role
            }
        }
        case "PROFILE": {
            return {
                ...state,
                name: action.payload.name
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