import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {View,Text, Colors, Keyboard} from 'react-native-ui-lib';
import FormButton from '../../shared/components/FormButton';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { ROUTE } from '../../shared/constants';
import { useTheme } from '../../shared/context/ThemeContext';
import useSignIn from './UseSignIn';
import SpinnerLoading from '../../shared/components/SpinnerLoading';
import ModalAlert from '../../shared/components/ModalAlert';

const KeyboardTrackingView = Keyboard.KeyboardTrackingView;

const SignIn = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const {viewState, 
        email, 
        password,
        alertShow,
        setAlertShow,
        onChangeEmail, 
        onChangePassword, 
        onPostSignIn,
        loading} = useSignIn();
    const navigation = useNavigation();

    useEffect(() => {
        if (email === '' || password === '') {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [email, password])

    const handleSignIn = async () => {
        await onPostSignIn(email,password);
    }

    const handleAlert = () => {
        if (alertShow.signIn) {
            setAlertShow(false,false,false)
            navigation.replace(ROUTE.MAIN)
        } else if (alertShow.signInPayment) {
            setAlertShow(false,false,false)
            navigation.replace(ROUTE.PAYMENT)
        } else {
            setAlertShow(false,false,false)
        }
    }

    return (
        <MainContainer mainPage>
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
                    autoCapitalize='none'
                    ></FormTextInput>

                    <FormPasswordInput 
                    label="Password" 
                    placeholder="password" 
                    value={password} 
                    onChangeText={onChangePassword}
                    ></FormPasswordInput>
                
                </View>
                {(alertShow.signIn) &&
                <>
                    <ModalAlert visible={alertShow.signIn} onPress={() => handleAlert()} success title={'Sign In Success'} subtitle={`Have fun on Surpreedz !`}/>
                </>
                }
                {alertShow.signInFailed &&
                    <ModalAlert visible={alertShow.signInFailed} onPress={() => handleAlert()} error title={'Sign In Failed'} subtitle={'Wrong Email or Password !'}/>
                }
                {alertShow.signInPayment &&
                <>
                    <ModalAlert visible={alertShow.signInPayment} onPress={() => handleAlert()} success title={'Sign In Success'} subtitle={`Have fun on Surpreedz !\nPlease complete your transaction`}/>
                </>
                }
                <FormButton disabled={buttonDisabled} onPress={handleSignIn} label="Continue"/>
                <View center row marginT-60>
                    <Text style={styles.text} >Not a member yet ?  </Text>
                    <TouchableOpacity onPress={()=> {navigation.replace(ROUTE.SIGNUP)}} >
                            <Text style={styles.textButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {loading ? <SpinnerLoading onShowSpinner={loading} /> : <></>}
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