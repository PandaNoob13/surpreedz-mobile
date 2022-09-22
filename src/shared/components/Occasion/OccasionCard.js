import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardContainer from '../CardContainer'
import { useTheme } from '../../context/ThemeContext';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';
import Occasion from './Occasion';

const OccasionCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme)
    // const [buttonADisabled, setButtonADisabled] = useState(false);
    // const [buttonBDisabled, setButtonBDisabled] = useState(false);
    // const [buttonCDisabled, setButtonCDisabled] = useState(false);
    // const [buttonDDisabled, setButtonDDisabled] = useState(false);
    // const [occasion, setOccasion] = useState('')

    // const handleButtonAPressed = () => {
    //     setButtonADisabled(true);
    //     setButtonBDisabled(false);
    //     setButtonCDisabled(false);
    //     setButtonDDisabled(false);
    //     setOccasion('Birthday')
    //     console.log(occasion);
    //   };
      
    // const handleButtonBPressed = () => {
    //     // Whatever you want to do when button B is pressed
    //     setButtonADisabled(false);
    //     setButtonBDisabled(true);
    //     setButtonCDisabled(false);
    //     setButtonDDisabled(false);
    //     setOccasion('Graduation')
    //     console.log(occasion);
    // };
    
    // const handleButtonCPressed = () => {
    //     setButtonADisabled(false);
    //     setButtonBDisabled(false);
    //     setButtonCDisabled(true);
    //     setButtonDDisabled(false);
    //     setOccasion('Surprise')
    //     console.log(occasion);
    // };
    
    // const handleButtonDPressed = () => {
    //     // Whatever you want to do when button D is pressed
    //     setButtonADisabled(false);
    //     setButtonBDisabled(false);
    //     setButtonCDisabled(false);
    //     setButtonDDisabled(true);
    //     setOccasion('Other')
    //     console.log(occasion);
    // };

    // const handleOccasionChange = async (data) => {
    //     console.log("Handle occasion : ", data);
    //     setOccasion(data)
    // }

    return (
        <CardContainer style={{marginVertical: 4}}> 
            <View>
                <Text style={styles.subtitle}>
                        {props.orderParam.name} would help you with ...
                </Text>

                <View style={styles.container}>
                    <Occasion onPress={() => props.onPress("Birthday")} occasion={"Birthday"}></Occasion>
                    <Occasion onPress={() => props.onPress("Graduation")} occasion={"Graduation"}></Occasion>
                    <Occasion onPress={() => props.onPress("Surprise")} occasion={"Surprise"}></Occasion>
                    <Occasion onPress={() => props.onPress("Other")} occasion={"Other"}></Occasion>
                </View>
            </View>
        </CardContainer>
    )
}

export default OccasionCard

const styling = (theme) => ( StyleSheet.create({
    subtitle:{
        textAlign:'center',
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginBottom: 8,
    },
    // {padding: 16, flex: 1, backgroundColor: 'blue', flexWrap: 'wrap', flexDirecton: 'column'}
    container: {
        padding: 16,
        flex: 1,
        flexDirection:'row',
        gap: '1rem',
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
      },
    square: {
        // backgroundColor: "#7cb48f",
        // width: 100,
        // height: 100,
        // margin: 4,
    },
}))