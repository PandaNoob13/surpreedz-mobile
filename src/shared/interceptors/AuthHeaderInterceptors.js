import { KEY, SERVICE } from "../constants";
import Storage from "../Storage";

const authHeaderInterceptor = async (config) => {
    const storage = Storage();
    if (config.url !== SERVICE.SIGNIN) {
        const token = await storage.getData(KEY.TOKEN)
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

export default authHeaderInterceptor