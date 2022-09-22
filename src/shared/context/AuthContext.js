import {createContext, useEffect, useState} from "react";
import Storage from "../Storage"
import useDependency from "../hook/UseDependency";
import {KEY} from "../constants"
import {useDispatch,useSelector} from 'react-redux';
import { addOrder } from "../../features/orderpage/state/OrderDetailAction";


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {signInService} = useDependency();
    const storage = Storage();
    const [dataUser, setDataUser] = useState('');
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer);
    const dispatch = useDispatch();

    useEffect(()=> {
        // console.log('orderData useEffect AuthProvider', addOrderDataResult);
    },[addOrderDataResult])


    const onLogin = async (userCred = {}) => {
        try {
            const response = await signInService.postLogin(userCred);
            if (response) {
                await storage.setData(KEY.TOKEN, response.token.AccessToken);
                setDataUser(response.account);
                return true;
            } else {
                // console.log('response authcontext false');
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
            await storage.deleteData(KEY.ACCOUNT_ID);
            await storage.deleteData(KEY.ACCOUNT_EMAIL)
            await storage.deleteData(KEY.ACCOUNT_LOCATION)
            await storage.deleteData(KEY.ACCOUNT_JOINDATE)
            await storage.deleteData(KEY.SERVICE_ID)
            await storage.deleteData(KEY.SERVICE_ROLE)
            await storage.deleteData(KEY.SERVICE_DESCRIPTION)
            await storage.deleteData(KEY.PHOTO_PROFILE)
            await storage.deleteData(KEY.SERVICE_PRICE)
            await storage.clearStorage();
            dispatch(addOrder(false));
            // console.log('AuthContext addOrderDataResult terhapus => ',addOrderDataResult);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleUserInfo = async () => {
        if (dataUser != '') {
            const account = dataUser.account;
            const userInfo = {
                id:String(account.id),
                email:account.email,
                name: account.AccountDetail.name,
                location: account.AccountDetail.location,
                joinDate : dataUser.string_join_date,
                serviceId : String(account.ServiceDetail.id),
                serviceRole: account.ServiceDetail.role,
                serviceDescription : account.ServiceDetail.description,
                dataUrl : dataUser.data_url
            }

            await storage.setData(KEY.ACCOUNTNAME, userInfo.name )
            await storage.setData(KEY.ACCOUNT_ID, userInfo.id )
            await storage.setData(KEY.ACCOUNT_EMAIL, userInfo.email)
            await storage.setData(KEY.ACCOUNT_LOCATION, userInfo.location )
            await storage.setData(KEY.ACCOUNT_JOINDATE, userInfo.joinDate )
            await storage.setData(KEY.SERVICE_ID, userInfo.serviceId )
            await storage.setData(KEY.SERVICE_ROLE, userInfo.serviceRole )
            await storage.setData(KEY.SERVICE_DESCRIPTION, userInfo.serviceDescription )
            
            if (account.ServiceDetail.id != 0) {
                const serviceDetail = account.ServiceDetail;
                console.log(serviceDetail.ServicePrices);
                const price = serviceDetail.ServicePrices[serviceDetail.ServicePrices.length - 1]
                await storage.setData(KEY.SERVICE_PRICE, String(price.price))
            } else {
                await storage.setData(KEY.SERVICE_PRICE, String(0))
                console.log("No service detail");
            }
            // console.log('user Info Auth Context, ', userInfo);

            await storage.setData(KEY.PHOTO_PROFILE,userInfo.dataUrl)
            
        }
   }

   useEffect(()=>{
        handleUserInfo();
   },[dataUser])

    
    return <AuthContext.Provider value={{onLogin, onLogout, isTokenExist}}>{children}</AuthContext.Provider>;
};