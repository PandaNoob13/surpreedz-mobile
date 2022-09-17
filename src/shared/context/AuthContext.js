import {createContext, useState} from "react";
import Storage from "../Storage"
import useDependency from "../hook/UseDependency";
import {KEY} from "../constants"

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {signInService} = useDependency();
    const storage = Storage();

    const onLogin = async (userCred = {}) => {
        try {
            const response = await signInService.postLogin(userCred);
            if (response) {
                // console.log('response AuthContext', response);
                // console.log('response AuthContext', response.token.AccessToken);
                await storage.setData(KEY.TOKEN, response.token.AccessToken);
                const data = response.account;
                const account = data.account
                // console.log('response account =>', account);
                // console.log('response account =>', account.email);
                // console.log('response account =>', account.AccountDetail.name);
                // const userInfo ={
                //     id:account.id,
                //     email:account.email,
                //     name: account.AccountDetail.name,
                //     location: account.AccountDetail.location,
                //     joinDate : data.string_join_date,
                //     serviceId : account.ServiceDetail.id,
                //     serviceRole: account.ServiceDetail.role,
                //     serviceDescription : account.ServiceDetail.description
                // }
                // console.log('user info  auth context=> ', userInfo);
                console.log('type token', typeof(response.token.AccessToken));
                console.log('type name', typeof(account.AccountDetail.name));
                await storage.setData(KEY.ACCOUNTNAME, account.AccountDetail.name )
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
                // console.log('token => ', token);
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
            await storage.deleteData(KEY.ACCOUNTNAME);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    return <AuthContext.Provider value={{onLogin, onLogout, isTokenExist}}>{children}</AuthContext.Provider>;
};