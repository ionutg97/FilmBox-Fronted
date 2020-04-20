import { combineReducers } from "redux";


const initialEntitiesState = {
    type:"",
    isAdmin:true,
    isLoged: true
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