import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import FormTextInput from './FormTextInput';

const OrderDetailInfo = () => {
    const theme = useTheme();
    const styles = styling(theme)

  return (
    <ScrollView >
        <FormTextInput editable={false} label={'Recepient name:'} value={'Novita Eka Widyastuti'}></FormTextInput>
        <FormTextInput editable={false} label={'Message:'} value={'Selamattttt yaagggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg \nSelamattttt yaa\nSelamattttt yaa\nSelamattttt yaa\nSelamattttt yaa'} multiline ></FormTextInput>
        <FormTextInput editable={false} label={'Description'} value={'She loves banaan'} multiline></FormTextInput>
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