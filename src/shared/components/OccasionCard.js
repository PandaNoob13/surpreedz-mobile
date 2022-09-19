import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardContainer from './CardContainer'
import { useTheme } from '../context/ThemeContext';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName} from 'react-native-fontawesome';

const OccasionCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme)

    const useChooseIcon = (occasion) => {
        // useEffect(() => {
        //     const elements = document.querySelectorAll('.icon')
        //     elements.forEach(el => {
        //         el.addEventListener('click', () => {
        //             elements.forEach(el => el.classList.remove('active-occasion'))
        //             el.classList.add('active-occasion')
        //         })})
        // });

        switch (occasion){
            case "Birthday":
                return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{width: 24, height: 24}}>
                        <FontAwesome icon={SolidIcons.cake}></FontAwesome>
                    </View>
                </TouchableOpacity>
                )
            case "Graduation":
                return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{width: 24, height: 24}}>
                        <FontAwesome icon={SolidIcons.graduationCap}></FontAwesome>
                    </View>
                </TouchableOpacity>
                )
            case "Surprise":
                return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{width: 24, height: 24}}>
                        <FontAwesome icon={SolidIcons.faceSurprise}></FontAwesome>
                    </View>
                </TouchableOpacity>
                )
            case "Other":
                return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{width: 24, height: 24}}>
                        <FontAwesome icon={SolidIcons.commentDots}></FontAwesome>
                    </View>
                </TouchableOpacity>
                )
            default :
                return "";
        }
    }

    return (
        <CardContainer style={{marginVertical: 4}}> 
            <View>
                <Text style={styles.subtitle}>
                        {props.orderParam.nameSeller} would help you with ...
                </Text>
                <View>
                    {useChooseIcon(props.occasion)}
                    <Text>{props.occasion}</Text>
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
}))