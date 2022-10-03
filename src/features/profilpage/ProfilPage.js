import { View, StyleSheet, Text, ScrollView, Alert, Button, Image} from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import { KEY, ROUTE } from '../../shared/constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useAuth from '../../shared/hook/UseAuth';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import CardContainer from '../../shared/components/CardContainer';
import ProfileCard from '../../shared/components/ProfileCard';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import UseEditProfilePage from './UseEditProfilePage';
import Storage from '../../shared/Storage';
import * as ImagePicker from 'expo-image-picker';
import SpinnerLoading from '../../shared/components/SpinnerLoading';
import { useSelector } from 'react-redux';
import ModalAlert from '../../shared/components/ModalAlert';
import { set } from 'react-native-reanimated';

const ProfilPage = () => {
    const storage = Storage();
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();

    const isFocused = useIsFocused()

    const {onLogout} = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState('');
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer);
    const [alertShow, setAlertShow] = useState({
        editPhoto: false,
        signOutPayment: false,
        signOut: false,
        submitSuccess: false,
        submitFailed: false,
    })
    const [nameUser, setNameUser] = useState('');
    const [locationUser, setLocationUser] = useState('');
    const {onPutProfile, isLoading, trigger, isError, changedPhotoProf}= UseEditProfilePage();
    const [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {
        if (nameUser === '' || locationUser === '') {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [nameUser, locationUser])

    // IMAGE HANDLE
    const [image, setImage] = useState('');
    const [base64Image, setbase64Image] = useState('');


    const funcimg = async () => {
        if (Platform.OS !== 'web') {
          const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          console.log('status', status);
          if (status !== 'granted') {
              alert('Permission denied !')
          }
      }
    }

    const funcimg2 = async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        console.log('status 2', status);
        if (status !== 'granted') {
            alert('Permission denied !')
        }
        }
    }
    const forceUpdate = useState({})[1].bind(null, {})  // see NOTE above
    
    useEffect(()=>{
        // console.log("Is focused: ", isFocused);
        // if (isFocused == true){
        //     serviceCardData()
        //     console.log("Is focused == true");
        // }
        funcimg();
        funcimg2();
        // Return the function to unsubscribe from the event so it gets removed on unmount
    },[])

    const PickImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64:true,
          aspect:[4,3],
          // quality:1
        });

        
        // console.log('result', result);
        if (!result.cancelled) {
          setImage(result.uri);
          setbase64Image(result.base64);
          // console.log('result base64', result.base64);
        }
        // console.log('result base64', result.base64);
      }
    
      const PickImagePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64:true,
          aspect:[4,3],
          // quality:1
        });

        
        // console.log('result', result);
        if (!result.cancelled) {
          setImage(result.uri);
          setbase64Image(result.base64);

          // console.log('result base64', result.base64);
        }
        // console.log('result base64', result.base64);
      }      
    
    const serviceCardData = async () => {
        const picUrl = await storage.getData(KEY.PHOTO_PROFILE)
        const name = await storage.getData(KEY.ACCOUNTNAME)
        const email = await storage.getData(KEY.ACCOUNT_EMAIL)
        const location = await storage.getData(KEY.ACCOUNT_LOCATION)
        const joinDate = await storage.getData(KEY.ACCOUNT_JOINDATE)
        const dataUrl= await storage.getData(KEY.PHOTO_PROFILE)
        setData({
            name : name,
            location :location,
            email :email,
            joinDate:joinDate,
            picUrl: picUrl,
            dataUrl :dataUrl
        })
        setNameUser(name);
        setLocationUser(location);
        setImage(dataUrl);
        setbase64Image(picUrl);
  }


    useEffect(()=>{
    //   console.log("Trigger called");
      serviceCardData();
      

    //   console.log('serviceCardData', data);
    },[trigger])

    useEffect(() => {
        console.log("Data change in profile page");
        if (changedPhotoProf != ''){
            console.log("Photo profile has changed");
        }
    }, [data])

    
    const handleLogout = async () => {
      try {
        const response = await onLogout();
        if (response) {
            navigation.replace(ROUTE.MAIN);
            
        }
        } catch (error) {
            console.log('error Logout', error);
        }
    }

    const handleSubmitEditProfile = async () => {
        //   console.log('changeName', nameUser);
        //   console.log('changeLocation', locationUser);
        // if (image != '' && base64Image != '') {
        
        // }
        const photoNameSplit = image.split('/');
        console.log('photoNameSplit', photoNameSplit);
        const lengthPhotoNAmesplit = photoNameSplit.length;
        console.log('lengthPhotoNAmesplit',lengthPhotoNAmesplit);
        const photoName = photoNameSplit[lengthPhotoNAmesplit-1]
        console.log('photoName',photoName);

        await onPutProfile(nameUser,locationUser,photoName,image,base64Image)
        if (isError) {
             setAlertShow({submitFailed:true})
                // const timeout = setTimeout(() => setAlertShow({submitFailed:true}), 3000)
                console.log('failed alert show');
        } else {
             setAlertShow({submitSuccess:true})
            // useEffect(() => {
                // const timeout = setTimeout(() => setAlertShow({submitSuccess:true}), 3000)
                console.log('success alert show');
        }
        
        
        // await navigation.replace(ROUTE.MAIN)
    }

    const handleAlert = () => {
        if (isError) {
            setAlertShow(false,false,false,false,false)

        } else {
            setAlertShow(false,false,false,false,false)
            navigation.replace(ROUTE.MAIN)
        }
    }
    return (
        <MainContainer mainPage>
            {isLoading ? <SpinnerLoading onShowSpinner={isLoading}></SpinnerLoading>:<></>}

            {modalVisible && 
                <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Edit Profile`} modalHeight={'70%'}>
                    <ScrollView>
                        <FormTextInput label={'Name'} value={nameUser} onChangeText={setNameUser} />
                        <FormTextInput label={'Location'} value={locationUser} onChangeText={setLocationUser} />
                        <View style={{width:'50%'}}>
                            {alertShow.editPhoto && 
                                <ModalAlert visible={alertShow.editPhoto} title={'Edit Foto'} 
                                onPress={() => setAlertShow({editPhoto:false})}
                                buttons={[
                                    {
                                        label:'Pilih Foto',
                                        onPress: () => {
                                            setAlertShow({editPhoto:false});
                                            PickImageLibrary();
                                        },
                                    },
                                    {
                                        label:'Ambil Foto',
                                        onPress: () => {
                                            setAlertShow({editPhoto:false});
                                            PickImagePhoto();
                                        }
                                    }
                                ]}/>
                            }
                            <Button title='Upload Photo' onPress={()=> setAlertShow({editPhoto:true})} />
                            {image && <Image source={{uri:image}} style={{width: 100,height: 100}} />}
                        </View>

                        {(alertShow.submitFailed || alertShow.submitSuccess) && 
                            <>
                                {isError ? <ModalAlert visible={alertShow.submitFailed} failed title={'Edit Profile Failed'} onPress={() => handleAlert()}/> 
                                : 
                                <ModalAlert success visible={alertShow.submitSuccess} title={'Edit Profile Success'} onPress={() => handleAlert()}/>}
                            </>
                        }  
                        <FormButton disabled={buttonDisabled} label={'Submit'} onPress={handleSubmitEditProfile} />
                    </ScrollView>                  
                </ModalDialog>
            }
            <ScrollView>
                <View style={{margin: 25}} >            
                    <ProfileCard data={data} style={{marginBottom: 12}}/>
                    <CardContainer style={{marginBottom: 12}}>
                        <View style={{margin:8}}>
                            <Text style={[styles.subtitle, {marginBottom:8}]}>Account Information</Text>
                            <Text style={styles.textStyle2}>Email : {data.email}</Text>
                        </View>
                    </CardContainer>
                    
                    <View style={styles.profileItem}>
                        <FormButton label="Edit Profile"  onPress={() => setModalVisible(true)} ></FormButton>
                    </View>
                    {(alertShow.signOut || alertShow.signOutPayment) && 
                        <>
                            {addOrderDataResult ? 
                                <ModalAlert warning visible={alertShow.signOutPayment} title={'Are you sure ?'} 
                                subtitle={'If you sign out before completing the payment, your order data will be deleted'}
                                buttons={[
                                    {
                                        label:'Cancel',
                                        onPress: () => {
                                            console.log('CANCEL SIGN OUT')
                                            setAlertShow({signOut: false})
                                        },
                                    },
                                    {
                                        label:'Sign Out',
                                        onPress: () => handleLogout(),
                                    }
                                ]}/>
                                :
                                <ModalAlert warning visible={alertShow.signOut} title={'Are you sure ?'} 
                                onPress={() => setAlertShow({signOut:false})}
                                buttons={[
                                    {
                                        label:'Cancel',
                                        onPress: () => {
                                            console.log('CANCEL SIGN OUT')
                                            setAlertShow({signOut: false})
                                        },
                                    },
                                    {
                                        label:'Sign Out',
                                        onPress: () => handleLogout(),
                                    }
                                ]}/>
                            }
                        </>
                    }
                    <View style={styles.profileItem}>
                        <FormButton label={`Sign Out as ${nameUser}`} onPress={() => setAlertShow({signOutPayment: true, signOut: true})} ></FormButton>
                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
    profileItem:{
        marginVertical:10,
    },
    textStyle :{
        fontSize:15,
        color: '#ffffff',
        textAlign:'center'
    },
    textStyle2 :{
        fontSize:15,
        color: '#ffffff',
    },
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
}))

export default ProfilPage