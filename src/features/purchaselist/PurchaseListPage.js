import { StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import { Text, View } from 'react-native-ui-lib';
import PurchasedCard from '../../shared/components/PurchasedCard';
import usePurchaseListPage from './UsePurchaseListPage';
import VideoPlayer from 'expo-video-player';
import { ResizeMode } from 'expo-av';
import SpinnerLoading from '../../shared/components/SpinnerLoading';
import LottieView from 'lottie-react-native';

const PurchaseListPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
	const {posts, onGetOrder, onGetVideoResult, isLoading, onPlayVideoResult,video,modalVisible, setModalVisible, setVideo} = usePurchaseListPage();
    useEffect(() => {
        onGetOrder()
        console.log('Purchase List Page posts');
    },[])

   
    const handleCloseModal = () => {
        setModalVisible(false);
        setVideo('');
    }

    return (
        <MainContainer mainPage>
            {modalVisible == true && video != '' ? <View>

                     
                    <View style={{marginTop: 0}}>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <Text style={styles.subtitle}>Close Video</Text>
                        </TouchableOpacity>
                        <VideoPlayer 
                            videoProps={{
                                shouldPlay: true,
                                resizeMode: ResizeMode.COVER,
                                source:{
                                    uri:`data:video/mp4;base64,${video}`
                                },
                            }}
                        />

                    </View>
                    
                </View> : <></>}

            <ScrollView>
                <View flex paddingH-25 marginV-25 colourText>
                    <Text colourTextPrimary text40BO>Purchased List</Text>
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
                                return <PurchasedCard data={sentaccount} callback={(orderId) => onGetVideoResult(orderId)} callPlayVideo={(orderId) => onPlayVideoResult(orderId)} />
                                
                            })
                            return orders
                        }) : 
                        <View style={{marginVertical:220}}>
                            <View style={styles.container}>
                                <LottieView autoPlay style={styles.image}
                                    source={require('../../../assets/img/51382-astronaut-light-theme.json')}>
                                </LottieView>
                            </View>
                            <Text text60L style={[styles.subtitle]}>The space is empty</Text>
                            <Text text80L style={[styles.subtitle, {marginBottom:32}]}>Let's fill it with the celebrities!</Text>
                        </View>
                        }
                    </View>
                </View>
            </ScrollView>
            {isLoading ? <SpinnerLoading onShowSpinner={isLoading}></SpinnerLoading>:<></>}
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

export default PurchaseListPage