import { Alert, Keyboard } from 'react-native'
import  { useEffect, useState } from 'react'
import useViewState from '../../shared/hook/UseViewState';
import useAuth from '../../shared/hook/UseAuth';
import { ROUTE } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import ModalAlert from '../../shared/components/ModalAlert';

const useSignIn = () => {
    const [email,onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('')
    const {viewState, setLoading, setError} = useViewState();
    const {onLogin} = useAuth();
    const navigation = useNavigation();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer);
    const dispatch = useDispatch();
    const [alertShow, setAlertShow] = useState({
        signInFailed: false,
        signInPayment: false,
        signIn: false,
    })

    const onPostSignIn = async (emailUser ,passwordUser) => {
        Keyboard.dismiss();
        setLoading();
        try {
            const response = await onLogin({email: emailUser,password: passwordUser })

            console.log('Response Login',response);
            if (response) {
                console.log('SIGN IN SUCCESS');
                if (addOrderDataResult) {
                    console.log('orderData 1 ', addOrderDataResult);
                    // Alert.alert('Sign In Success',`Have fun on Surpreedz ! \n Please complete your transaction`)
                    
                    // navigation.replace(ROUTE.PAYMENT)
                    setAlertShow({signInPayment: true})
                } else {
                    console.log('Order Data tidak ada', addOrderDataResult);
                    // Alert.alert('Sign In Success',`Have fun on Surpreedz`);
                    
                    setAlertShow({signIn: true})
                }
            }            
        } catch (error) {
            setError(error)
            console.log('eror => ', error);
            // Alert.alert('Sign In Failed','Wrong Email or Password !')
            setAlertShow({signInFailed: true})
        }
    }
    console.log(alertShow);
    return {viewState, email, password, alertShow, setAlertShow, onChangeEmail, onChangePassword, onPostSignIn}
  
}

export default useSignIn