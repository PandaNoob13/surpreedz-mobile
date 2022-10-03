import { useEffect, useState } from "react";
import useDependency from "../../shared/hook/UseDependency"
import Storage from "../../shared/Storage";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { addOrder } from "../orderpage/state/OrderDetailAction";
import { KEY, ROUTE } from "../../shared/constants";
import useMidtransService from "./useMidtransService";


const usePurchaseConfirmation = () => {
    const {orderService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([]);
    const {onPostMidtrans} = useMidtransService()
    const navigation = useNavigation();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)
    const route = useRoute();
    const storage = Storage();


    useEffect(() => { 
        if (posts.order_id != undefined){
            console.log("Order id changed : ", posts.order_id);
            const fetchData = async () => {
                const buyerEmail = await storage.getData(KEY.ACCOUNT_EMAIL)
                const token = await onPostMidtrans(posts.order_id, buyerEmail ,addOrderDataResult.price)
                if (token !== '') {
                    await navigation.replace(ROUTE.MIDTRANS, {
                        prevPage: route.name,
                        midtransLink: token,
                    })                
                }
            }
            fetchData()
        }
    }, [posts])

    const onPostService = async (buyer_id, buyer_email ,service_detail_id, due_date, occasion, recipient_name, message_to_recipient, recipient_description) => {
        setLoading(true);
        console.log("On Get usePurchaseConfirmation Called");
        console.log("Buyer email in purchase confirmation: ", buyer_email);
        try {
            // console.log('usePurchaseConfirmation recipient_description',typeof(buyer_id));
            // console.log('usePurchaseConfirmation service_detail_id',typeof(service_detail_id));
            // console.log('usePurchaseConfirmation due_date',due_date);
            // console.log('usePurchaseConfirmation occasion',occasion);
            // console.log('usePurchaseConfirmation recipient_name',recipient_name);
            // console.log('usePurchaseConfirmation',message_to_recipient);
            // console.log('usePurchaseConfirmation',recipient_description);
            const response = await orderService.postOrderService({
                buyer_id: buyer_id,
                buyer_email: buyer_email,
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