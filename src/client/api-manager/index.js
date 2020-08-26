import Ajax from "./ajax";
import { getToken } from "client/others/token";

class ResourceService extends Ajax {
    constructor(host) {
        super({
            headerAuthorization: () => {
                if (getToken()) {
                    return getToken();
                }
                return "";
            },
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache:",
                Pragma: "no-cache",
                "Access-Control-Allow-Origin": "*",
                "x-api-key":
                    "dd29771d9da1133deb625006590bd83373df0355fb4f791bdebbe9f93537f78f"
            },
            baseURL: host
        });
    }
}

const link = "http://localhost:3000/";
const host = `${link}api/v1`;

const api_manager = new ResourceService(host);

export default api_manager;
