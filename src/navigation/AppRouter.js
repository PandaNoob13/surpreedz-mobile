import { createStackNavigator } from "@react-navigation/stack"
import MainPage from "../features/main/MainPage";
import OrderPage from "../features/orderpage/OrderPage";
import PurchaseConfirmation from "../features/purchaseConfirmation/PurchaseConfirmation";
import SignIn from "../features/signin/SignIn";
import SignUp from "../features/signup/SignUp";
import WelcomePage from "../features/welcome/WelcomePage";
import { ROUTE } from "../shared/constants";
import { AntDesign } from '@expo/vector-icons';
import AboutPage from "../features/about/AboutPage";
import ProtectiveRedirectPage from "../features/ProtectiveRedirect/ProtectiveRedirect";




const Stack = createStackNavigator();
const AppRouter = () => {
   
  return (
    <Stack.Navigator initialRouteName={ROUTE.MAIN} >
        <Stack.Group screenOptions={{headerShown:false}}>
            <Stack.Screen name={ROUTE.WELCOME} component={WelcomePage}></Stack.Screen>
            <Stack.Screen name={ROUTE.SIGNIN} component={SignIn} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} ></Stack.Screen>
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} /> 
            {/* <Stack.Screen name={ROUTE.MAIN} component={ProtectiveRedirectPage} />  */}
        </Stack.Group>

        <Stack.Screen name={ROUTE.ORDER} component={OrderPage} options={{headerTitle:'New request', headerTitleStyle: {color: 'white', fontWeight: '100'}, headerTitleAlign:'center', headerShadowVisible: false, headerStyle: {
            backgroundColor: '#212121', borderColor: '#212121',
          }, headerBackImage: ()=> <AntDesign name="left" size={24} color="white" />}} /> 
          
        <Stack.Screen name={ROUTE.PAYMENT} component={PurchaseConfirmation} options={{headerTitle:'', headerTitleStyle: {color: 'white', fontWeight: '100'}, headerTitleAlign:'center', headerShadowVisible: false, headerStyle: {
            backgroundColor: '#212121', borderColor: '#212121',
          }, headerBackImage: ()=> <AntDesign name="left" size={24} color="white" />}} />

        <Stack.Screen name={ROUTE.ABOUT} component={AboutPage} options={{headerTitle:'', headerTitleStyle: {color: 'white', fontWeight: '100'}, headerTitleAlign:'center', headerShadowVisible: false, headerStyle: {
            backgroundColor: '#212121', borderColor: '#212121',
          }, headerBackImage: ()=> <AntDesign name="left" size={24} color="white" />}} />
    </Stack.Navigator>
  )
 
}

export default AppRouter