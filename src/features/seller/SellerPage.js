import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';

const SellerPage = () => {
    const theme = useTheme();
    const styles = styling(theme)

  return (
    <MainContainer>
        <View>
          <Text>SellerPage</Text>
        </View>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default SellerPage