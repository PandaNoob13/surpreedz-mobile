import { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import useDependency from "../../../shared/hook/UseDependency"
import Storage from "../../../shared/Storage";
import {KEY, ROUTE} from "../../../shared/constants";
import { useNavigation } from "@react-navigation/native";
import ModalAlert from "../../../shared/components/ModalAlert";


const useAddEditService = () => {
    const {addEditServiceService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(true);
    const [data, setData] = useState({});
    const [posts, setPosts] = useState({});
    const storage = Storage();
    const [serviceDetailId, setServiceDetailId] = useState('');
    const navigation = useNavigation();
    const [alertShow, setAlertShow] = useState({
        editSuccess: false,
        editFailed: false,
        submitSuccess: false,
        submitFailed: false,
    })

    useEffect(()=>{
        const serviceDetailIdFunc = async () => {
            const servId = await storage.getData(KEY.SERVICE_ID)
            setServiceDetailId(servId)
        }
        serviceDetailIdFunc()
        if (isError == false) {
            console.log('data.role',data.role);
            console.log('data.price',data.price);
            console.log('data.description',data.description);
            handlePostService();
        }
        console.log('servId ',serviceDetailId); 
    },[isError,data])

   

    const handlePostService = async () => {
        await storage.setData(KEY.SERVICE_ROLE,data.role);
        await storage.setData(KEY.SERVICE_PRICE, String(data.price));
        await storage.setData(KEY.SERVICE_DESCRIPTION,data.description);
    }


    const onPostService = async (accountId ,role, description, price, video_link) => {
        Keyboard.dismiss();
        setLoading(true)
        console.log("On Post Service Called");
        const intServiceDetailId = parseInt(serviceDetailId)
        switch (intServiceDetailId) {
            case 0 :
                try {
                    console.log('intServiceDetailId 0 =>', intServiceDetailId);
                    const response = await addEditServiceService.postService({
                        seller_id: accountId,
                        role: role,
                        description: description,
                        price: price,
                        video_link: video_link
                    })
                    console.log('status: ', response.status);
                    setPosts(response.status)
                    setData({
                        role: role,
                        description: description,
                        price: price
                    })
                    setIsError(false)
                    console.log('DATA SERVICE SELLER SUCCESS DI TAMBAH');
                    setAlertShow({submitSuccess:true})
                    // Alert.alert('Submit Your Service Success','')
                    // navigation.replace(ROUTE.MAIN)
                } catch (error) {
                    setPosts(error)
                    console.log(error);
                    setAlertShow({submitFailed:true})
                    // Alert.alert('Submit Your Service Failed','Something wrong , Try again!')
                }finally{
                    setLoading(false)
                }
                break;
            default :
                try {
                    console.log('intServiceDetailId def =>', intServiceDetailId);
                    const response = await addEditServiceService.putService({
                        role: role,
                        description: description,
                        price: price,
                    })
                    console.log('status: ', response.status);
                    setPosts(response.status)
                    setData({
                        role: role,
                        description: description,
                        price: price
                    })
                    setIsError(false)
                    console.log('DATA SERVICE SELLER SUCCESS DI UBAH');
                    setAlertShow({editSuccess:true})
                    // Alert.alert('Your service has been changed successfully','')
                    // navigation.replace(ROUTE.MAIN)
                } catch (error) {
                    setPosts(error)
                    console.log(error);
                    setAlertShow({editFailed:true})
                    // Alert.alert('Your Service Change Failed','Something wrong , Try again!')
                }finally{
                    console.log('service updated');
                    setLoading(false)
                }
                break;
        }
        
    }

    return {
        onPostService,isLoading,alertShow,setAlertShow
    }

}

export default useAddEditService