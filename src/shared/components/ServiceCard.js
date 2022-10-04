import { useNavigation, useRoute } from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import { Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { NumericFormat } from 'react-number-format';
import { ROUTE } from '../constants';
import {useTheme} from "../context/ThemeContext";
import CardContainer from './CardContainer'
import NumberCurrency from './CurrencyConverter';

const ServiceCard = (props) => {
    const accountDetail = props.data.AccountDetail
    const {name, location} = accountDetail
    const photoProfile = accountDetail.PhotoProfiles[accountDetail.PhotoProfiles.length - 1]
    const {photo_link} = photoProfile
    const serviceDetail = props.data.ServiceDetail
    const {id, role} = serviceDetail
    const servicePrice = serviceDetail.ServicePrices[serviceDetail.ServicePrices.length - 1]
    const {price} = servicePrice

    const theme = useTheme();
    const styles = styling(theme);
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <TouchableOpacity 
            {...props} onPress={()=>{
                navigation.navigate(ROUTE.ORDER,{
                    picUrl: photo_link,
                    name: name,
                    email: props.data.email,
                    location: location,
                    joinDate: props.data.join_date,
                    serviceDetailId: id,
                    price: price,
                    dataUrl: props.pic,
                    prevPage: route.name
                })
            }}
        >
            <CardContainer style={{padding: 0, paddingBottom: 8, width: 152, maxHeight: 258, height:75, margin: 4, marginBottom: 15}}>
                <Image source={{uri: `data:image/jpg;base64,${props.pic}`}} style={{height: 150, objectFit: "cover", borderTopRightRadius: 12, borderTopLeftRadius: 12}}></Image>
                <View flex style={{padding: 8}}>
                    <View marginB-10>
                        <View row>
                            <Text colourTextPrimary text70 numberOfLines={1} style={{fontWeight: '700', flex: 1}}>{name}</Text>
                        </View>
                        <Text text70L style={{fontWeight: '200', color: 'white', opacity: 0.5}}>{role}</Text>
                    </View>
                    
                    <View row bottom spread>
                        <NumberCurrency price={price} currency="Rp"  />
                    </View>
                </View>
            </CardContainer>
        </TouchableOpacity>
    );
};

const styling = (theme) => StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: Colors.colourCardContainer,
        borderRadius: 12,
    },
    pic: {
        maxWidth: "12.5rem",
        padding: "4px",
        height: '15rem', 
        objectFit: "cover", 
        borderRadius: "12px"}
});
export default ServiceCard;