import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import CardContainer from './CardContainer';
import NumberCurrency from './CurrencyConverter';
import FormButton from './FormButton';

const StatusCondition = (status, callback, orderId) => {
    const theme = useTheme();
    const styles = styling(theme)
    switch (status) {
        case "On progress":
            return (
                <Text style={styles.textStyle}>ON PROGRESS</Text>
            )
        case "Rejected":
            return (
                <Text style={styles.textStyle}>REJECTED</Text>
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
                    <Text style={styles.textStyle}>DONE</Text>
                    <View>
                        <FormButton onClick={(e) => {
                        e.preventDefault();
                        callback(orderId);
                    }}>Get Video</FormButton>
                    </View>
                </View>
            )
        default:
            return (
                <Text style={styles.textStyle}>Waiting for confirmation</Text>
            );
            
    }
 }

const PurchasedCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme)
    const {orderId='testOrdId', imageUrl = '',name='test',location='testLoc',dueDate='testDate', occasion='testOccasion', price=2000000, status="testStatus"} = props;
    const orderRequest = {
        recipient_name: "testRecip",
        message: "testMessage"
    }
    return (
        <CardContainer style={{marginBottom: 12}}>
            <View row>
                <View style={styles.container}>
                    <View>
                        <Image source={{uri:imageUrl}} 
                        style={styles.imageStyle}
                        />
                    </View>
                    <View style={{justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={[styles.subtitle,{textAlign:'center'}]}>{occasion} message from {name}</Text>
                        <NumberCurrency price={price} currency={"Rp"}></NumberCurrency>
                    </View>
                </View>
                <View>
                    <Text text70L style={styles.textDesc}>Message for:</Text>
                    <Text style={styles.textStyle}>{orderRequest.recipient_name}</Text>
                    <Text text70L style={styles.textDesc}>Description:</Text>
                    <Text style={styles.textStyle}>{orderRequest.message}</Text>
                    <Text text70L style={styles.textDesc}>Due date:</Text>
                    <Text style={styles.textStyle}>{dueDate}</Text>
                    {/* <p className='card-text mb-2'>{moment({dueDate}).format("MMMM Do YYYY")}</p> */}                    
                </View>
                <View style={{paddingVertical: 8}}>
                    {StatusCondition(status, props.callback, orderId)}
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