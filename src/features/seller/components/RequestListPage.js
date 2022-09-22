import { View ,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-ui-lib';
import { useTheme } from '../../../shared/context/ThemeContext';
import RequestCard from '../../../shared/components/RequestCard';
import useRequestList from '../hookSeller/UseRequestList';

const RequestListPage = () => {
    const {posts, onGetService, isLoading} = useRequestList();
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
                : <Text style={styles.textStyle}>Empty request</Text>}
            </View>            
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

export default RequestListPage