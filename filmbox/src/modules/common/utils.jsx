export const isLoggedin = () => {
    return (localStorage.getItem("jwt") != null && localStorage.getItem("jwt") !== "")
}
