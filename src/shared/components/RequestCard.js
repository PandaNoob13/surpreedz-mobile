import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import CardContainer from './CardContainer'
import FormButton from './FormButton'
import { useTheme } from '../context/ThemeContext'
import ModalDialog from './ModalDialog'
import OrderDetailInfo from './OrderDetailInfo'
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';

const RequestCard = () => {
// const RequestCard = ({openModalDetailOrder}) => {

    const theme = useTheme();
    const styles = styling(theme);
    const [modalVisible, setModalVisible] = useState(false)

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
                    <OrderDetailInfo />
                </ModalDialog>}
            <CardContainer>
                <View style={styles.container}>
                    {/* {useChooseIcon(occasion)} */}
                    <Text style={[styles.subtitle,{textAlign:'center'}]}>Occasion</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Message for</Text>
                    <Text style={styles.textStyle}>Novita Eka Widyastuti</Text>
                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Due Date</Text>
                    <Text style={styles.textStyle}>22 September 2022</Text>
                </View>

                <View style={{width:100, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                    <FormButton label='Detail' onPress={()=>setModalVisible(true)} />
                    {/* <FormButton label='Detail' onPress={openModalDetailOrder} /> */}

                </View>

                <View style={styles.requestStyle}>
                    <Text text70L style={styles.textDesc}>Status</Text>
                    <Text style={styles.textStyle}>On Progress</Text>
                </View>

                <View style={{width:150, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                    {/* <FormButton label='Choose File' /> */}
                    <Button title='Choose File' />
                </View>

                <View style={{width:200, marginTop:16, marginBottom:16, alignSelf:'center'}}>
                    <FormButton label='Submit Video' />
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