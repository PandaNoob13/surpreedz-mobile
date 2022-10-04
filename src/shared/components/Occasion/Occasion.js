import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardContainer from '../CardContainer'
import { useTheme } from '../../context/ThemeContext';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';

const Occasion = (props) => {
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

    const useChooseIcon = (occasion) => {
        switch (occasion) {
            case "Birthday":
                return (
                    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.square}>
                        <View style={props.disabled ? styles.circle : styles.circleDisabled}>
                            <FontAwesome icon={SolidIcons.birthdayCake} style={props.disabled ? styles.fontAwesome : styles.fontAwesomeDisabled} ></FontAwesome>
                        </View>
                    </TouchableOpacity>
                )
            case "Graduation":
                return (
                    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.square}>
                        <View style={props.disabled ? styles.circle : styles.circleDisabled}>
                            <FontAwesome style={props.disabled ? styles.fontAwesome : styles.fontAwesomeDisabled} icon={SolidIcons.graduationCap}></FontAwesome>
                        </View>
                    </TouchableOpacity>
                )
            case "Surprise":
                return (
                    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.square}>
                        <View style={props.disabled ? styles.circle : styles.circleDisabled}>
                            <FontAwesome style={props.disabled ? styles.fontAwesome : styles.fontAwesomeDisabled} icon={SolidIcons.surprise}></FontAwesome>
                        </View>
                    </TouchableOpacity>
                )
            case "Other":
                return (
                    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.square}>
                        <View style={props.disabled ? styles.circle : styles.circleDisabled}>
                            <FontAwesome style={props.disabled ? styles.fontAwesome : styles.fontAwesomeDisabled} icon={SolidIcons.commentDots}></FontAwesome>
                        </View>
                    </TouchableOpacity>
                )
            default :
                return "";
        }
    }

    return (
        <View style={styles.square}>
            {useChooseIcon(props.occasion)}
            <Text style={props.disabled ? styles.subtitle : styles.subtitleDisabled}>{props.occasion}</Text>
        </View>
    )
}

export default Occasion

const styling = (theme) => ( StyleSheet.create({
    subtitle:{
        textAlign:'center',
        color: '#ffffff',
        marginVertical: 8,
    },
    subtitleDisabled:{
        textAlign:'center',
        color: 'rgba(255,255,255,0.6)',
        marginVertical: 8,
    },
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
        flex: 1,
        alignItems: "center",

        // backgroundColor: "#7cb48f",
        // width: 100,
        // height: 100,
        // margin: 4,
    },
    circle: {width: 60, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"},
    circleDisabled: {width: 60, height: 60, borderColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderRadius: 60/2, alignItems: 'center', justifyContent: 'center', overflow: "hidden"},
    fontAwesome: {color: 'white', fontSize: 32},
    fontAwesomeDisabled: {color: 'rgba(255,255,255,0.6)', fontSize: 32},

}))