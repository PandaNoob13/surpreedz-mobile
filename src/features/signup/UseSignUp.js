import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { acc } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import ModalAlert from '../../shared/components/ModalAlert';
import { ROUTE } from '../../shared/constants';
import useAuth from '../../shared/hook/UseAuth';
import useDependency from '../../shared/hook/UseDependency';
import useViewState from '../../shared/hook/UseViewState';
import useSignIn from '../signin/UseSignIn';


const UseSignUp = () => {
    const navigation = useNavigation();
    const {viewState, setLoading, setError} = useViewState();
    const {onPostSignIn} = useSignIn();
    const {signUpService} = useDependency();
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [location, onChangeLocation] = useState('');
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer);
    const [alertShow, setAlertShow] = useState({
        signUpFailed: false,
        signUpPayment: false,
        signUp: false,
    })

    const onPostSignUp = async () => {
        Keyboard.dismiss();
        setLoading();
        console.log('addOrderDataResult di useSignUp 1', addOrderDataResult);
        try {
            const response = await signUpService.postSignUp({
                email: email,
                password: password,
                name: name,
                location: location,
                photo_link: "",
                is_deleted: false
            })
            // console.log('response useSignUp => ', response);
            console.log('SIGN UP SUCCESS');
            const account = response.account
            if (response) {
                console.log('addOrderDataResult di useSignUp', addOrderDataResult);
                if (addOrderDataResult) {
                    // Alert.alert('Sign Up Success','');
                    // onPostSignIn(email,password);
                    setAlertShow({signUpPayment: true})
                }else{
                    console.log('email useSignUp', email);
                    console.log('password useSignUp', password);
                    setAlertShow({signUp: true})
                    // Alert.alert('Sign Up Success', 'Welcome to Surpreedz !',[
                    //     {
                    //       text:'Sign In',
                    //       onPress:  () => onPostSignIn(email,password),
                    //     },
                    //     {
                    //       text:'Cancel',
                    //       onPress: () => navigation.replace(ROUTE.MAIN),
                    //     }
                    //   ])
                }
            }
        } catch (error) {
            console.log('error useSign Up', error);
            // Alert.alert('Sign Up Failed','Something wrong')
            setAlertShow({signUpFailed: true})
        }
    }

    return {
        viewState,email,password,name,location,alertShow,onChangeEmail,onChangePassword,onChangeLocation,onChangeName,onPostSignUp,onPostSignIn,setAlertShow
    }

}

export default UseSignUp