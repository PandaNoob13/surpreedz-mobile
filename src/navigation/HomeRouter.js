import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTE } from '../shared/constants';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomePage from '../features/main/home/HomePage';
import SellerPage from '../features/seller/SellerPage';
import PurchaseListPage from '../features/purchaselist/PurchaseListPage';
import ProfilPage from '../features/profilpage/ProfilPage';

const Tab = createBottomTabNavigator();

const HomeRouter = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color,size}) => {
            switch (route.name) {
                case ROUTE.HOME:
                  return <AntDesign name="home" size={24} color="black" />
                case ROUTE.SELLER:
                  return <SimpleLineIcons name="handbag" size={24} color="black" />
                case ROUTE.BUYER:
                  return  <AntDesign name="shoppingcart" size={24} color="black" />
                case ROUTE.PROFIL:
                  return <FontAwesome name="user-o" size={24} color="black" />
                default:
                return <AntDesign name="home" size={24} color="black" />
            }
        },
        tabBarActiveTintColor:'rgb(252,80,40)',
        tabBarInactiveTintColor:'rgb(92,93,95)',
    })}>
       
            <Tab.Screen name={ROUTE.HOME} component={HomePage} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.SELLER} component={SellerPage} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.BUYER} component={PurchaseListPage} options={{headerShown: false}} />
            <Tab.Screen name={ROUTE.PROFIL} component={ProfilPage} options={{headerShown: false}} />
     
        

    </Tab.Navigator>
  )
}

export default HomeRouter