import { NavigationContainer } from '@react-navigation/native';
import {  Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SellerPage from './src/features/seller/SellerPage';
import SignIn from './src/features/signin/SignIn';
import SignUp from './src/features/signup/SignUp';
import WelcomePage from './src/features/welcome/WelcomePage';
import AppRouter from './src/navigation/AppRouter';
import ServiceFactory from './src/services/ServiceFactory';
import apiClientFactory from './src/shared/ApiClientFactory';
import { clientInstance } from './src/shared/AxiosClient';
import { AuthProvider } from './src/shared/context/AuthContext';
import { DependencyProvider } from './src/shared/context/DependencyContext';
import { ThemeProvider } from './src/shared/context/ThemeContext';
import { themeRnUILib } from './src/shared/Theme-rnUILib';
import useAppFont from "./src/shared/hook/UseAppFont";
import * as NavigationBar from 'expo-navigation-bar';

themeRnUILib();
NavigationBar.setBackgroundColorAsync("black");

export default function App() {
  const apiClient = apiClientFactory(clientInstance);
  const services = ServiceFactory(apiClient);
  const fonts = useAppFont();
  if (!fonts) {
    return null;
  }

  return (
    <DependencyProvider services={services}>
      <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <AuthProvider>
                        <AppRouter />

                    </AuthProvider>
                </NavigationContainer>
                
            </ThemeProvider>
        </SafeAreaProvider>
   </DependencyProvider>
  
  );
}

// BASE_URL=http://192.168.0.106:8080 npm start