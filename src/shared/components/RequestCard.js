import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardContainer from './CardContainer'
import FormButton from './FormButton'
import { useTheme } from '../context/ThemeContext'
import ModalDialog from './ModalDialog'
import OrderDetailInfo from './OrderDetailInfo'
import useRequestList from '../../features/seller/hookSeller/UseRequestList'
import moment from 'moment'
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system'
// import { Video } from 'expo-av'


const RequestCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoData, setVideoData] = useState({});
    const [buttonDisable, setButtonDisable] = useState(true);
    const {onPostService, onPostVideoResult, isLoading2} = useRequestList();
    const data = props.data;
    const dueDate = data.dueDate;
    const orderRequest = data.orderRequest;
    const [videoUri, setVideoUri] = useState('');
    const [base64Video ,setBase64Video] = useState('');

    useEffect(()=>{
        if (Object.keys(videoData).length != 0) {
            setButtonDisable(false)
        }
    },[videoData])

    useEffect(()=>{}, [buttonDisable])

    const PermissionFunc = async () => {
        if (Platform.OS != 'web') {
            const resultPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // console.log('result', resultPermission.status);
            if (resultPermission.status !== 'granted') {
                alert('Permission denied !');
            }
        }
    }

    useEffect(()=>{
        PermissionFunc()
    },[]);

    const ConvertFiletoBlob = async (data) => {
        try {
        //   const promiseFetch = [];
        //   const promiseBlob = [];
          
          const response = fetch(data);
          console.log('data => ', data);
        //   promiseFetch.push(response);


          const blob = (await response).blob();
        //   promiseBlob.push(blob);


        //   await Promise.all(promiseFetch);
        //   await Promise.all(promiseBlob);

          return blob

          
        } catch (error) {
          console.log('error ConvertFiletoBlob', error);
        }
        
      }

    const handleChangeVideo = async () => {
        try {
            const respVideo = await ImagePicker.launchImageLibraryAsync({
              base64: true,
              mediaTypes: ImagePicker.MediaTypeOptions.Videos
            });
            if (!respVideo.cancelled) {
                setVideoUri(respVideo.uri);
                // console.log('respVideo', respVideo);

                // if (respVideo.uri != null && respVideo.uri != undefined) {
                    const arrayVideoResp = respVideo.uri.split('/');
                    // console.log('arrayVideoResp ', arrayVideoResp);
                    const videoName = arrayVideoResp[arrayVideoResp.length - 1];
                    // console.log('videoName ', videoName);
                    const blob = await ConvertFiletoBlob(respVideo.uri);
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function() {
                    // console.log('reader result', reader.result);
                        setBase64Video(reader.result);
                        setVideoData({
                            videoFile : respVideo,
                            videoName : videoName,
                            videoUrl : respVideo.uri,
                            dataUrl : reader.result
                        })
                    }
                    reader.onerror = function() {
                    // console.log('reader error', reader.error);
                    console.log('error');
                    }
                // }
            }
          } catch (error) {
            console.log('error handleChange Video', error);
          }

    }


    const handleSubmit = (value) => {
        if (value == 'Accept'){
           onPostService(data.orderId, "On progress")
        } else if (value == 'Reject'){
           onPostService(data.orderId, "Rejected")
        } else if (value == 'Submit') {
           console.log("Url video : ", videoData.dataUrl);
           onPostService(data.orderId, "Submitted")
           onPostVideoResult(data.orderId, videoData.dataUrl)
        }
        props.callback()
     }
  
     const StatusCondition = (status) => {
        if (status == 'Waiting for confirmation') {
            return (
                <View style={{flexDirection:'row',justifyContent:'center', margin:8}}>
                    <View style={{marginRight:8}}>
                        <FormButton label='Accept' onPress={()=>handleSubmit('Accept')} />
                    </View>
                    <View style={{marginLeft:8}}>
                        <FormButton label='Reject' onPress={()=>handleSubmit('Reject')} />
                    </View>
                </View>
            )
        } else if(status == 'On progress'){
            return(
                <>
                {/* <View style={{alignSelf: 'center'}}> */}
                    <View style={[{marginBottom:8, justifyContent:'space-between'}, styles.requestStyle]}>
                        { videoUri !== '' && base64Video == '' ? <Text style={styles.textDesc}>Process Upload</Text> : <></>}
                        { videoUri !== '' && base64Video !== '' ? <Text style={styles.textDesc}>Upload Video Success</Text> : <></>}
                        { videoUri == '' && base64Video == '' ? <Text style={styles.textDesc}>No Video</Text> : <></>}
                        <Button title='Input Video' onPress={handleChangeVideo} />
                    </View>
                    <View style={{marginVertical:8,width:'50%',alignSelf:'center'}}>
                        <FormButton label={'Submit Video'} onPress={()=>handleSubmit('Submit')} />
                    </View>
                {/* </View> */}
                </>
            )
        } else{
            return (
                <View></View>
            )
        }
     }
    const useChooseIcon = (occasion) => {
        switch (occasion) {
            case "Birthday":
                return (
                    <View style={{width: 60, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"}}>
                        <FontAwesome icon={SolidIcons.birthdayCake} style={{color: 'white', fontSize: 35}} ></FontAwesome>
                    </View>
                )
            case "Graduation":
                return (
                    <View style={{width: 60, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"}}>
                        <FontAwesome style={{color: 'white', fontSize: 35}} icon={SolidIcons.graduationCap}></FontAwesome>
                    </View>
                )
            case "Surprise":
                return (
                    <View style={{width: 60, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"}}>
                        <FontAwesome style={{color: 'white', fontSize: 35}} icon={SolidIcons.surprise}></FontAwesome>
                    </View>
                )
            case "Other":
                return (
                    <View style={{width: 60, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"}}>
                        <FontAwesome style={{color: 'white', fontSize: 35}} icon={SolidIcons.commentDots}></FontAwesome>
                    </View>
                )
            default :
                return "";
        }
    }

    return (
        <View style={{marginBottom:12}}>
            {modalVisible && 
                <ModalDialog visible={modalVisible} onPress={()=> setModalVisible(false)} titleModal={`Order Detail`} modalHeight={'70%'} >
                    <OrderDetailInfo data={{
                        orderRequest: data.orderRequest,
                        buyerName: data.name
                    }} />
                </ModalDialog>}
            <CardContainer>
                <View style={styles.container}>
                    {useChooseIcon(data.occasion)}
                    <View style={{flex:1, alignSelf: 'center'}}>
                        <Text style={[styles.textTitle,{textAlign:'center'}]}>{data.occasion}</Text>
                    </View>
                    <View style={{width:100, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                        <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                        {/* <FormButton label='Detail' onPress={openModalDetailOrder} /> */}
                    </View>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Message for</Text>
                    <Text style={styles.textStyle}>{orderRequest.recipient_name}</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Due Date</Text>
                    <Text style={styles.textStyle}>{moment({dueDate}).format("MMMM Do YYYY")}</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Status</Text>
                    <Text style={styles.textStyle}>{data.status}</Text>
                </View>

                <View>
                    {StatusCondition(data.status)}
                </View>

            </CardContainer>
        </View>
        
    )
}

const styling = (theme) => ( StyleSheet.create({
    textTitle :{
        fontSize:20,
        color: '#ffffff',
        textAlign:'left'
    },
    textDesc: {fontWeight: '400', color: 'white', opacity: 0.5},
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
    textStyle :{
        fontSize:15,
        color: '#ffffff',
    },
    requestStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 2
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

export default RequestCard