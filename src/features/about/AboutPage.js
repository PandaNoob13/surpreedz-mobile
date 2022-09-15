import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { useTheme } from '../../shared/context/ThemeContext';

const AboutPage = () => {
    const theme = useTheme();
    const styles = styling(theme)

  return (
    <View>
      <Text>AboutPage</Text>
    </View>
  )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default AboutPage