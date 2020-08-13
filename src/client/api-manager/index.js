import Ajax from "./ajax";
// import { getToken } from "client/others/token";

class ResourceService extends Ajax {
    constructor(host) {
        super({
            headerAuthorization: () => {
                // if (getToken()) {
                //   return `Bearer ${getToken()}`;
                // }
                return "";
            },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache:",
                Pragma: "no-cache"
            },
            baseURL: host
        });
    }
}

const link = "http://127.0.0.1:3000/";
const host = `${link}api/v1`;

const api_manager = new ResourceService(host);

export default api_manager;
