import { useState } from "react";
import {StyleSheet, View} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native-ui-lib";

const ModalDialog = ({props, visible = true, onVisible, children}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <Modal
            {...props}
            backdropColor={'black'}
            backdropOpacity= {.7}
            style={{ margin: 0 }}
            animationType={"slide"}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            swipeDirection='down'
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {children}
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
        color: Colors.colourText,
        padding: 35,
        alignItems: 'center',
        alignSelf: 'stretch',
        height: '70%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default ModalDialog;