import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import ProfileCard from '../../shared/components/ProfileCard';
import { useRoute } from '@react-navigation/native';
import CardContainer from '../../shared/components/CardContainer';
import FormTextInput from '../../shared/components/FormTextInput';
import FormButton from '../../shared/components/FormButton';

import UseOrderPage from './UseOrderPage';
import PersonalisedMessageCard from '../../shared/components/PersonalisedMessageCard';
import OccasionCard from '../../shared/components/OccasionCard';

const OrderPage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const route = useRoute();
    const {occasion, onChangeOccasion,recipient, onChangeRecipient,message, onChangeMessage,description, onChangeDescription} = UseOrderPage();
    const [orderParam, setOrderParam] = useState({});


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
        <ScrollView>
            <ProfileCard 
              imageUrl='https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg'
                name={orderParam.nameSeller} 
                location={orderParam.locationSeller} 
                memberSince={orderParam.sinceMember}
                style={{marginVertical: 4}}
            />

            {/* <CardContainer style={{marginVertical: 4}}> 
                <View>
                    <Text style={styles.subtitle}>
                            {orderParam.nameSeller} would help you with ...
                    </Text>
                </View>
            </CardContainer> */}

            <OccasionCard occasion={occasion} onPress={onChangeOccasion} orderParam={orderParam}></OccasionCard>

            <PersonalisedMessageCard onChangeRecipient={onChangeRecipient} onChangeMessage={onChangeMessage} onChangeDescription={onChangeDescription} recipient={recipient} message={message} description={description} orderParam={orderParam} ></PersonalisedMessageCard>

            {/* <CardContainer style={{marginVertical: 4}}> 
                <View>
                    <Text style={styles.subtitle}>
                          Your Personalised Message
                    </Text>
                </View>
                <View>
                    <FormTextInput 
                     label={'Who is this message for ?'}
                     value={recipient} 
                     onChangeText={onChangeRecipient}
                     />

                     <FormTextInput 
                        label={`What should ${orderParam.nameSeller} say to the person ?`}
                        value={message}
                        onChangeText={onChangeMessage}
                        multiline
                     />

                     <FormTextInput 
                     label={`What should ${orderParam.nameSeller} know about the person?`}
                     value={description} 
                     onChangeText={onChangeDescription}
                     multiline
                     />
                </View>
            </CardContainer> */}

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