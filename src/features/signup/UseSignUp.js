import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { ROUTE } from '../../shared/constants';
import useAuth from '../../shared/hook/UseAuth';
import useDependency from '../../shared/hook/UseDependency';
import useViewState from '../../shared/hook/UseViewState';


const UseSignUp = () => {
    const navigation = useNavigation();
    const {viewState, setLoading, setError} = useViewState();
    const {onLogin} = useAuth();
    const {signUpService} = useDependency();
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [location, onChangeLocation] = useState('')

    const onPostSignUp = async () => {
        Keyboard.dismiss();
        setLoading();
        try {
            const response = await signUpService.postSignUp({
                email: email,
                password: password,
                name: name,
                location: location,
                photo_link: "",
                is_deleted: false
            })
            console.log('response useSignUp => ', response);
            console.log('SIGN UP SUCCESS');
            const response2 = await onLogin({
                email: email,
                password: password
            })
            if (response2) {
                console.log('SIGN IN SUCCESS');
                navigation.replace(ROUTE.MAIN)
            } else {
                setError(new Error('Unauthorized'));
                console.log('error Unauthorized');
            }
        } catch (error) {
            console.log('error useSign Up', error);
        }
    }

    return {
        viewState,email,password,name,location,onChangeEmail,onChangePassword,onChangeLocation,onChangeName,onPostSignUp
    }

}

export default UseSignUp