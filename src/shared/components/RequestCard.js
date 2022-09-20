import { View, Text,StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardContainer from './CardContainer'
import FormButton from './FormButton'
import { useTheme } from '../context/ThemeContext'
import ModalDialog from './ModalDialog'
import OrderDetailInfo from './OrderDetailInfo'
import useRequestList from '../../features/seller/hookSeller/UseRequestList'
import moment from 'moment'

const RequestCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoData, setVideoData] = useState({});
    const [buttonDisable, setButtonDisable] = useState(true);
    const {onPostService, onPostVideoResult, isLoading} = useRequestList();
    const data = props.data;
    const dueDate = data.dueDate;
    const orderRequest = data.orderRequest;

    useEffect(()=>{
        if (Object.keys(videoData).length != 0) {
            setButtonDisable(false)
        }
    },[videoData])

    useEffect(()=>{}, [buttonDisable])

    const handleSubmit = (value) => {
        if (value == 'Accept'){
           onPostService(data.orderId, "On progress")
        } else if (value == 'Reject'){
           onPostService(data.orderId, "Rejected")
        } else if (value == 'Submit') {
           console.log("Url video : ", videoData.dataUrl);
           onPostService(data.orderId, "Submitted")
           onPostVideoResult(data.orderId, videoData.dataUrl)
        }
        props.callback()
     }
  
     const StatusCondition = (status) => {
        if (status == 'Waiting for confirmation') {
            return (
                <View style={{flexDirection:'row',justifyContent:'center', margin:8}}>
                    <View style={{marginRight:8}}>
                        <FormButton label='Accept' onPress={()=>handleSubmit('Accept')} />
                    </View>
                    <View style={{marginLeft:8}}>
                        <FormButton label='Reject' onPress={()=>handleSubmit('Reject')} />
                    </View>
                </View>
            )
        } else if(status == 'On progress'){
            return(
                <View style={{margin:8}}>
                    <View style={{marginBottom:8, alignSelf:'flex-start'}}>
                        <Button title='Input Video' />
                    </View>
                    <View style={{marginTop:8,width:'50%',alignSelf:'center'}}>
                        <FormButton label={'Submit Video'} />
                    </View>
                </View>
            )
        } else{
            return (
                <View></View>
            )
        }
     }

  return (
    <View style={{marginBottom:16}}>
        {modalVisible && 
            <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Order Detail`}>
                <OrderDetailInfo  data={{
                                    orderRequest: data.orderRequest,
                                    buyerName: data.name
                                 }} />
            </ModalDialog>}
        <CardContainer>
            <Text style={styles.textStyle}>{data.occasion}</Text>

            <View style={styles.requestStyle}>
                <Text style={styles.textStyle}>Message for</Text>
                <Text style={styles.textStyle}>{orderRequest.recipient_name}</Text>
            </View>

            <View style={styles.requestStyle}>
                <View>
                    <Text style={styles.textStyle}>Due Date</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>{moment({dueDate}).format("MMMM Do YYYY")}</Text>
                </View>
                
            </View>

            <View style={{width:100, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                {/* <FormButton label='Detail' onPress={openModalDetailOrder} /> */}

            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={styles.textStyle}>Status : </Text>
                <Text style={styles.textStyle}>{data.status}</Text>
            </View>


            <View>
                {StatusCondition(data.status)}
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
      marginTop: 4
     }
  }))

export default RequestCard