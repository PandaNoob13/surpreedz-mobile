import {StyleSheet} from 'react-native';
import { Colors, View } from 'react-native-ui-lib';
import {useTheme} from "../context/ThemeContext";

const CardContainer = ({children, style}) => {
    const theme = useTheme();
    const styles = styling(theme);
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styling = (theme) => StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: Colors.colourCard,
        borderRadius: 12,
    }
});
export default CardContainer;