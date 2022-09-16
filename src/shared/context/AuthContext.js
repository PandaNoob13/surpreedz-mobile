import {createContext, useState} from "react";
import Storage from "../Storage"
import useDependency from "../hook/UseDependency";
import {KEY} from "../constants"

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {signInService} = useDependency();
    const storage = Storage();
    const [token, setToken] = useState()

    const onLogin = async (userCred = {}) => {
        try {
            const response = await signInService.postLogin(userCred);
            if (response) {
                console.log('response AuthContext', response);
                console.log('response AuthContext', response.token.AccessToken);
                await storage.setData(KEY.TOKEN, response.token.AccessToken);
                return true;
            } else {
                console.log('response authcontext false');
                return false;
            }
        } catch (e) {
            console.log('e authcontext', e);
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