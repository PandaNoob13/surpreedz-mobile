import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StyleSheet, TouchableOpacity, View, Text, ScrollView} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native-ui-lib";
import FormButton from "./FormButton";

const ModalDialog = ({props, visible, onPress, children, titleModal}) => {
    // const [isModalVisible, setModalVisible] = useState(false);

    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };
    return (
        <Modal
            {...props}
            backdropColor={'black'}
            backdropOpacity= {.7}
            style={{ margin: 0 }}
            animationType={"slide"}
            isVisible={visible}
            // onBackdropPress={onPress}
            swipeDirection='down'
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{paddingTop:8,paddingRight:8, alignSelf:'flex-end'}}>
                            <TouchableOpacity  onPress={onPress}>
                                <MaterialCommunityIcons name="close" size={24} color="white" />
                            </TouchableOpacity>
                    </View>
                    <View style={{alignSelf:'flex-start', paddingLeft:24}}>
                        <Text style={styles.subtitle}>{titleModal}</Text>
                    </View>

                        <View style={{minWidth:'100%', paddingBottom:8}}>
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
        // height: '70%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowRadius: 10,
        elevation: 5,
    },
    subtitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold'
    },
});

export default ModalDialog;