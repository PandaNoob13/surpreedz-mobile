import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import CardContainer from './CardContainer';

const OrderDetailInfo = () => {
    const theme = useTheme();
    const styles = styling(theme)

  return (
    <CardContainer>
        <View>
            <Text style={styles.textStyle}>Recepient name :</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.textStyle}>Novita Eka Widyastuti</Text>
            </View>
        </View>

        <View>
            <Text style={styles.textStyle}>Message :</Text>
            <View style={[styles.infoContainer,{minHeight: 100}]}>
                <Text style={styles.textStyle}>Selamattttt yaa</Text>
            </View>
        </View>

        <View>
            <Text style={styles.textStyle}>Personal :</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.textStyle}>Your Friend</Text>
            </View>
        </View>
    </CardContainer>
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