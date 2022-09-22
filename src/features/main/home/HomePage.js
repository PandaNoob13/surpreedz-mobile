import { View, Text ,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../../shared/context/ThemeContext';
import MainContainer from '../../../shared/components/MainContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTE } from '../../../shared/constants';
import HeaderPageLabel from '../../../shared/components/HeaderPageLabel';
import ServiceCard from '../../../shared/components/ServiceCard';
import FormButton from '../../../shared/components/FormButton';
import useHomePage from './UseHomePage';
import {useSelector} from 'react-redux';


const HomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const route = useRoute();
    const {posts, onGetService, isLoading} = useHomePage();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)


    useEffect(()=>{
      onGetService();
      // console.log('posts',posts);
      console.log('AddorderResult Home Page => ', addOrderDataResult);
    },[])

  return (
    <MainContainer>
      <HeaderPageLabel > 
          <TouchableOpacity onPress={()=>{navigation.navigate(ROUTE.ABOUT,{
            prevPage:route.name
          })}}>
            <Text style={styles.textTitle}>How Surpreedz Works</Text>
          </TouchableOpacity>
      </HeaderPageLabel>

      <ScrollView>
        <View>
        {posts ? posts.map((account) => {
              const data = account.account
              // console.log('data',data);
              // console.log('data.ServiceDetail.id',data.ServiceDetail.id);
              if(data.ServiceDetail.id !== 0){
                return ( <ServiceCard data={data} pic={account.data_url} date={account.string_join_date} />)
            }
        }):
         <Text style={styles.textTitle}>Empty Data</Text> }
        
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