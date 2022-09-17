import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useTheme } from '../../../shared/context/ThemeContext';
import MainContainer from '../../../shared/components/MainContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTE } from '../../../shared/constants';

const HomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const route = useRoute();

  return (
    <MainContainer>
        <View>
          <Text>HomePage</Text>
        </View>

        <View>
          <TouchableOpacity onPress={()=>{
            navigation.navigate(ROUTE.ORDER,{
                serviceId:10,
                nameSeller:'Ardhito',
                locationSeller:'Bangka Belitung',
                sinceMember:'22 September 2021',
                prevPage: route.name
            })
            }}>
              <Text style={{color:'white'}}>ORDER PAGE</Text>
          </TouchableOpacity>
        </View>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default HomePage