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
    const {onPostService, onPostVideoResult, isLoading} = useRequestList();
    const data = props.data;
    const dueDate = data.dueDate;
    const orderRequest = data.orderRequest;
    const [videoUri, setVideoUri] = useState('');
    const [base64Video ,setBase64Video] = useState('');

    // useEffect(()=>{
    //     if (Object.keys(videoData).length != 0) {
    //         setButtonDisable(false)
    //     }
    // },[videoData])

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

    const CreateFormData = (filePath) => {
        let formData = new FormData();
        formData.append('file',{
            name: "SampleVideo.mp4",
            uri: filePath,
            type:'video/mp4'
        });
        return formData;
    };


    const handleChangeVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!result.cancelled) {
            setVideoUri(result.uri);
        }
        console.log('result.uri ', result.uri);
        console.log('result ', result);
        // console.log('result.base64 ', result.base64);
        console.log('type of result.uri', typeof result.uri);

        const respFetch = fetch(result.uri);
        const blob = (await respFetch).blob();
        // // console.log('blob ', blob);
        // console.log('type of blob ', typeof blob);


        let reader = new FileReader();
            if (result.uri) {
                console.log('===> ',result.uri);
                reader.readAsDataURL(blob);
                console.log('===> 2',result.uri);
                reader.onload = function() {
                    // console.log(' data read ', reader);
                        console.log('===> 3',result.uri);

                }
                reader.onerror = function() {
                    // console.log('reader.error ', reader.error);
                    console.log('===> 4',result.uri);

                }
            }

        // if (result != null && result != undefined) {
            // const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // console.log('status => ', status);
            // const fsRead = await FileSystem.writeAsStringAsync(result.uri,'',
            //     {encoding: FileSystem.EncodingType.UTF8
            // });
            // const base64Videonya = `data:video/mp4;base64,${fsRead}`;
            // console.log('fsRead => ', fsRead);
            // console.log('base64Videonya', base64Videonya);

            // const fsMove = await FileSystem.moveAsync({from:result.uri, to:FileSystem.documentDirectory})
            // console.log('fsMove ', fsMove);
        // }

        
        
        // if (result.uri != null && result.uri != undefined) {
        //     const resp = CreateFormData(result.uri)
        //     console.log('resp => ', resp._parts[0][1]);
        //     setBase64Video(resp._parts[0][1]);

        //     let reader = new FileReader();
        //     if (data) {
        //         reader.readAsDataURL(resp._parts[0][1]);
        //         reader.onload = function() {
        //             console.log(' data read ', reader.result);
        //         }
        //         reader.onerror = function() {
        //             console.log('reader.error ', reader.error);
        //         }
        //     }
        // }


        // const promiseFetch = [];
        // const promiseBlob = [];
        // const promises = [];
        // let imgUrl = '';
        // const response = fetch(result.uri);
        // promiseFetch.push(response);
        // const blob = (await response).blob()
        // promiseBlob.push(blob)
        // // console.log('promiseBlob', promiseBlob);
        // await Promise.all(promiseBlob);
        // console.log('promiseBlob', promiseBlob);


        

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
                <View style={{margin:8}}>
                    <View style={{marginBottom:8, alignSelf:'flex-start'}}>
                        <Button title='Input Video' onPress={handleChangeVideo} />
                        {/* { videoUri !== '' ? <Video style={{width: 100,height: 100}} source={{uri:`${videoUri}`}} /> : <Text>Video kosong</Text>} */}
                    </View>
                    <View style={{marginTop:8,width:'50%',alignSelf:'center'}}>
                        <FormButton label={'Submit Video'} />
                    </View>
                </View>
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
                    <Text style={[styles.subtitle,{textAlign:'center'}]}>{data.occasion}</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Message for</Text>
                    <Text style={styles.textStyle}>{orderRequest.recipient_name}</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Due Date</Text>
                    <Text style={styles.textStyle}>{moment({dueDate}).format("MMMM Do YYYY")}</Text>
                </View>

                <View style={{width:100, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                    <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                    {/* <FormButton label='Detail' onPress={openModalDetailOrder} /> */}

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