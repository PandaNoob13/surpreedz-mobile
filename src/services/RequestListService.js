import { useState } from "react";
import { KEY } from "../shared/constants";
import Storage from "../shared/Storage";

const requestListService = ({doGet, doPost}) => {
    // const [serviceDetailId, setServiceDetailId]=useState(0)
    const storage = Storage();

    const postService = async (data) => {
        console.log("Try Posting Request List Cards");
        try {
            return await doPost({url: '/order-status/create-order-status', data: data})
        } catch (error) {
            throw error

        }
    }

    // const serviceDetailIdFunc = async () => {
    //     const idServ =  await storage.getData(KEY.SERVICE_ID)
    //     setServiceDetailId(parseInt(idServ));
    //     // console.log('serviceDetailIdFunc called');
    // }

    const postVideoResult = async (data) => {
        console.log("Try to post video result");
        try {
            return await doPost({url: '/video-result/create-video-result', data: data})
        } catch (error) {
            throw error

        }
    }

    const getService = async () => {
        // console.log("Try Getting Request List Cards");
        // serviceDetailIdFunc();

        try {
            const serviceDetailId = await storage.getData(KEY.SERVICE_ID);
            return await doGet({url: `/order/get-all-order-by-service-detail-id/?serviceDetailId=${serviceDetailId}`})
        } catch (error) {
            throw error
        }
    }
    return {postService, postVideoResult ,getService}
}

export default requestListService
