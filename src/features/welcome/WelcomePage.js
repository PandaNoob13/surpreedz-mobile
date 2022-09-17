import {Text, StyleSheet, View } from 'react-native'
import { useTheme } from '../../shared/context/ThemeContext'
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../shared/constants';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';


const WelcomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();

  return (
    <MainContainer>
    <View style={styles.welcomeContainer}>
      <View>
          <Text style={styles.textWelcome}>WelcomePage</Text>
      </View>
      <View style={styles.buttonContainer}>
          <FormButton label={'Sign In'} onPress={()=> {navigation.replace(ROUTE.SIGNIN)}} ></FormButton>
         
          <FormButton label={'Sign Up'} onPress={()=> {navigation.replace(ROUTE.SIGNUP)}} ></FormButton>
      </View>
    </View>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly'

  },
  textWelcome:{
    fontSize:40,
    color: '#ffffff'
  },
  welcomeContainer:{
    flexDirection:'column',
    justifyContent:'space-around'
  }
   
}))

export default WelcomePage