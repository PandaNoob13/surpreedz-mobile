import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTE } from '../shared/constants';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomePage from '../features/main/home/HomePage';
import SellerPage from '../features/seller/SellerPage';
import PurchaseListPage from '../features/purchaselist/PurchaseListPage';
import ProfilPage from '../features/profilpage/ProfilPage';
import useAuth from '../shared/hook/UseAuth';
import { useEffect, useState } from 'react';
import SignIn from '../features/signin/SignIn';

const Tab = createBottomTabNavigator();

const HomeRouter = () => {
    const {isTokenExist} = useAuth();
    const [login, setLogin] = useState(false)

    useEffect(()=> {
      const onValidToken = async ()=>{
            try {
              const resp = await isTokenExist();
              if (resp) {
                setLogin(true)
              } else {
                setLogin(false)
              }
            } catch (e) {
              console.log('error from Home Router',e);
              setLogin(false)
            }
          }
          onValidToken();
    },[])


  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color,size}) => {
            switch (route.name) {
                case ROUTE.HOME:
                  return <AntDesign name="home" size={24} color={color} />
                case ROUTE.SELLER:
                  return <SimpleLineIcons name="handbag" size={24} color={color} />
                case ROUTE.BUYER:
                  return  <AntDesign name="shoppingcart" size={24} color={color} />
                case ROUTE.PROFIL:
                  return <FontAwesome name="user-o" size={24} color={color} />
                default:
                return <AntDesign name="home" size={24} color={color} />
            }
        },
        tabBarActiveTintColor:'#FFFFFF',
        tabBarInactiveTintColor:'#ACACAC',
        tabBarStyle: {
            backgroundColor: "#000000"
        }
    })} >
       
            {/* <Tab.Screen name={ROUTE.HOME} component={HomePage} options={{headerTitle:'How Surpreedz Works',headerStyle: {
            backgroundColor: '#000000',
          }, headerTitleStyle:{
            color: '#ffffff',
            fontSize:15,
            marginLeft:170
          }}} 
          /> */}

          <Tab.Screen name={ROUTE.HOME} component={HomePage} options={{headerShown: false}}/>

          { login ? 
          <Tab.Group>
            <Tab.Screen name={ROUTE.SELLER} component={SellerPage} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.BUYER} component={PurchaseListPage} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.PROFIL} component={ProfilPage} options={{headerShown: false}} />
          </Tab.Group> 
          :
          <Tab.Group>
            <Tab.Screen name={ROUTE.SELLER} component={SignIn} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.BUYER} component={SignIn} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.PROFIL} component={SignIn} options={{headerShown: false}} />
          </Tab.Group>
          }
            
     
        

    </Tab.Navigator>
  )
}

export default HomeRouter