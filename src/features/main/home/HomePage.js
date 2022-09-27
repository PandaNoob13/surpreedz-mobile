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
import LoadingServiceCard from '../../../shared/components/LoadingServiceCard';

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

    useEffect(()=>{
      onGetService();
      // console.log('posts',posts);
    //   console.log('AddorderResult Home Page => ', addOrderDataResult);
    },[])

    return (
        <MainContainer mainPage>
            <ScrollView>
                <View style={styles.container}>
                    <Text colourTextPrimary text40BO>Welcome home!</Text>
                    <ScrollView
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
                                    // console.log('data',data);
                                    // console.log('data.ServiceDetail.id',data.ServiceDetail.id);
                                    if (data.ServiceDetail.id !== 0) {
                                        return ( <ServiceCard data={data} pic={account.data_url} date={account.string_join_date} />)
                                    }
                                }):
                                <Text style={styles.textTitle}>Empty Data</Text> }
                            </>
                        }
                        
                    </ScrollView>
                    {modalVisible && 
                        <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`How Surpreedz works?`} modalHeight={'70%'} >
                            <About></About>
                        {/* <WebView source={{uri: 'https://google.com'}} style={{width: '100%', height: '100%'}}></WebView> */}
                        </ModalDialog>}
                    <FormButton link style={{marginBottom:16}} labelStyle={{color:'#fff'}} label=' How Surpreedz works?' onPress={()=>setModalVisible(true)}>
                        <Feather name="info" size={24} color={'white'} />
                    </FormButton>
                </View>
            </ScrollView>
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
    video: {        
        // height: 320,
        // marginTop: 20,
        minHeight: 20,
        width: 320,
        flex: 1,
        elevation:10,
    }
}))

export default HomePage