import { useEffect, useState } from "react";
import useDependency from "../../shared/hook/UseDependency"
import Storage from "../../shared/Storage";
import {useDispatch} from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { addOrder } from "../orderpage/state/OrderDetailAction";
import { ROUTE } from "../../shared/constants";


const usePurchaseConfirmation = () => {
    const {orderService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([]);
    const storage = Storage();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => { 
        
    }, [posts])
    const onPostService = async (buyer_id, service_detail_id, due_date, occasion, recipient_name, message_to_recipient, recipient_description) => {
        setLoading(true);
        console.log("On Get usePurchaseConfirmation Called");
        try {
            console.log('usePurchaseConfirmation recipient_description',typeof(buyer_id));
            console.log('usePurchaseConfirmation service_detail_id',typeof(service_detail_id));
            console.log('usePurchaseConfirmation due_date',due_date);
            console.log('usePurchaseConfirmation occasion',occasion);
            console.log('usePurchaseConfirmation recipient_name',recipient_name);
            console.log('usePurchaseConfirmation',message_to_recipient);
            console.log('usePurchaseConfirmation',recipient_description);
            const response = await orderService.postOrderService({
                buyer_id: buyer_id,
                service_detail_id: service_detail_id,
                due_date: due_date,
                occasion: occasion,
                recipient_name: recipient_name,
                message_to_recipient: message_to_recipient,
                recipient_description: recipient_description
            })
            
            // console.log('Response use order detail : ', response);
            setPosts(response.data)
            setIsError(false);
            // dispatch(addOrder(false));
            // navigation.replace(ROUTE.MAIN)
            console.log('PAYMENT SUCCESS');

            
        } catch (error) {
            setPosts(error)
            console.log(error);
        }finally{
            setLoading(false)
        }   
    }

    return {
        onPostService,isLoading
    }
}

export default usePurchaseConfirmation