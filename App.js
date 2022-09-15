import {  Text, View } from 'react-native';
import SellerPage from './src/features/seller/SellerPage';
import SignIn from './src/features/signin/SignIn';
import SignUp from './src/features/signup/SignUp';
import WelcomePage from './src/features/welcome/WelcomePage';
import { ThemeProvider } from './src/shared/context/ThemeContext';
import { themeRnUILib } from './src/shared/Theme-rnUILib';

themeRnUILib();

export default function App() {
  return (
   <ThemeProvider>
      <SignIn />
      {/* <SignUp />
      <WelcomePage />
      <SellerPage /> */}
      
   </ThemeProvider>
  
  );
}

