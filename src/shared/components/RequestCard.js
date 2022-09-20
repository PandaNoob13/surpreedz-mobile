import { View, Text,StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import CardContainer from './CardContainer'
import FormButton from './FormButton'
import { useTheme } from '../context/ThemeContext'
import ModalDialog from './ModalDialog'
import OrderDetailInfo from './OrderDetailInfo'

const RequestCard = () => {
// const RequestCard = ({openModalDetailOrder}) => {

    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)


  return (
    <View>
        {modalVisible && 
            <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Order Detail`} modalHeight={'70%'} >
                <OrderDetailInfo />
            </ModalDialog>}
        <CardContainer>
            <Text style={styles.textStyle}>Occasion</Text>

            <View style={styles.requestStyle}>
                <Text style={styles.textStyle}>Message for</Text>
                <Text style={styles.textStyle}>Novita Eka Widyastuti</Text>
            </View>

            <View style={styles.requestStyle}>
                <Text style={styles.textStyle}>Due Date</Text>
                <Text style={styles.textStyle}>22 September 2022</Text>
            </View>

            <View style={{width:100, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                {/* <FormButton label='Detail' onPress={openModalDetailOrder} /> */}

            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}>Status : </Text>
                <Text style={styles.textStyle}>On Progress</Text>
            </View>

            <View style={{width:150, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                {/* <FormButton label='Choose File' /> */}
                <Button title='Choose File' />
            </View>

            <View style={{width:200, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                <FormButton label='Submit Video' />
            </View>

        </CardContainer>
    </View>
    
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

export default RequestCard