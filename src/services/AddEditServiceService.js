import {  KEY, SERVICE } from "../shared/constants";
import Storage from "../shared/Storage";

const addEditServiceService = ({doPost, doPut}) => {
    const storage = Storage();
    const postService = async (data) => {
        console.log("Try post service");
        try {
            return await doPost({url: SERVICE.ADDSERVICE, data: data})
        } catch (error) {
            throw error
        }
    }
    const serviceDetailIdFunc = async () => {
        await storage.getData(KEY.SERVICE_ID)
    }

    const serviceDetailId = serviceDetailIdFunc();
    
    const putService = async (data) => {
        console.log("Try put service");
        try {
            return await doPut({url: `/service-detail/edit-service-detail/?serviceId=${serviceDetailId}`, data: data})
        } catch (error) {
            throw error
        }
    }
    return {postService, putService}
  
}

export default addEditServiceService