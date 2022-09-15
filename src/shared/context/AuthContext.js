import {createContext} from "react";
import Storage from "../Storage"
import useDependency from "../hook/UseDependency";
import {KEY} from "../constants"

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {loginService} = useDependency();
    const storage = Storage();

    const onLogin = async (userCred = {}) => {
        try {
            const response = await loginService.authenticate(userCred);
            if (response) {
                await storage.storeData(KEY.TOKEN, response.token);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };

    const isTokenExist = async () => {
        try {
            const token = await storage.getData(KEY.TOKEN)
            if (token) {
                console.log('token => ', token);
                return true
            } else {
                return false
            }
        } catch (e) {
            return false;
        }
    }

    const onLogout = async () => {
        try {
            await storage.deleteData(KEY.TOKEN);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    return <AuthContext.Provider value={{onLogin, onLogout, isTokenExist}}>{children}</AuthContext.Provider>;
};