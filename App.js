import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import { setupStore } from './src/store';
import {Provider} from "react-redux"

themeRnUILib();
NavigationBar.setBackgroundColorAsync("black");

export default function App() {
  const apiClient = apiClientFactory(clientInstance);
  const services = ServiceFactory(apiClient);
  const store = setupStore();
  const fonts = useAppFont();
  if (!fonts) {
    return null;
  }

  return (
    <Provider store={store}>
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
   </Provider>
  
  );
}

// BASE_URL=http://192.168.0.106:8080 npm start