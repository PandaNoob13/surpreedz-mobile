import { View, Text ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import CardContainer from '../../shared/components/CardContainer';
import RequestCard from '../../shared/components/RequestCard';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import OrderDetailInfo from '../../shared/components/OrderDetailInfo';
import Storage from '../../shared/Storage';
import { KEY } from '../../shared/constants';
import useAddEditService from './hookSeller/UseAddEditService';

const SellerPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)
    const storage = Storage();
    // const [modalDetailOrder, setModalDetailOrder] = useState(false)
    const getRole = async () => {
      return  await storage.getData(KEY.SERVICE_ROLE);
    }
    const getPrice = async () => {
      return await storage.getData(KEY.SERVICE_PRICE);
    }
    const getDesc = async () => {
      return await storage.getData(KEY.SERVICE_DESCRIPTION);
    }
    const getIdAccount = async () => {
     return await storage.getData(KEY.ACCOUNT_ID);
    }
    const getAllItem = async () => {
      const role = await storage.getData(KEY.SERVICE_ROLE);
      const price = await storage.getData(KEY.SERVICE_PRICE);
      const desc = await storage.getData(KEY.SERVICE_DESCRIPTION);
      const accId =  await storage.getData(KEY.ACCOUNT_ID);
      setRole(role);
      setPrice(price);
      setDescription(desc);
      setAccountId(accId)
    }

    useEffect(()=>{
      getAllItem();
    },[role, description, price])

    // var accountId = getIdAccount();
    var serviceDetailRole = getRole();
    var serviceDetailDesc = getDesc();
    var serviceDetailPrice = getPrice();
    const [role, setRole] = useState(serviceDetailRole)
    const [description, setDescription] = useState(serviceDetailDesc)
    const [price, setPrice] = useState(serviceDetailPrice);
    const [dataVideo ,setDataVideo] = useState();
    const {onPostService} = useAddEditService();
    const [accountId, setAccountId] = useState()

    const handleSubmit = async () => {
      console.log('accountId', accountId);
      console.log('role',role);
      console.log('description',description);
      console.log('price',price);
      onPostService(parseInt(accountId) ,role, description, parseInt(price),dataVideo)
    }

  return (
    <MainContainer>
       {modalVisible && 
        <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Your Service`} children={
          <CardContainer>
              <View>
                  <FormTextInput label={'Role'} value={role} onChangeText={setRole} />
                  <FormTextInput label={'Description'} value={description} onChangeText={setDescription} />
                  <FormTextInput label={'Price'} value={price} onChangeText={setPrice} />
                  <FormButton label={'Submit'} onPress={handleSubmit} />
              </View>
          </CardContainer>
      
        }
        />}

        {/* { modalDetailOrder &&
          <ModalDialog visible={modalDetailOrder} onPress={()=> setModalDetailOrder(false)} titleModal={'Order Detail'}>
              <OrderDetailInfo />
          </ModalDialog>
        } */}
        
      <View style={{margin:8}}>
          <View style={{margin:8}}>
              <FormButton label='Service'  onPress={()=> setModalVisible(true)} />
          </View>

          <View style={{margin:8}}>
              <Text style={styles.subtitle}>
                  Request List
              </Text>
              <View style = {styles.lineStyle} />
          </View>

          
          {/* <RequestCard openModalDetailOrder={()=> setModalDetailOrder(true)} /> */}
          <RequestCard />
          
      </View>
        
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
  subtitle:{
      fontSize:15,
      color: '#ffffff',
      fontWeight:'bold'
   },
   lineStyle:{
      borderWidth: 0.5,
      borderColor:'white',
      alignItems:'flex-start',
      marginRight:16,
      marginTop:8,
      marginBottom:8
  },
  textStyle :{
      fontSize:15,
      color: '#ffffff',
   },
   requestStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 2
   }
}))

export default SellerPage