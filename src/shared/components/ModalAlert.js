import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StyleSheet, TouchableOpacity, View, Text, ScrollView} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native-ui-lib";
import { useTheme } from '../context/ThemeContext';
import CardContainer from './CardContainer';
import LottieView from 'lottie-react-native';
import FormButton from './FormButton';

const ModalAlert = (props) => {
    const theme = useTheme();
    const styles = styling({theme, props});
    const {visible, onPress, buttons} = props;

    const modalStyle = () => {
        if (props.success) {
            return (
                <LottieView autoPlay style={styles.image}
                    source={require('../../../assets/img/96673-success.json')}>
                </LottieView>
            )
        } else if (props.error) {
            return (
                <LottieView autoPlay style={styles.image}
                    source={require('../../../assets/img/76705-error-animation.json')}>
                </LottieView>
            )
        } else if (props.warning) {
            return (
                <LottieView autoPlay style={styles.image}
                    source={require('../../../assets/img/77363-error-warning-alert.json')}>
                </LottieView>
            )
        }
    }

    const alertButtons = () => {
        if (buttons) {
            console.log(buttons);
            const createdButtons = buttons.map((button) => {
                const label = button.label;
                const onPress = button.onPress;
                console.log('button', button);
                console.log('button.label', button.label);
                return <FormButton link style={{marginHorizontal:8}} labelStyle={{color:'#fff'}} label={label} onPress={onPress}/>
            })      
            return createdButtons      
        } else {
            return (<></>)
        }
    }

    return (
        <Modal
            {...props}
            isVisible={visible}
            onBackdropPress={onPress}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
        >
            <View style={styles.modalView}>
                <CardContainer style={{alignItems: 'center'}}>
                    <View style={styles.container} >
                        {modalStyle()}
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                    </View>
                </CardContainer>
                <View style={styles.buttonContainer}>
                    <View style={{flexDirection:'row'}}>
                        {alertButtons()}
                        {/* {createdButtons} */}
                    </View>
                </View>
            </View>
        </Modal>        
    );
}

const styling = ({theme, props}) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    modalView: {
        backgroundColor: "#373535",
        color: Colors.colourTextPrimary,
        // alignItems: 'center',
        alignSelf: 'stretch',
        height: props.modalHeight,
        borderRadius: 12,
        shadowRadius: 10,
        elevation: 5,
        padding:8,
    },
    title:{
        fontSize:20,
        color: '#ffffff',
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:16,
        color: '#ffffff',
        opacity: 0.5,
        // fontWeight:'bold'
    },
    container: {
        marginBottom: 16,
        paddingHorizontal: 8,
        // flex: 1,
        // flexDirection:'row',
        // gap: '1rem',
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainer: {
        marginBottom: 16,
        paddingHorizontal: 8,
        // flex: 1,
        flexDirection:'row',
        // gap: '1rem',
        // flexWrap: "wrap",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: "center",
        resizeMode: "cover",
    },
});

export default ModalAlert;