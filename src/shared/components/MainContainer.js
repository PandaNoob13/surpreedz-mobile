import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import HeaderPageLabel from './HeaderPageLabel';

const MainContainer = ({children}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent style="light"/>
            <HeaderPageLabel> 
                <Image source={require('../../../assets/img/surpreedz-logo.png')} style={{height: 20, width:120, objectFit: "cover"}}></Image>
            </HeaderPageLabel>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    }
});
export default MainContainer;
