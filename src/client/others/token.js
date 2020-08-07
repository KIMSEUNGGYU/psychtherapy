export const getToken = () => {
    return sessionStorage.getItem("redux")
        // && JSON.parse(sessionStorage.getItem("redux")).storage.token
        // ? JSON.parse(sessionStorage.getItem("redux")).storage.token
        // : false;
};
