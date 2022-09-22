import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import usePurchaseConfirmation from './usePurchaseConfirmation';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { KEY, ROUTE } from '../../shared/constants';
import FormButton from '../../shared/components/FormButton';
import Storage from '../../shared/Storage';


const PurchaseConfirmation = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {onPostService, isLoading}  = usePurchaseConfirmation();
    const navigation = useNavigation();
    const storage = Storage();
   

    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)
    
    

    const handleSubmitPayment = async () => {
      const buyerId = await storage.getData(KEY.ACCOUNT_ID)
      // console.log('order data dari purchase => ', addOrderDataResult);
      // console.log('buyerId dr purchase', buyerId);

      onPostService(parseInt(buyerId), addOrderDataResult.serviceDetailId, addOrderDataResult.dueDate, addOrderDataResult.occasion, addOrderDataResult.recipient, addOrderDataResult.message, addOrderDataResult.description);

      
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