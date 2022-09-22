import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import FormTextInput from './FormTextInput';

const OrderDetailInfo = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    const data = props.data

  return (
    <ScrollView >
        {/* <Text> Order request from : </Text> */}
        <FormTextInput editable={false} label={'Recepient name:'} value={data.orderRequest.recipient_name}></FormTextInput>
        <FormTextInput editable={false} label={'Message:'} value={data.orderRequest.message} multiline ></FormTextInput>
        <FormTextInput editable={false} label={'Description'} value={data.orderRequest.description} multiline></FormTextInput>
    </ScrollView>
  )
}

const styling = (theme) => ( StyleSheet.create({
    textStyle :{
        fontSize:15,
        color: '#ffffff',
     },
     infoContainer:{
        backgroundColor:'#000000',
        borderRadius:8,
        padding: 8,
        minHeight:50

     }
  }))

export default OrderDetailInfo