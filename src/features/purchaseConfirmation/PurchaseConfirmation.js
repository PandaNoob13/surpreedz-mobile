import { View ,StyleSheet, ScrollView} from 'react-native'
import { Text } from 'react-native-ui-lib';
import React, { useEffect } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import usePurchaseConfirmation from './usePurchaseConfirmation';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { KEY, ROUTE } from '../../shared/constants';
import FormButton from '../../shared/components/FormButton';
import Storage from '../../shared/Storage';
import NumberCurrency from '../../shared/components/CurrencyConverter';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';
import CardContainer from '../../shared/components/CardContainer';
import WebView from 'react-native-webview';
import useMidtransService from './useMidtransService';
import MidtransSnapPage from './MidtransSnapPage';
import { addOrder } from '../orderpage/state/OrderDetailAction';

const PurchaseConfirmation = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {onPostService, isLoading}  = usePurchaseConfirmation();
    const navigation = useNavigation();
    const storage = Storage();
    const {onPostMidtrans, midPosts, statMidtrans} = useMidtransService()
    // const [WebviewVisible, setWebviewVisible] = useState(false);

    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)
    
    const route = useRoute();

    const handleSubmitPayment = async () => {
        const buyerId = await storage.getData(KEY.ACCOUNT_ID)
        console.log('order data dari purchase => ', addOrderDataResult);
        console.log('buyerId dr purchase', buyerId);

        await onPostService(parseInt(buyerId), addOrderDataResult.serviceDetailId, addOrderDataResult.dueDate, addOrderDataResult.occasion, addOrderDataResult.recipient, addOrderDataResult.message, addOrderDataResult.description);
        const midtransLink = await onPostMidtrans(addOrderDataResult.price)
        console.log('midtranslink: ', midtransLink);
        await navigation.replace(ROUTE.MIDTRANS, {
            prevPage:route.name,
            midtransLink: midtransLink,
        })

        useDispatch(addOrder(false));
        // if (midtransLink == '') {
        //     // await Midtrans(midtransLink);
        //     console.log('error link empty');
        //     console.error();
        // } else {
        //     await MidtransSnapPage({midtransLink:midtransLink})
        // }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={styles.textRow}>
                        <Text colourTextPrimary text40BO style={{marginBottom:16}}>{addOrderDataResult.occasion} Greeting for {addOrderDataResult.recipient}</Text>
                    </View>

                    {/* <Text style={styles.textTitle}>{addOrderDataResult.occasion} greeting</Text> */}
                    <CardContainer style={{marginBottom:16, padding:16}}>

                    {/* <View style={{padding:8}}> */}
                        <Text text60L style={[styles.textTitle, {marginVertical:2}]}>{addOrderDataResult.occasion} greeting</Text>
                        <View style={{marginVertical:2}}>
                            <Text style={styles.textDesc}>Description:</Text>
                            <Text style={styles.textTitle}>{addOrderDataResult.message}</Text>
                        </View>
                    {/* </View> */}

                    <CardContainer style={{backgroundColor:'#F8F9FA', marginVertical:12}}>
                    <View style={{padding:8}}>
                        <View style={styles.textRow}>
                            <FontAwesome icon={SolidIcons.checkCircle} style={{color: 'green', fontSize: 20}} ></FontAwesome>
                            <Text>1 revision</Text>
                        </View>
                        <View style={styles.textRow}>
                            <FontAwesome icon={SolidIcons.checkCircle} style={{color: 'green', fontSize: 20}} ></FontAwesome>
                            <Text>a minute length</Text>
                        </View>
                        <View style={styles.textRow}>
                            <FontAwesome icon={SolidIcons.checkCircle} style={{color: 'green', fontSize: 20}} ></FontAwesome>
                            <Text>high quality video file</Text>
                        </View>
                    </View>
                    </CardContainer>

                    <View style={styles.textRow}>
                        <Text style={styles.textTitle}>TOTAL</Text>
                        <NumberCurrency price={addOrderDataResult.price} currency={'Rp'}></NumberCurrency>
                    </View>

                    <View style={styles.textRow}>
                        <Text style={styles.textTitle}>Total delivery days</Text>
                        <Text style={styles.textTitle}>3 days</Text>
                    </View>
                    </CardContainer>

                    <FormButton label={'Confirm & Pay'} onPress={handleSubmitPayment} />
                </View>
            </ScrollView>
        </View>
    )
}

const styling = (theme) => ( StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    wrapper: {
        marginVertical: 25,
        paddingHorizontal: 25,
    },
    textTitle:{
        // fontSize:15,
        color: '#ffffff',
        // fontWeight:'bold',
        // marginRight:8
    },
    textDesc: {fontWeight: '400', color: 'white', opacity: 0.5},
    textRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical:2},
}))

export default PurchaseConfirmation