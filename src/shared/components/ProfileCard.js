import { View, Text,StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import CardContainer from './CardContainer';
import moment from 'moment';
import { useState } from 'react';
import Storage from '../Storage';
import { KEY } from '../constants';
import UseEditProfilePage from '../../features/profilpage/UseEditProfilePage';

const ProfileCard = (props) => {
    const storage = Storage();
    const theme = useTheme();
    const styles = styling(theme);
    const {name, location, joinDate, dataUrl, serviceDescription} = props.data;
    // const [dataUrl, setDataUrl] = useState('');
    // const {changedPhotoProf} = UseEditProfilePage();
    // const getPicUrl = async () => {
    //     const picUrl = await storage.getData(KEY.PHOTO_PROFILE)
    //     setDataUrl(picUrl)
    // }
    // getPicUrl()

    useEffect(()=>{
        console.log("Data url in prof card: ", dataUrl);
    },[dataUrl])

  return (
        <CardContainer {...props}>
            <View style={{margin:8}}>
                <View>
                    <Image source={{uri:`data:image/jpg;base64,${dataUrl}`}} 
                    style={styles.imageStyle}
                    />
                </View>
                {serviceDescription ? 
                <View style={{marginTop: 10}}>
                    <Text style={[styles.subtitle,{textAlign:'center'}]}>{name}</Text>
                    <Text style={[styles.italicTextStyle,{textAlign:'center'}]}>{`"${serviceDescription}"`}</Text>
                </View> : 
                <View>
                    <Text style={[styles.subtitle,{textAlign:'center'}]}>{name}</Text>
                    <Text style={styles.textStyle}>{location}</Text>
                </View>}
                <View>
                    <Text style={[styles.textStyle, {marginTop:18}]}>Member since {moment({joinDate}).format("MMMM Do YYYY")}</Text>
                </View>
            </View>

        </CardContainer>

  )
}

const styling = (theme) => ( StyleSheet.create({
    textStyle :{
        fontSize:15,
        color: '#ffffff',
        textAlign:'center'
    },
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
    imageStyle:{
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        alignItems:'center',
        alignSelf:'center',
        marginBottom:8
    },
    italicTextStyle :{
        fontSize:16,
        color: '#ffffff',
        textAlign:'center',
        fontStyle: 'italic'
    },
 }))

export default ProfileCard