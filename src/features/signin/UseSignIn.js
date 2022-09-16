import { Keyboard } from 'react-native'
import  { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
import useViewState from '../../shared/hook/UseViewState';
import useAuth from '../../shared/hook/UseAuth';

const useSignIn = () => {
    // const navigation = useNavigation();
    const [email,onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('')
    const {viewState, setLoading, setError} = useViewState();
    const {onLogin} = useAuth();


    const onPostSignIn = async () => {
        Keyboard.dismiss();
        setLoading();
        try {
            if (email === '' && password === '') {
                throw new Error('Please input your user name and password');
            } else {
                const response = await onLogin({email: email,password: password })

                console.log('Response Login',response);
                if (response) {
                    // navigation.replace(ROUTE.HOME)
                    console.log('SIGN IN SUCCESS');
                } else {
                    setError(new Error('Unauthorized'));
                    console.log('error Unauthorized');
                }
            }
        } catch (error) {
            setError(error)
            console.log('eror => ', error);

        }
    }

    return {viewState, email, password, onChangeEmail, onChangePassword, onPostSignIn}
  
}

export default useSignIn