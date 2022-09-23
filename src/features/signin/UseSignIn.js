import { Keyboard } from 'react-native'
import  { useEffect, useState } from 'react'
import useViewState from '../../shared/hook/UseViewState';
import useAuth from '../../shared/hook/UseAuth';
import { ROUTE } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';

const useSignIn = () => {
    const [email,onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('')
    const {viewState, setLoading, setError} = useViewState();
    const {onLogin} = useAuth();
    const navigation = useNavigation();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer);
    const dispatch = useDispatch();



    const onPostSignIn = async () => {
        Keyboard.dismiss();
        setLoading();
        try {
            if (email === '' || password === '') {
                throw new Error('Please input your user name and password');
            } else {
                const response = await onLogin({email: email,password: password })

                console.log('Response Login',response);
                if (response) {
                    console.log('SIGN IN SUCCESS');
                    if (addOrderDataResult) {
                        console.log('orderData 1 ', addOrderDataResult);
                        navigation.replace(ROUTE.PAYMENT)
                    } else {
                        console.log('Order Data tidak ada', addOrderDataResult);
                        navigation.replace(ROUTE.MAIN)
                    }
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

    return {viewState, email, password, buttonDisabled, onChangeEmail, onChangePassword, onPostSignIn}
  
}

export default useSignIn