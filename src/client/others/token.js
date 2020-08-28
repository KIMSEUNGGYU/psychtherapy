export const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : false;
};

export const getRefreshToken = () => {
    const token = localStorage.getItem("refreshToken");
    return token ? token : false;
};

export const parsingToken = (token) => {
    if (!token) {
        return false;
    }
    const tokenSplit = token.split(".")[1];
    const tokenDecode = decodeURIComponent(
        atob(tokenSplit)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(tokenDecode);
};

export const getUserType = () => {
    const token = getToken();
    const type = parsingToken(token).type;
    return type ? type : false;
};
