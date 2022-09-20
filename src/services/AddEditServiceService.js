import { useEffect, useState } from "react";
import {  KEY, SERVICE } from "../shared/constants";
import Storage from "../shared/Storage";

const addEditServiceService = ({doPost, doPut}) => {
    // const [serviceDetailId, setServiceDetailId]=useState(0)
    const storage = Storage();

    const postService = async (data) => {
        console.log("Try post service");
        try {
            return await doPost({url: SERVICE.ADDSERVICE, data: data})
        } catch (error) {
            throw error
        }
    }

    // const serviceDetailIdFunc = async () => {
    //     const idServ =  await storage.getData(KEY.SERVICE_ID)
    //     setServiceDetailId(parseInt(idServ));
    //     console.log('serviceDetailIdFunc called');
    // }

    const putService = async (data) => {
        // serviceDetailIdFunc();
        console.log("Try put service");
        try {
            const serviceDetailId = await storage.getData(KEY.SERVICE_ID)
            return await doPut({url: `/service-detail/edit-service-detail/?serviceId=${serviceDetailId}`, data: data})
        } catch (error) {
            throw error
        }
    }
    return {postService, putService}
  
}

export default addEditServiceService