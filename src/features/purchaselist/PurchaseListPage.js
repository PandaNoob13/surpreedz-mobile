import { StyleSheet, ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import { Text, View } from 'react-native-ui-lib';
import FormTextInput from '../../shared/components/FormTextInput';
import FormButton from '../../shared/components/FormButton';
import PurchasedCard from '../../shared/components/PurchasedCard';
import usePurchaseListPage from './UsePurchaseListPage';

const imageUrl='https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg'


const PurchaseListPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
	const {posts, onGetOrder, onGetVideoResult, isLoading} = usePurchaseListPage();

    useEffect(() => {
        onGetOrder()
        console.log('posts');
    },[])

    return (
        <MainContainer>
            <ScrollView>
                <View flex paddingH-25 paddingT-120 colourText>
                    <Text colourTextPrimary text20>Purchased List</Text>
                    <View useSafeArea marginV-10>
                    {posts ? posts.map((data) => {
					const account = data.account
					const orders = account.Orders.map((order) => {
						const serviceDetail = account.ServiceDetail
						const servicePrice = serviceDetail.ServicePrices[serviceDetail.ServicePrices.length - 1]
						const orderStatus = order.OrderStatus[order.OrderStatus.length - 1]
						const sentaccount = {
							occasion: order.OrderRequest.occasion,
							name: account.AccountDetail.name,
							price: servicePrice.price,
							dueDate: order.due_date,
							status: orderStatus.order_status,
							orderId: order.id,
							orderRequest: order.OrderRequest,
							photoUrl: data.data_url
						}
						return <PurchasedCard data={sentaccount} callback={(orderId) => onGetVideoResult(orderId)}/>
					})
					return orders
				}) : <Text style={styles.subtitle}>Empty Data</Text>}
                    </View>
                </View>
            </ScrollView>
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

export default PurchaseListPage