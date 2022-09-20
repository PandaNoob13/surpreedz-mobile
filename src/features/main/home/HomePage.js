import { View, Text ,StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native'
import React from 'react'
import { useTheme } from '../../../shared/context/ThemeContext';
import MainContainer from '../../../shared/components/MainContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTE } from '../../../shared/constants';
import HeaderPageLabel from '../../../shared/components/HeaderPageLabel';
import ServiceCard from '../../../shared/components/ServiceCard';
import FormButton from '../../../shared/components/FormButton';

const HomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <MainContainer>
        {/* <HeaderPageLabel > 
            <TouchableOpacity onPress={()=>{navigation.navigate(ROUTE.ABOUT,{
                prevPage:route.name
            })}}>
                <Text style={styles.textTitle}>How Surpreedz Works</Text>
            </TouchableOpacity>
            <Image source={require('../../../../assets/img/surpreedz-logo.png')} style={{height: 20, width:120, objectFit: "cover"}}></Image>
        </HeaderPageLabel> */}
        <ScrollView>
            <View>
            <ServiceCard></ServiceCard>
            <ServiceCard></ServiceCard>
            <ServiceCard></ServiceCard>
            </View>

            <View>
            <FormButton label="ORDER PAGE" style={{color:'white'}} onPress={()=>{
                navigation.navigate(ROUTE.ORDER,{
                    serviceId:10,
                    nameSeller:'Ardhito',
                    locationSeller:'Bangka Belitung',
                    sinceMember:'22 September 2021',
                    prevPage: route.name
                })
                }}
            ></FormButton>
            </View>
        </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
  textTitle:{
    fontSize:15,
    color: '#ffffff',
    fontWeight:'bold',
    marginRight:8
},
}))

export default HomePage