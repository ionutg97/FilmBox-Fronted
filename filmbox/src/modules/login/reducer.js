import { combineReducers } from "redux";


const initialEntitiesState = {
    type:"",
    role:null,
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
        default: {
            return state;
        }
    }
}


const login = combineReducers({
    login: loginReducer
});

export default login;