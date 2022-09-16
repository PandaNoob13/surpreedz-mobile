
import { StyleSheet, TouchableOpacity } from 'react-native';
import {View,Text, Button, Colors} from 'react-native-ui-lib';
// import FormButton from '../../shared/components/FormButton';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { useTheme } from '../../shared/context/ThemeContext';
import useSignIn from './UseSignIn';
// const { TextField } = Incubator;

const SignIn = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {viewState, 
        email, 
        password, 
        onChangeEmail, 
        onChangePassword, 
        onPostSignIn} = useSignIn();

    return (
        <MainContainer>
            <View flex paddingH-25 paddingT-120 colourText>
                <Text colourText text20>Welcome</Text>
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
                
                <View marginT-100 center >
                    
                    <Button onPress={onPostSignIn} text70 white background-orange30 label="Login"/>
                       
                    {/* <Button link text70 orange30 label="Sign Up" marginT-20/> */}
                </View>
            </View>
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
        color:'white'
    }
}))

export default SignIn