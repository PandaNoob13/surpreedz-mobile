import { View, Text,StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import CardContainer from './CardContainer';
import NumberCurrency from './CurrencyConverter';
import FormButton from './FormButton';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import OrderDetailInfo from './OrderDetailInfo';

const StatusCondition = (status, callback, orderId,callPlayVideo) => {
    const theme = useTheme();
    const styles = styling(theme)
    switch (status) {
        case "On progress":
            return (
                <View style={{flexDirection:'row'}}>
                    <Entypo name="dots-three-horizontal" size={16} color="yellow" />
                    <Text style={styles.textStyle}> Processing your video ...</Text>
                </View>
            )
        case "Rejected":
            return (
                <View style={{flexDirection:'row'}}>
                    <MaterialIcons name="error-outline" size={16} color="red" />
                    <Text style={styles.textStyle}> Sorry, it's rejected</Text>
                </View>

            )
        // case "Cancelled":
        //     return (
        //         <Text style={styles.textStyle}>CANCELLED</Text>
        //     )
        // case "Exceed":
        //     return (
        //         <Text style={styles.textStyle}>EXCEED DUE DATE</Text>
        //     )
        case "Submitted":
            return (
                <View>
                    <View style={{flexDirection:'row'}}>
                        <FontAwesome name="check-circle" size={16} color="green" />
                        <Text style={styles.textStyle}> Video is ready!</Text>
                    </View>
                    <View>
                        <View style={{margin:5}}>
                            <FormButton label={'Play'} onPress={()=>{callPlayVideo(orderId)}}>
                                <Feather name="play" size={16} color="black" />
                            </FormButton>
                        </View>
                        <View style={{margin:5}}>
                            <FormButton onPress={()=>{callback(orderId)}} label={'Download Video'}>
                                <Feather name="download-cloud" size={16} color="black" />
                            </FormButton>
                        </View>
                    </View>
                </View>
            )
        default:
            return (
                <View style={{flexDirection:'row'}}>
                    <FontAwesome5 name="comment-dots" size={16} color="yellow" />
                    <Text style={styles.textStyle}> Waiting for confirmation</Text>
                </View>
            );
            
    }
 }

const PurchasedCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme)
    const {occasion, name, price, dueDate, status, orderId, orderRequest, photoUrl} = props.data
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <CardContainer style={{marginBottom: 12}}>
            {modalVisible && 
                <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Order Detail`} >
                        <OrderDetailInfo 
                        data={{
                            orderRequest: orderRequest,
                            buyerName:name
                        }}
                        />
                </ModalDialog>
            }
            <View row>
                <View style={styles.container}>
                    <View>
                        <Image source={{uri:`data:image/jpg;base64,${photoUrl}`}} 
                        style={styles.imageStyle}
                        />
                    </View>
                    <View style={{flex:1, justifyContent: "space-between", alignItems: "center", alignSelf:'center'}}>
                        <Text style={[styles.subtitle,{textAlign:'center', flexShrink:1, flexWrap: 'wrap'}]}>{occasion} message from {name}</Text>
                        <NumberCurrency price={price} currency={"Rp"}></NumberCurrency>
                    </View>
                    <View style={{marginTop:16, marginBottom:16, alignSelf:'center'}}>
                        <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                    </View>
                </View>
                
                <View>
                    <Text text70L style={styles.textDesc}>Message for:</Text>
                    <Text style={styles.textStyle}>{orderRequest.recipient_name}</Text>
                    <Text text70L style={styles.textDesc}>Description:</Text>
                    <Text style={styles.textStyle}>{orderRequest.message}</Text>
                    <Text text70L style={styles.textDesc}>Due date:</Text>
                    <Text style={styles.textStyle}>{moment({dueDate}).format("MMMM Do YYYY")}</Text>
                </View>
                <View style={{paddingVertical: 8}}>
                    {StatusCondition(status, props.callback, orderId, props.callPlayVideo)}
                </View>
            </View>
        </CardContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
    textStyle :{
        fontSize:15,
        color: '#ffffff',
        textAlign:'left'
    },
    textDesc: {fontWeight: '400', color: 'white', opacity: 0.5},
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
    imageStyle:{
        width: 60, 
        // padding: 4, 
        height: 60, 
        objectFit: "cover", 
        borderRadius: 6
    },
    container: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        // flex: 1,
        flexDirection:'row',
        // gap: '1rem',
        // flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
 }))

export default PurchasedCard