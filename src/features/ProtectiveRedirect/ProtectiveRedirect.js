import { View ,StyleSheet, ScrollView} from 'react-native'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import FormButton from '../../shared/components/FormButton';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../shared/constants';

const ProtectiveRedirectPage = () => {
    const theme = useTheme();
    const styles = styling(theme);
    const navigation = useNavigation();

    return (
        <MainContainer>
            <ScrollView style={{padding: 16}} contentContainerStyle={styles.centerPage}>
                <View style={styles.container}>
                <LottieView autoPlay style={styles.image}
                    source={require('../../../assets/img/108106-empty-cart.json')}>
                </LottieView>
                </View>
                <Text text50L style={[styles.subtitle, {marginBottom:32}]}>Ready to liberate your expression?</Text>
                <View style={{margin: 8, marginBottom:16}}>
                    <FormButton label={`Sign Up`} onPress={()=> {navigation.replace(ROUTE.SIGNUP)}} />
                    <Text text70L style={styles.subtitle}> or </Text>
                    <FormButton label={`Sign In`} onPress={()=> {navigation.replace(ROUTE.SIGNIN)}} />
                </View>
            </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
    image: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: "center",
        resizeMode: "cover",
    },
    subtitle:{
        textAlign:'center',
        color: '#ffffff',
        marginBottom: 8,
    },
    container: {
        marginBottom: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    centerPage: {
        // backgroundColor:"blue",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        // flexDirection: "column"
    },
    square: {
        backgroundColor: "#7cb48f",
        width: 100,
        height: 100,
        margin: 4,
      },
}))

export default ProtectiveRedirectPage