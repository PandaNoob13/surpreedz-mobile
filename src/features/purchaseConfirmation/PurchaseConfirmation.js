import { View, Text ,StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import usePurchaseConfirmation from './usePurchaseConfirmation';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { KEY, ROUTE } from '../../shared/constants';
import FormButton from '../../shared/components/FormButton';
import Storage from '../../shared/Storage';
import WebView from 'react-native-webview';
import useMidtransService from './useMidtransService';
import MidtransSnapPage from './MidtransSnapPage';
import { addOrder } from '../orderpage/state/OrderDetailAction';


const PurchaseConfirmation = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {onPostService, isLoading}  = usePurchaseConfirmation();
    const navigation = useNavigation();
    const storage = Storage();
    const {onPostMidtrans, midPosts, statMidtrans} = useMidtransService()
    // const [WebviewVisible, setWebviewVisible] = useState(false);

    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)
    
    const route = useRoute();

    const handleSubmitPayment = async () => {
        const buyerId = await storage.getData(KEY.ACCOUNT_ID)
        console.log('order data dari purchase => ', addOrderDataResult);
        console.log('buyerId dr purchase', buyerId);

        await onPostService(parseInt(buyerId), addOrderDataResult.serviceDetailId, addOrderDataResult.dueDate, addOrderDataResult.occasion, addOrderDataResult.recipient, addOrderDataResult.message, addOrderDataResult.description);
        const midtransLink = await onPostMidtrans(addOrderDataResult.price)
        console.log('midtranslink: ', midtransLink);
        await navigation.replace(ROUTE.MIDTRANS, {
            prevPage:route.name,
            midtransLink: midtransLink,
        })

        useDispatch(addOrder(false));
        // if (midtransLink == '') {
        //     // await Midtrans(midtransLink);
        //     console.log('error link empty');
        //     console.error();
        // } else {
        //     await MidtransSnapPage({midtransLink:midtransLink})
        // }
    }

  return (
    <View>
        <Text>{addOrderDataResult.occasion} Greeting</Text>
        <Text>{addOrderDataResult.occasion} greeting</Text>
        <Text>Rp. {addOrderDataResult.price}</Text>
        <FormButton label={'Confirm & Payment'} onPress={handleSubmitPayment} />
    </View>
  )
}

const styling = (theme) => ( StyleSheet.create({

}))

export default PurchaseConfirmation