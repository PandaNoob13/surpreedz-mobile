import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Text, View } from 'react-native-ui-lib';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';

const About = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    const data = props.data

  return (
    <ScrollView >
        <View style={styles.textRow}>
            <View style={styles.iconContainer}>
                <FontAwesome icon={SolidIcons.calendarAlt} style={styles.icon} ></FontAwesome>
            </View>
            <Text style={styles.textStyle}>Your Request will be delivered within 3 days</Text>
        </View>
        <View style={styles.textRow}>
            <View style={styles.iconContainer}>
                <FontAwesome icon={SolidIcons.receipt} style={styles.icon} ></FontAwesome>
            </View>
            <Text style={styles.textStyle}>Your receipt and order updates will be shown in the Purchased List page</Text>
        </View>
        <View style={styles.textRow}>
            <View style={styles.iconContainer}>
                <FontAwesome icon={SolidIcons.fileVideo} style={styles.icon} ></FontAwesome>
            </View>
            <Text style={styles.textStyle}>When your request is completed, we’ll put the link to view or download your Surpreedz video</Text>
        </View>
        {/* <View style={styles.textRow}>
            <View style={styles.iconContainer}>
                <FontAwesome icon={SolidIcons.moneyBillWave} style={styles.icon} ></FontAwesome>
            </View>
            <Text style={styles.textStyle}>If for some reason your video isn’t completed, ...</Text>
        </View> */}

    </ScrollView>
  )
}

const styling = (theme) => ( StyleSheet.create({
    textStyle :{
        fontSize:16,
        color: '#ffffff',
        width: '75%',
    },
    infoContainer:{
        backgroundColor:'#000000',
        borderRadius:8,
        padding: 8,
        minHeight:50
    },
    icon: {color: 'white', fontSize: 32, },
    iconContainer: {marginHorizontal: 12, width: 64, alignItems: 'center'},
    textRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical:16,
    },

  }))

export default About