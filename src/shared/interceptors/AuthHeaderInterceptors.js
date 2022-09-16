import { KEY, SERVICE } from "../constants";
import Storage from "../Storage";

const authHeaderInterceptor = async (config) => {
    const storage = Storage();
    const token = await storage.getData(KEY.TOKEN)
    if (config.url !== '/api/auth/login') {
        config.headers.Authorization = token;
    }
    // else if (token === ''){
    //     await storage.clearStorage();
    // }
    return config;
}

export default authHeaderInterceptor