
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {View,Text, Button, Colors, Keyboard} from 'react-native-ui-lib';
import FormButton from '../../shared/components/FormButton';
// import FormButton from '../../shared/components/FormButton';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { ROUTE } from '../../shared/constants';
import { useTheme } from '../../shared/context/ThemeContext';
import useSignIn from './UseSignIn';
// const { TextField } = Incubator;

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
            <ScrollView>
                <View flex paddingH-25 paddingT-120 colourText>
                    <Text colourText text20>Welcome Back</Text>
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
                        <View marginT-100 center flex row bottom>
                            <Text style={styles.text} >Not a member yet ?  </Text>
                            
                            <TouchableOpacity onPress={()=> {navigation.replace(ROUTE.SIGNUP)}} >
                                    <Text style={styles.textButton}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
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
    }
}))

export default SignIn