import { View ,StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import Storage from '../../shared/Storage';
import { KEY } from '../../shared/constants';
import useAddEditService from './hookSeller/UseAddEditService';
import useRequestList from './hookSeller/UseRequestList';
import RequestListPage from './components/RequestListPage';
import { Text } from 'react-native-ui-lib';
import SpinnerLoading from '../../shared/components/SpinnerLoading';

const SellerPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)
    const storage = Storage();
    const {isLoading} = useAddEditService();
    const {isLoading2} = useRequestList();

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
    const [accountId, setAccountId] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = async () => {
        console.log('accountId', accountId);
        console.log('role',role);
        console.log('description',description);
        console.log('price',price);
        onPostService(parseInt(accountId) ,role, description, parseInt(price),dataVideo)
    }

    useEffect(() => {
        if (role === '' || description === '' || price === '') {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [role, description, price])

    return (
        <MainContainer mainPage>
            <ScrollView>
                {modalVisible && 
                    <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Your Service`} modalHeight={'70%'} children={
                        <ScrollView>
                            <FormTextInput label={'Role'} value={role} onChangeText={setRole} />
                            <FormTextInput label={'Description'} value={description} onChangeText={setDescription} />
                            <FormTextInput label={'Price'} value={price} onChangeText={setPrice} />
                            <FormButton disabled={buttonDisabled} label={'Submit'} onPress={handleSubmit} />
                        </ScrollView>
                
                    }
                />}
                <View style={{margin: 25}}>
                    <Text colourTextPrimary text40BO>Serve your audence!</Text>
                    <FormButton label='Register your Service' onPress={()=> setModalVisible(true)} style={{marginVertical:10}}/>

                    {/* { modalDetailOrder &&
                    <ModalDialog visible={modalDetailOrder} onPress={()=> setModalDetailOrder(false)} titleModal={'Order Detail'}>
                        <OrderDetailInfo />
                    </ModalDialog>
                    } */}
                    
                    <RequestListPage></RequestListPage>
                </View>
            </ScrollView>
            {isLoading ? <SpinnerLoading onShowSpinner={isLoading}></SpinnerLoading>:<></>}
            {isLoading2 ? <SpinnerLoading onShowSpinner={isLoading2}></SpinnerLoading>:<></>}
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