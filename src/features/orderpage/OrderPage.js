import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import ProfileCard from '../../shared/components/ProfileCard';
import { useRoute } from '@react-navigation/native';
import FormButton from '../../shared/components/FormButton';
import UseOrderPage from './UseOrderPage';
import PersonalisedMessageCard from '../../shared/components/PersonalisedMessageCard';
import OccasionCard from '../../shared/components/Occasion/OccasionCard';

const OrderPage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const route = useRoute();
    const {occasion, onChangeOccasion,recipient, onChangeRecipient,message, onChangeMessage,description, onChangeDescription} = UseOrderPage();
    const [orderParam, setOrderParam] = useState({});

    const [dataSeller,setDataSeller] = useState('');

    useEffect(()=>{
            setDataSeller({
                name:orderParam.nameSeller,
                location: orderParam.locationSeller,
                joinDate:orderParam.sinceMember,
                dataUrl:'https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg',
              })
            console.log('orderParam.nameSeller', orderParam.nameSeller);
            console.log('orderParam.locationSeller', orderParam.locationSeller);
        },[orderParam])


    useEffect(()=>{
      if (route.params?.serviceId && route.params?.prevPage && route.params?.nameSeller && route.params?.locationSeller && route.params?.sinceMember ) {
          setOrderParam({
              serviceId: route.params.serviceId,
              nameSeller: route.params.nameSeller,
              locationSeller: route.params.locationSeller,
              sinceMember: route.params.sinceMember,
              prevPage: route.params.prevPage

          })
      }
    },[route.params])

  return (
    <MainContainer>
        <ScrollView style={{paddingHorizontal: 16}}>
            <ProfileCard 
               data={dataSeller}
                style={{marginVertical: 4}}
            />

            <OccasionCard occasion={occasion} onPress={onChangeOccasion} orderParam={orderParam}></OccasionCard>

            <PersonalisedMessageCard onChangeRecipient={onChangeRecipient} onChangeMessage={onChangeMessage} onChangeDescription={onChangeDescription} recipient={recipient} message={message} description={description} orderParam={orderParam} ></PersonalisedMessageCard>

            <View style={{margin: 8, marginBottom:16}}>
                <FormButton label={`Send Request`} />
            </View>


        </ScrollView>
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
   subtitle:{
    textAlign:'center',
    fontSize:15,
    color: '#ffffff',
    fontWeight:'bold',
    marginBottom: 8,
   },
}))

export default OrderPage