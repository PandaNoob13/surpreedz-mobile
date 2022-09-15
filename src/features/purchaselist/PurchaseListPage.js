import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { useTheme } from '../../shared/context/ThemeContext';

const PurchaseListPage = () => {
    const theme = useTheme();
    const styles = styling(theme)

  return (
    <View>
      <Text>PurchaseListPage</Text>
    </View>
  )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default PurchaseListPage