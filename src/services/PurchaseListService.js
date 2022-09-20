import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { KEY } from "../shared/constants";
import Storage from "../shared/Storage";

const purchaseListService = ({doGet}) => {
    const storage = Storage();
    // const [accountId, setAccountId]= useState(0)

    // const accountIdFunc = async () => {
    //     const idAcc =  await storage.getData(KEY.ACCOUNT_ID)
    //     setAccountId(parseInt(idAcc));
    //     // console.log('accountIdFunc called');
    // }

    const getService = async () => {
        // accountIdFunc();
        console.log("Try Getting Purchase List Cards");
        try {
            const output2 = await AsyncStorage.getItem('account_id');
            console.log('output2 purchase', output2);
            const output = await AsyncStorage.getAllKeys();
            console.log('output purchase', output);
            // const buyerId = await storage.getData(KEY.ACCOUNT_ID)
            // if (buyerId) {
            //     console.log('buyer Id', buyerId);
            //     return await doGet({url: `/order/get-all-order-by-buyer-id/?buyerId=${buyerId}`})
            // }else{
            //     console.log('try Purchase List error');
            // }
            const buyerId = await storage.getData(KEY.ACCOUNT_ID)
            console.log('buyerId', buyerId);
            return await doGet({url: `/order/get-all-order-by-buyer-id/?buyerId=${buyerId}`})
            
        } catch (error) {
            console.log('e purchase list service', error);
            throw error
        }
    }
    const getVideoResult = async (orderId) => {
        console.log("Trying to get video result");
        console.log("Order id in service purchase : ", orderId);

        try {
            return await doGet({url: `/video-result/get-video-result-by-order-id/?orderId=${orderId}`})
        } catch (error) {
            throw error
        }
    }
    return {getService, getVideoResult}
  
}

export default purchaseListService