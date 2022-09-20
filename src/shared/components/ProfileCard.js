import { View, Text,StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import CardContainer from './CardContainer';
import moment from 'moment';

const ProfileCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    const {name, location, joinDate, dataUrl} = props.data;

    // useEffect(()=>{
    //     console.log('name profile card=>', name);
    // })

  return (
        <CardContainer {...props}>
            <View style={{margin:8}}>
                <View>
                    <Image source={{uri:`data:image/jpg;base64,${dataUrl}`}} 
                    style={styles.imageStyle}
                    />
                </View>
                <View>
                    <Text style={[styles.subtitle,{textAlign:'center'}]}>{name}</Text>
                    <Text style={styles.textStyle}>{location}</Text>
                </View>
                

                <View>
                    <Text style={[styles.textStyle, {marginTop:32}]}>Member since  {moment({joinDate}).format("MMMM Do YYYY")}</Text>
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
    }
 }))

export default ProfileCard