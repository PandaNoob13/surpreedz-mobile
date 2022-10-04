import { View ,StyleSheet, ScrollView, useWindowDimensions, Animated} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../../shared/context/ThemeContext';
import MainContainer from '../../../shared/components/MainContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import ServiceCard from '../../../shared/components/ServiceCard';
import useHomePage from './UseHomePage';
import {useSelector} from 'react-redux';
import { Modal, Text } from 'react-native-ui-lib';
import FormButton from '../../../shared/components/FormButton';
import ModalDialog from '../../../shared/components/ModalDialog';
import About from '../../../shared/components/About';
import {WebView} from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import ModalAlert from '../../../shared/components/ModalAlert';
import LoadingServiceCard from '../../../shared/components/LoadingServiceCard';
import LottieView from 'lottie-react-native';

const HomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const route = useRoute();
    const {posts, onGetService, isLoading} = useHomePage();
    const {addOrderDataResult} = useSelector((state)=> state.orderDetailReducer)
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(()=>{
      onGetService();
    },[])

    return (
        <MainContainer mainPage>
            <ScrollView>
                <View style={styles.container}>
                    {modalVisible && 
                        <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`How Surpreedz works?`} modalHeight={'50%'} >
                            <About></About>
                        </ModalDialog>}
                    <FormButton link style={{marginTop:2, marginBottom: 10}} labelStyle={{color:'#fff'}} label='  How Surpreedz works?' onPress={()=>setModalVisible(true)}>
                        <Feather name="info" size={24} color={'white'} />
                    </FormButton>
                </View>
                    {/* <Text colourTextPrimary text40BO>Liberate your expression!</Text> */}
                    {/* <ScrollView
                        style={{marginVertical:10}}
                        horizontal={true}
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                            {
                            nativeEvent: {
                                contentOffset: {
                                x: scrollX
                                }
                            }
                            }
                        ], {useNativeDriver: false})}
                        scrollEventThrottle={1}
                    >
                        {isLoading ? 
                            <>
                                <LoadingServiceCard></LoadingServiceCard>
                                <LoadingServiceCard></LoadingServiceCard>
                                <LoadingServiceCard></LoadingServiceCard>
                            </> 
                        :
                            <>
                                {posts ? posts.map((account) => {
                                    const data = account.account
                                    if (data.ServiceDetail.id !== 0) {
                                        return ( <ServiceCard data={data} pic={account.data_url} date={account.string_join_date} />)
                                    }
                                }):
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
                            </>
                        }
                    </ScrollView> */}
                    {isLoading ? 
                    <View style={{alignItems: 'center', marginBottom:20}}>
                        <View style={styles.containerWrap}>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                            <LoadingServiceCard></LoadingServiceCard>
                        </View>
                    </View>
                    : 
                    <>
                    <View style={{alignItems: 'center', marginBottom:20}}>
                        <View style={styles.containerWrap}>
                            {posts ? posts.map((account) => {
                                const data = account.account
                                if (data.ServiceDetail.id !== 0) {
                                    return ( <ServiceCard data={data} pic={account.data_url} date={account.string_join_date} />)
                                }
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
                    </View>
                    </>
                    }
                {/* </View> */}
            </ScrollView>
            {/* {isLoading ? <SpinnerLoading onShowSpinner={isLoading}></SpinnerLoading>:<></>} */}
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
    textTitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginRight:8
    },
    container: {
        marginVertical: 25,
        paddingHorizontal: 25,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerWrap: {
        // flex: 1,
        flexDirection:'row',
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        // paddingBottom: 5000,
    },
    video: {        
        // height: 320,
        // marginTop: 20,
        minHeight: 20,
        width: 320,
        flex: 1,
        elevation:10,
    },
    subtitle:{
        textAlign:'center',
        color: 'rgba(255,255,255,0.6)',
        // marginBottom: 8,
    },
    containerEmpty: {
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

export default HomePage