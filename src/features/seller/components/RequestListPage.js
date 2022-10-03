import { View ,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-ui-lib';
import { useTheme } from '../../../shared/context/ThemeContext';
import RequestCard from '../../../shared/components/RequestCard';
import useRequestList from '../hookSeller/UseRequestList';
import SpinnerLoading from '../../../shared/components/SpinnerLoading';
import LottieView from 'lottie-react-native';

const RequestListPage = () => {
    const {posts, onGetService, isLoading2} = useRequestList();
    const [trigger, setTrigger] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useTheme();
    const styles = styling(theme);

    const triggerChange =  () => {
        // setTimeout(() => {
        //     setTrigger(!trigger)
        //     console.log("Trigger change called");

        // },200)
        setTrigger(!trigger)
        console.log("Trigger change called");
    }

    // useEffect(() => {
    //     onGetService()
    //     console.log("posts request list page", posts);
    // },[])

    useEffect(() => {
        onGetService()
        // console.log("posts request list page");
    },[trigger])

    useEffect(() => {
        onGetService()
        console.log("posts request list page");
    },[])

    return (
        <View>
            <Text colourTextPrimary text40BO marginT-25>Request list</Text>
                        
            {/* <RequestCard openModalDetailOrder={()=> setModalDetailOrder(true)} /> */}
            <View style={{marginVertical:10}}>
                {posts ? posts.map((account) => {   
                    const orders = account.Orders.map((order) => {
                        const orderStatus = order.OrderStatus[order.OrderStatus.length - 1]
                        const sentaccount = {
                            occasion: order.OrderRequest.occasion,
                            name: account.AccountDetail.name,
                            dueDate: order.due_date,
                            status: orderStatus.order_status,
                            orderId: order.id,
                            orderRequest: order.OrderRequest
                        }
                        return <RequestCard data={sentaccount} callback={triggerChange} />
                    })
                    return orders
                }) 
                : 
                <View style={{marginVertical:16}}>
                    <View style={styles.container}>
                        <LottieView autoPlay style={styles.image}
                            source={require('../../../../assets/img/51382-astronaut-light-theme.json')}>
                        </LottieView>
                    </View>
                    <Text text60L style={[styles.subtitle]}>The space is empty</Text>
                    <Text text80L style={[styles.subtitle, {marginBottom:32}]}>Let's fill it with your charm!</Text>
                </View>
                }
            </View>
            {isLoading2 ? <SpinnerLoading onShowSpinner={isLoading2}></SpinnerLoading>:<></>}

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
    subtitle:{
        textAlign:'center',
        color: 'rgba(255,255,255,0.6)',
        // marginBottom: 8,
    },
    requestStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 2
    },
    container: {
        marginBottom: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: "center",
        resizeMode: "cover",
    },
}))

export default RequestListPage