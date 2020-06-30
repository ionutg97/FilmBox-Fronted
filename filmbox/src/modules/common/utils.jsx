import axios from "axios";


export const isLoggedin = () => {
    return (localStorage.getItem("jwt") != null && localStorage.getItem("jwt") !== "")
}

export const isAdmin = () => {
    return (localStorage.getItem("role").toLowerCase() === "admin");
}

export const POST = (url, data, crossDomain = true) => {

    return axios
        .post(url, data, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
            crossDomain
        });
};

export const GET = (url, crossDomain = true) => {
    return axios
        .get(url, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
            crossDomain
        })

};

//export const DELETE = (url,)