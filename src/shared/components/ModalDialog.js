import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StyleSheet, TouchableOpacity, View, Text, ScrollView} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native-ui-lib";
import { useTheme } from '../context/ThemeContext';
import CardContainer from './CardContainer';
import FormButton from "./FormButton";

const ModalDialog = (props) => {
    const theme = useTheme();
    const styles = styling({theme, props});
    // const [isModalVisible, setModalVisible] = useState(false);

    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };
    const {visible, onPress, children, titleModal} = props;

    return (
        <Modal
            {...props}
            style={{ margin: 0 }}
            animationType={"slide"}
            isVisible={visible}
            onBackdropPress={onPress}
            onSwipeComplete={onPress}
            swipeDirection='down'
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.container} >
                        <Text style={styles.subtitle}>{titleModal}</Text>
                        <TouchableOpacity onPress={onPress}>
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <CardContainer style={{paddingBottom: 64}}>
                        {children}
                    </CardContainer>
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
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowRadius: 10,
        elevation: 5,
        padding:8,
    },
    subtitle:{
        fontSize:20,
        color: '#ffffff',
        fontWeight:'bold'
    },
    container: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        // flex: 1,
        flexDirection:'row',
        // gap: '1rem',
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default ModalDialog;