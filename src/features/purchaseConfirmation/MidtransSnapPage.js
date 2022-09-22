import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import WebView from 'react-native-webview';
import useMidtransService from './useMidtransService';
import { useRoute } from '@react-navigation/native';

const MidtransSnapPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const {midPosts} = useMidtransService();
    const route = useRoute();
    const [midtransParams, setmidtransParams] = useState({})


    useEffect(()=>{
      if (route.params?.prevPage && route.params?.midtransLink ) {
          setmidtransParams({
              prevPage: route.params.prevPage,
              midtransLink: route.params.midtransLink,
          })
      }
    },[route.params])

    return (
        <WebView source={{uri: midtransParams.midtransLink}} style={styles.video}></WebView>
    );
}

const styling = (theme) => ( StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    video: {        
        // height: 320,
        // marginTop: 20,
        minHeight: 20,
        // width: 320,
        flex: 1,
        elevation:10,
    },
}))

export default MidtransSnapPage