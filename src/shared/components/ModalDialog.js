import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StyleSheet, TouchableOpacity, View, Text, ScrollView} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native-ui-lib";
import FormButton from "./FormButton";

const ModalDialog = (props) => {
    // const [isModalVisible, setModalVisible] = useState(false);

    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };
    const {visible, onBackdropPress, onPress, children, titleModal} = props;
    return (
        <Modal
            {...props}
            backdropColor={'black'}
            backdropOpacity= {.7}
            style={{ margin: 0 }}
            animationType={"slide"}
            isVisible={visible}
            onBackdropPress={onBackdropPress}
            swipeDirection='down'
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View spread >
                        <Text style={styles.subtitle}>{titleModal}</Text>
                        <TouchableOpacity onPress={onPress}>
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{minWidth:'100%', marginBottom:20}}>
                        {children}
                    </View>
                </View>
            </View>            
        </Modal>        
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    modalView: {
        backgroundColor: Colors.colourBg,
        color: Colors.colourTextPrimary,
        alignItems: 'center',
        alignSelf: 'stretch',
        height: '80%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowRadius: 10,
        elevation: 5,
        padding:8,
    },
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
});

export default ModalDialog;