
//import sha256 from 'crypto-js/sha256';

export const login = (name, password) => {
    let isAdmin=false;
    return dispatch => {
        fetch(`http://localhost:8090/students/login?username=${name}&password=${password}`, {
            method: 'get'
        }).then(response => {
            return response.json();

        }).then (data => {
            console.log(data.status)
            if(data.status==="admin")
                isAdmin=true;
            dispatch({
                type: "LOGIN",
                payload: {  
                  type: data,
                  isAdmin:isAdmin
                }
              });
        
        })
            .catch(err => {
                console.log(err);

            });
    };
}
