import { View, Text ,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import { useRoute } from '@react-navigation/native';

const AboutPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const route = useRoute();
    const [aboutParams, setAboutParams] = useState({})


    useEffect(()=>{
      if (route.params?.prevPage ) {
          setAboutParams({
              prevPage: route.params.prevPage

          })
      }
    },[route.params])

  return (
    <MainContainer>
        <View>
           <Text>AboutPage</Text>
        </View>
    </MainContainer>
  
  )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default AboutPage