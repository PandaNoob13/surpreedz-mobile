import { View ,StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import Storage from '../../shared/Storage';
import { KEY, ROUTE } from '../../shared/constants';
import useAddEditService from './hookSeller/UseAddEditService';
import useRequestList from './hookSeller/UseRequestList';
import RequestListPage from './components/RequestListPage';
import { Text } from 'react-native-ui-lib';
import SpinnerLoading from '../../shared/components/SpinnerLoading';
import ModalAlert from '../../shared/components/ModalAlert';
import { useNavigation } from '@react-navigation/native';

const SellerPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)
    const storage = Storage();
    const navigation = useNavigation();
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
    const {onPostService,alertShow,setAlertShow} = useAddEditService();
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

    const handleAlert = () => {
        if (alertShow.editSuccess || alertShow.submitSuccess) {
            setAlertShow(false,false,false,false)
            navigation.replace(ROUTE.MAIN)
        } else if (alertShow.editFailed || alertShow.submitFailed) {
            setAlertShow(false,false,false,false)
        }
    }

    return (
        <MainContainer mainPage>
            <ScrollView>
                {modalVisible && 
                    <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Your Service`} modalHeight={'60%'} children={
                        <ScrollView>
                            <FormTextInput label={'Role'} value={role} onChangeText={setRole} />
                            <FormTextInput label={'Description'} value={description} onChangeText={setDescription} />
                            <FormTextInput label={'Price'} value={price} onChangeText={setPrice} />
                            <FormButton disabled={buttonDisabled} label={'Submit'} onPress={handleSubmit} />
                        </ScrollView>
                
                    }
                />}
                <View style={{margin: 25}}>
                    <Text style={{marginBottom: 15}} colourTextPrimary text40BO>Bring joy to your audience!</Text>
                    {role == '' ? <FormButton label='Register your Service' onPress={()=> setModalVisible(true)} style={{marginVertical:10}}/>
                    : <FormButton label='Edit your Service' onPress={()=> setModalVisible(true)} style={{marginVertical:10}}/>
}
                    {/* need to change button label when user registered as verified seller */}
                    {/* { modalDetailOrder &&
                    <ModalDialog visible={modalDetailOrder} onPress={()=> setModalDetailOrder(false)} titleModal={'Order Detail'}>
                        <OrderDetailInfo />
                    </ModalDialog>
                    } */}
                    
                    <RequestListPage></RequestListPage>
                </View>
                {(alertShow.submitSuccess) &&
                <>
                    <ModalAlert visible={alertShow.signUp} onPress={() => handleAlert()} success title={'Submit Your Service Success'}/>
                </>
                }
                {alertShow.submitFailed &&
                    <ModalAlert visible={alertShow.signUpFailed} onPress={() => handleAlert()} error title={'Submit Your Service Failed'} subtitle={'Something wrong, Try again!'}/>
                }
                {alertShow.editSuccess &&
                <>
                    <ModalAlert visible={alertShow.signUp} onPress={() => handleAlert()} success title={'Your service has been changed successfully'}/>
                </>
                }
                {alertShow.editFailed &&
                <>
                    <ModalAlert visible={alertShow.signUpPayment} onPress={() => handleAlert()} error title={'Your Service Change Failed'} subtitle={'Something wrong, Try again!'}/>
                </>
                }
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