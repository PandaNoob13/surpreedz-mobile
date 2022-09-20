import { View, StyleSheet, Text, ScrollView, Image, Button} from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import { KEY, ROUTE } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../shared/hook/UseAuth';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import CardContainer from '../../shared/components/CardContainer';
import ProfileCard from '../../shared/components/ProfileCard';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import UseEditProfilePage from './UseEditProfilePage';
import Storage from '../../shared/Storage';



const ProfilPage = () => {
    const storage = Storage();
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const {onLogout} = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [data, setData] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [locationUser, setLocationUser] = useState('');
    const {onPutProfile,isLoading}= UseEditProfilePage();

    const serviceCardData = async () => {
          const  picUrl = await storage.getData(KEY.PHOTO_PROFILE)
          const  name = await storage.getData(KEY.ACCOUNTNAME)
          const  email = await storage.getData(KEY.ACCOUNT_EMAIL)
          const  location = await storage.getData(KEY.ACCOUNT_LOCATION)
          const  joinDate = await storage.getData(KEY.ACCOUNT_JOINDATE)
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
  }

    const imageUrl = 'https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg'

    useEffect(()=>{
      console.log("Trigger called");
      serviceCardData();
      console.log('serviceCardData', data);
    },[trigger])

    const handleLogout = async () => {
      try {
        const response = await onLogout();
        if (response) {
            navigation.replace(ROUTE.SIGNIN)
        }
        } catch (error) {
            console.log('error Logout', error);
        }
    }

    const handleSubmitEditProfile = async () => {
      console.log('changeName', nameUser);
      console.log('changeLocation', locationUser);
      setTrigger(!trigger);
      onPutProfile(nameUser,locationUser,'photo1','photo2',imageUrl,imageUrl)
    }

  return (
    <MainContainer>
      {modalVisible && 
          <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Edit Profile`} children={
                <CardContainer>
                    <View>
                        <FormTextInput label={'Name'} value={nameUser} onChangeText={setNameUser} />
                        <FormTextInput label={'Location'} value={locationUser} onChangeText={setLocationUser} />
                        <View style={{width:'50%', marginBottom:32}}>
                        <Button title='Upload Photo' />
                        </View>
                        <FormButton label={'Submit'} onPress={handleSubmitEditProfile} />
                    </View>
                </CardContainer>
            
          }
          />}
      <ScrollView>
          <ProfileCard data={data}
          />

          <CardContainer style={styles.profileItem}>
            <View style={{margin:8}}>
                <Text style={styles.subtitle}>Account Information</Text>
                <View style = {styles.lineStyle} />
                <Text style={styles.textStyle2}>Email : {data.email}</Text>
            </View>
          </CardContainer>

          <View style={styles.profileItem}>
            <FormButton label="Edit Profile"  onPress={()=> setModalVisible(true)} ></FormButton>
          </View>
          
          <View style={styles.profileItem}>
            <FormButton label={`Sign Out as ${nameUser}`} onPress={handleLogout} ></FormButton>
          </View>

      </ScrollView>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
   profileItem:{
    margin:10,
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
   lineStyle:{
    borderWidth: 0.5,
    borderColor:'white',
    alignItems:'flex-start',
    marginRight:16,
    marginTop:8,
    marginBottom:8
}
}))

export default ProfilPage