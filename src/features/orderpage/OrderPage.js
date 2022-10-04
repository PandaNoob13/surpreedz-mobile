import { View, Text ,StyleSheet, ScrollView, Alert} from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import ProfileCard from '../../shared/components/ProfileCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormButton from '../../shared/components/FormButton';
import {useDispatch,useSelector} from 'react-redux';
import UseOrderPage from './UseOrderPage';
import PersonalisedMessageCard from '../../shared/components/PersonalisedMessageCard';
import OccasionCard from '../../shared/components/Occasion/OccasionCard';
import { addOrder } from './state/OrderDetailAction';
import useAuth from '../../shared/hook/UseAuth';
import { ROUTE } from '../../shared/constants';
import ModalDialog from '../../shared/components/ModalDialog';
import About from '../../shared/components/About';
import { Feather } from '@expo/vector-icons';
import ModalAlert from '../../shared/components/ModalAlert';

const OrderPage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const route = useRoute();
    const navigation = useNavigation();
    const {occasion, onChangeOccasion,recipient, onChangeRecipient,message, onChangeMessage,description, onChangeDescription} = UseOrderPage();
    const [orderParam, setOrderParam] = useState({});
    const [dataSeller,setDataSeller] = useState('');
    const {isTokenExist} = useAuth();
    const [token, setToken] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const [alertShow, setAlertShow] = useState({
        success: false,
    }) 

    const dispatch = useDispatch();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)

    useEffect(()=> {
      const onValidToken = async ()=>{
            try {
              const resp = await isTokenExist();
              if (resp) {
                setToken(true)
              } else {
                setToken(false)
              }
            } catch (e) {
              console.log('error onValid Token from orderpage',e);
              setToken(false)
            }
          }
          onValidToken();
    },[])

    useEffect(()=>{
      if (route.params?.picUrl && route.params?.name && route.params?.email && route.params?.location && route.params?.joinDate && route.params?.serviceDetailId && route.params?.price && route.params?.dataUrl && route.params?.prevPage) {
          setOrderParam({
            picUrl:route.params.picUrl,
            name: route.params.name,
            email: route.params.email,
            location: route.params.location,
            joinDate: route.params.joinDate,
            serviceDetailId: route.params.serviceDetailId,
            price: route.params.price,
            dataUrl: route.params.dataUrl,
            prevPage: route.params.prevPage

          })
      }
    },[route.params])

    useEffect(()=>{
        setDataSeller({
            picUrl:orderParam.picUrl,
            name: orderParam.name,
            email: orderParam.email,
            location: orderParam.location,
            joinDate: orderParam.joinDate,
            serviceDetailId: orderParam.serviceDetailId,
            price: orderParam.price,
            dataUrl: orderParam.dataUrl,

          })
        // console.log('orderParam.nameSeller', orderParam.nameSeller);
        // console.log('orderParam.locationSeller', orderParam.locationSeller);
    },[orderParam])

    useEffect(() => {
        if (occasion === '' || recipient === '' || message === '' || description === '') {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [occasion, recipient, message, description])

    const handleSendRequest = () => {
        console.log('Send Request Order');
        console.log('Occasion', occasion);
        console.log('recepient',recipient);
        console.log('message', message);
        console.log('desc',description);
        dispatch(addOrder({
            serviceDetailId: orderParam.serviceDetailId,
            dueDate: dueDate,
            occasion: occasion,
            recipient: recipient,
            message: message,
            description: description,
            price: orderParam.price
        }))
        console.log('Send Request SUCCESS');
        console.log('addOrderDataResult', addOrderDataResult);
        // Alert.alert('Your request has been saved successfully','Please complete the transaction !')
        setAlertShow({success:true});
    }

    useEffect(()=>{
      // console.log('addOrderData', addOrderData.serviceDetailId);
      // console.log('addOrderData', addOrderDataResult);
      if (addOrderDataResult && !alertShow.success) {
        // console.log('5. masuk use effect add order');
        if (token) {
          navigation.replace(ROUTE.PAYMENT)
        }else {
          navigation.replace(ROUTE.SIGNIN)
        }
      }
    },[addOrderDataResult,alertShow.success,dispatch])

    const handleAlert = async () => {
        setAlertShow({success:false})
    }

  return (
    <MainContainer>
        <ScrollView>
            <View style={styles.container}>
                <ProfileCard 
                    data={dataSeller}
                    style={{marginBottom: 16}}
                />

                <OccasionCard occasion={occasion} onPress={onChangeOccasion} orderParam={orderParam}></OccasionCard>

                <PersonalisedMessageCard onChangeRecipient={onChangeRecipient} onChangeMessage={onChangeMessage} onChangeDescription={onChangeDescription} recipient={recipient} message={message} description={description} orderParam={orderParam} ></PersonalisedMessageCard>

                <View style={{marginBottom:16}}>
                    <FormButton disabled={buttonDisabled} label={`Send Request`} onPress={handleSendRequest} />
                </View>
                {/* {modalVisible && 
                    <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`How Surpreedz works?`} modalHeight={'40%'} >
                        <About></About>
                    </ModalDialog>}
                    
                <FormButton link style={{marginBottom:16}} labelStyle={{color:'#fff'}} label=' How Surpreedz works?' onPress={()=>setModalVisible(true)}>
                    <Feather name="info" size={24} color={'white'} />
                </FormButton> */}
            </View>
            {alertShow.success && 
                <ModalAlert visible={alertShow.success} title={`Your request has been saved successfully`} subtitle={'Please complete the transaction !'} success onPress={() => handleAlert()}/>
            }
        </ScrollView>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
    subtitle:{
        textAlign:'center',
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginBottom: 8,
    },
    container: {
        // marginVertical: 25,
        paddingHorizontal: 25,
    },
}))

export default OrderPage