
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import {POST} from '../../common/utils';

const parseJWT = jwt => {
    var base64Url = jwt.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  };

export const login = (nameUser, passwordUser) => {
    return dispatch => {
        return axios
        .post(`http://localhost:8091/api/login`, {username:nameUser,password:passwordUser})
        .then(response => {
          console.log(response.headers.Authorization)
            let parsedJson = JSON.parse(
              parseJWT(response.headers.authorization.slice(7)).sub
            );
    
            let data = {
              jwt: response.headers.authorization,
              role: parsedJson.role,
              id: parsedJson.id
            };
    
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("role", data.role);
            localStorage.setItem("loggedUserId", data.id);
    
            dispatch({
              type: "LOGIN",
              payload: {
                isLogged: true,
                role: data.role
              }
            });
          })
            .catch(err => {
                console.log(err);

            });
    };
}
