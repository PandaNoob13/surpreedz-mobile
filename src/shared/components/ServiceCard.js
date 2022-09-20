import {StyleSheet} from 'react-native';
import { Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { NumericFormat } from 'react-number-format';
import {useTheme} from "../context/ThemeContext";
import CardContainer from './CardContainer'
import NumberCurrency from './CurrencyConverter';

const ServiceCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    return (
        <TouchableOpacity 
            {...props}
        >
            <CardContainer style={{padding: 0, paddingBottom: 8, maxWidth: 152, minHeight: 250, margin: 4}}>
                <Image source={{uri: props.picUrl}} style={{height: 150, objectFit: "cover", borderTopRightRadius: 12, borderTopLeftRadius: 12}}></Image>
                <View flex style={{padding: 8}}>
                    <View marginB-10>
                        <View>
                            <Text colourTextPrimary text70 numberOfLines={1} style={{fontWeight: '700', flex: 1}}>{props.name}</Text>
                        </View>
                        <Text text70L style={{fontWeight: '200', color: 'white', opacity: 0.5}}>{props.category}</Text>
                    </View>
                    
                    <View row bottom spread>
                        <NumberCurrency price={props.price} currency="Rp"  />
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