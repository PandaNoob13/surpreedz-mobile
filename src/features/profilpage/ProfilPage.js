import { View, StyleSheet, Text, ScrollView, Image, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import { KEY, ROUTE } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../shared/hook/UseAuth';
import Storage from '../../shared/Storage';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import CardContainer from '../../shared/components/CardContainer';
import Avatar from '../../shared/components/Avatar';
import ProfileCard from '../../shared/components/ProfileCard';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';

const ProfilPage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const {onLogout} = useAuth();
    const storage = Storage();
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    
    const imageUrl = 'https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg'

    useEffect(()=> {
      handleUserInfo();
    },[])


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

    const handleUserInfo = async () => {
      try {
        const response = await storage.getData(KEY.ACCOUNTNAME)
        console.log('user info =>', response);
        setName(response);
      } catch (e) {
        console.log('error User Info', e);
      }
    }

  return (
    <MainContainer>
      {modalVisible && 
          <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Edit Profile`} children={
                <CardContainer>
                    <View>
                        <FormTextInput label={'Name'} />
                        <FormTextInput label={'Location'} />
                        <View style={{width:'50%', marginBottom:32}}>
                            <FormButton label={'Upload Photo'} />   
                        </View>
                        <FormButton label={'Submit'} />
                    </View>
                </CardContainer>
            
          }
          />}
      <ScrollView>
          <ProfileCard imageUrl='https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg' 
          name='Ardhito Pramono'
          location='Bangka Belitung' 
          memberSince='22 Januari 2021'
          />

          <CardContainer style={styles.profileItem}>
            <View style={{margin:8}}>
                <Text style={styles.subtitle}>Account Information</Text>
                <View style = {styles.lineStyle} />
                <Text style={styles.textStyle2}>Email : ardhitopramono@mail.com</Text>
            </View>
          </CardContainer>

          <View style={styles.profileItem}>
            <FormButton label="Edit Profile"  onPress={()=> setModalVisible(true)} ></FormButton>
          </View>
          
          <View style={styles.profileItem}>
            <FormButton label={`Sign Out ${name}`} onPress={handleLogout} ></FormButton>
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