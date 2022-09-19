import { createStackNavigator } from "@react-navigation/stack"
import { useEffect, useState } from "react";
import { View } from "react-native";
import MainPage from "../features/main/MainPage";
import OrderPage from "../features/orderpage/OrderPage";
import PurchaseConfirmation from "../features/purchaseConfirmation/PurchaseConfirmation";
import SignIn from "../features/signin/SignIn";
import SignUp from "../features/signup/SignUp";
import WelcomePage from "../features/welcome/WelcomePage";
import { ROUTE } from "../shared/constants";
import useAuth from "../shared/hook/UseAuth";
import { Ionicons } from '@expo/vector-icons';
import AboutPage from "../features/about/AboutPage";




const Stack = createStackNavigator();
const AppRouter = () => {
   
  return (
    <Stack.Navigator initialRouteName={ROUTE.MAIN} >
        <Stack.Group screenOptions={{headerShown:false}}>
            <Stack.Screen name={ROUTE.WELCOME} component={WelcomePage}></Stack.Screen>
            <Stack.Screen name={ROUTE.SIGNIN} component={SignIn} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} ></Stack.Screen>
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} /> 
        </Stack.Group>

        <Stack.Screen name={ROUTE.ORDER} component={OrderPage} options={{headerTitle:'',headerStyle: {
            backgroundColor: '#000000',
          }, headerBackImage: ()=> <Ionicons name="ios-caret-back" size={40} color="white" />}} /> 
          
        <Stack.Screen name={ROUTE.PAYMENT} component={PurchaseConfirmation} options={{headerTitle:'',headerStyle: {
            backgroundColor: '#000000',
          }, headerBackImage: ()=> <Ionicons name="ios-caret-back" size={40} color="white" />}} />

        <Stack.Screen name={ROUTE.ABOUT} component={AboutPage} options={{headerTitle:'',headerStyle: {
            backgroundColor: '#000000',
          }, headerBackImage: ()=> <Ionicons name="ios-caret-back" size={40} color="white" />}} />
    </Stack.Navigator>
  )
 
}

export default AppRouter