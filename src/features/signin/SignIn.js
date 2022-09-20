import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View,Text, Colors, Keyboard} from 'react-native-ui-lib';
import FormButton from '../../shared/components/FormButton';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { ROUTE } from '../../shared/constants';
import { useTheme } from '../../shared/context/ThemeContext';
import useSignIn from './UseSignIn';

const KeyboardTrackingView = Keyboard.KeyboardTrackingView;

const SignIn = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {viewState, 
        email, 
        password, 
        onChangeEmail, 
        onChangePassword, 
        onPostSignIn} = useSignIn();
    const navigation = useNavigation();

    return (
        <MainContainer>
            <ScrollView contentContainerStyle={[styles.container, {marginHorizontal: 25}]}>
                <Text colourTextPrimary text20 marginV-10>Welcome Back</Text>
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
                <FormButton onPress={onPostSignIn} label="Continue"/>
                <View center row marginT-60>
                    <Text style={styles.text} >Not a member yet ?  </Text>
                    <TouchableOpacity onPress={()=> {navigation.replace(ROUTE.SIGNUP)}} >
                            <Text style={styles.textButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </MainContainer>
    );
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
    },
    container: {
        // backgroundColor: "#7CA1B4",
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
}))

export default SignIn