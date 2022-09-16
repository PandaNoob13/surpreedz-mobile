import {  Text, View } from 'react-native';
import SellerPage from './src/features/seller/SellerPage';
import SignIn from './src/features/signin/SignIn';
import SignUp from './src/features/signup/SignUp';
import WelcomePage from './src/features/welcome/WelcomePage';
import ServiceFactory from './src/services/ServiceFactory';
import apiClientFactory from './src/shared/ApiClientFactory';
import { clientInstance } from './src/shared/AxiosClient';
import { AuthProvider } from './src/shared/context/AuthContext';
import { DependencyProvider } from './src/shared/context/DependencyContext';
import { ThemeProvider } from './src/shared/context/ThemeContext';
import { themeRnUILib } from './src/shared/Theme-rnUILib';

themeRnUILib();

export default function App() {
  const apiClient = apiClientFactory(clientInstance);
  const services = ServiceFactory(apiClient);

  return (
    <DependencyProvider services={services}>
        <ThemeProvider>
          <AuthProvider>
            <SignIn />
            {/* <SignUp />
            <WelcomePage />
            <SellerPage /> */}

          </AuthProvider>
            
        </ThemeProvider>
   </DependencyProvider>
  
  );
}

// BASE_URL=http://192.168.0.106:8080 npm start