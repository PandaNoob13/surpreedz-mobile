import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {View,Text, Colors} from 'react-native-ui-lib';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { ROUTE } from '../../shared/constants';
import { useTheme } from '../../shared/context/ThemeContext';
import FormButton from '../../shared/components/FormButton';
import { useState } from 'react';
import UseSignUp from './UseSignUp';

const SignUp = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const [step,setStep]= useState(1);
    const {viewState,email,password,name,location,onChangeEmail,onChangePassword,onChangeLocation,onChangeName,onPostSignUp} = UseSignUp();

    const handleContinue = () => {
      setStep(step + 1);
    }

    const handleBack =  () => {
        setStep(step - 1);
    }


    switch (step) {
      case 1:
        return (
          <MainContainer>
          <ScrollView>
              <View flex paddingH-25 paddingT-120 colourText>
                  <Text colourTextPrimary text20>Welcome</Text>
                      <View useSafeArea marginV-10>
                              <FormTextInput 
                              label={'Email'} 
                              placeholder="youremail@sample.com" 
                              enableErrors={true} validate={['required', 'email']} 
                              validationMessage={['Email is required', 'Email is invalid']} 
                              value={email}
                              onChangeText={onChangeEmail}
                              ></FormTextInput>
      
                              <FormPasswordInput 
                              label="Password" 
                              placeholder="password" 
                              value={password} 
                              onChangeText={onChangePassword}
                              ></FormPasswordInput>
                      </View>

                      <FormButton label={'Continue'} onPress={handleContinue} />
                      <View marginT-100 center flex row bottom>
                          <Text style={styles.text} >Already a member ?  </Text>
                          
                          <TouchableOpacity onPress={()=> {navigation.replace(ROUTE.SIGNIN)}} >
                                  <Text style={styles.textButton}>Sign In</Text>
                          </TouchableOpacity>
                      </View>
              </View>
          </ScrollView>
      </MainContainer>
        )
      case 2:
        return (
          <MainContainer>
              <ScrollView>
                  <View flex paddingH-25 paddingT-120 colourText>
                      <Text colourText text20>Welcome</Text>
                          <View useSafeArea marginV-10>
                                  <FormTextInput
                                    label={'Name'}
                                    placeholder="Insert your name"
                                    enableErrors={true}
                                    validate={['required']}
                                    validationMessage={['Name is required']}
                                    value={name}
                                    onChangeText={onChangeName} 
                                  ></FormTextInput>
          
                                  <FormTextInput label={'Location'} 
                                  placeholder="Insert your location"
                                  validate={['required']}
                                  enableErrors={true}
                                  validationMessage={['Location is required']} 
                                  value={location}
                                  onChangeText={onChangeLocation}
                                  ></FormTextInput>
                          </View>
                          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                          <FormButton label={'Back'} onPress={handleBack} />
                          <FormButton label={'Join'} onPress={onPostSignUp} />
                          </View>
                          <View marginT-100 center flex row bottom>
                              <Text style={styles.text} >Already a member ?  </Text>
                              
                              <TouchableOpacity onPress={()=> {navigation.replace(ROUTE.SIGNIN)}} >
                                      <Text style={styles.textButton}>Sign In</Text>
                              </TouchableOpacity>
                          </View>
                  </View>
              </ScrollView>
          </MainContainer>
        )
    
      default:
        break;
    }


  
}

const styling = (theme) => ( StyleSheet.create({
  // TextField field styling
  withUnderline: {
      borderBottomWidth: 1,
      borderColor: Colors.$outlineDisabledHeavy,
      paddingBottom: 4
  },
  withFrame: {
      borderWidth: 1,
      borderColor: Colors.$outlineDisabledHeavy,
      padding: 16,
      borderRadius: 8,
      marginBottom: 24,
  },
  // TextField label styling
  labelStyle: {
      paddingLeft: 16,
      paddingBottom: 8,
      fontSize: 14,
  },
  textButton:{
      color:'white',
      fontSize: 14,
      fontWeight:'bold'
  },
  text:{
      color:'white',
      fontSize: 14,
  }
}))

export default SignUp