import React from 'react'
import { StyleSheet } from 'react-native';
import {View, Incubator, Text, Button, Colors} from 'react-native-ui-lib';
import AppBackground from '../../shared/components/AppBackground';
import FormButton from '../../shared/components/FormButton';
import FormPasswordInput from '../../shared/components/FormPasswordInput';
import FormTextInput from '../../shared/components/FormTextInput';
import MainContainer from '../../shared/components/MainContainer';
import { useTheme } from '../../shared/context/ThemeContext';
const { TextField } = Incubator;

const SignIn = () => {
    const theme = useTheme();
    const styles = styling(theme)

    return (
        <MainContainer>
            {/* <AppBackground> */}
                <View flex paddingH-25 paddingT-120 colourText useSafeArea>
                    <Text colourText text20>Welcome</Text>
                    <View marginV-10 useSafeArea>
                        <FormTextInput label={'Email'} placeholder="youremail@sample.com" enableErrors={true} validate={['required', 'email']} validationMessage={['Email is required', 'Email is invalid']}></FormTextInput>
                        <FormPasswordInput label="Password" placeholder="password"></FormPasswordInput>
                    </View>
                    
                    <View marginT-100 useSafeArea>
                        <FormButton label={'login'}></FormButton>
                        <View row center>
                            <Text margin-4 colourText>Not a member yet ?</Text>
                            <Button margin-4 link colourText text80 labelStyle={{fontWeight: '700'}} label="Sign Up"/>
                        </View>
                    </View>
                </View>
            {/* </AppBackground> */}
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
    }
}))

export default SignIn