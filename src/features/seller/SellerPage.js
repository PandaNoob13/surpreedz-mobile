import { View, Text ,StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import CardContainer from '../../shared/components/CardContainer';
import RequestCard from '../../shared/components/RequestCard';
import ModalDialog from '../../shared/components/ModalDialog';
import FormTextInput from '../../shared/components/FormTextInput';
import OrderDetailInfo from '../../shared/components/OrderDetailInfo';

const SellerPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)
    // const [modalDetailOrder, setModalDetailOrder] = useState(false)


  return (
    <MainContainer>
       {modalVisible && 
        <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Your Service`} children={
          <CardContainer>
              <View>
                  <FormTextInput label={'Role'} />
                  <FormTextInput label={'Description'} />
                  <FormTextInput label={'Price'} />
                  <FormButton label={'Submit'} />
              </View>
          </CardContainer>
      
        }
        />}

        {/* { modalDetailOrder &&
          <ModalDialog visible={modalDetailOrder} onPress={()=> setModalDetailOrder(false)} titleModal={'Order Detail'}>
              <OrderDetailInfo />
          </ModalDialog>
        } */}
        
      <View style={{margin:8}}>
          <View style={{margin:8}}>
              <FormButton label='Service'  onPress={()=> setModalVisible(true)} />
          </View>

          <View style={{margin:8}}>
              <Text style={styles.subtitle}>
                  Request List
              </Text>
              <View style = {styles.lineStyle} />
          </View>

          
          {/* <RequestCard openModalDetailOrder={()=> setModalDetailOrder(true)} /> */}
          <RequestCard />
          
      </View>
        
    </MainContainer>
  )
}

const styling = (theme) => ( StyleSheet.create({
  subtitle:{
      fontSize:15,
      color: '#ffffff',
      fontWeight:'bold'
   },
   lineStyle:{
      borderWidth: 0.5,
      borderColor:'white',
      alignItems:'flex-start',
      marginRight:16,
      marginTop:8,
      marginBottom:8
  },
  textStyle :{
      fontSize:15,
      color: '#ffffff',
   },
   requestStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 2
   }
}))

export default SellerPage