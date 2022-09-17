import { useTheme } from "../context/ThemeContext";
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-ui-lib';

const FormButton = ({props, label, onPress}) => {
    const theme = useTheme();
    const styles = styling(theme);
    return (
        <Button 
            {...props}
            text70 
            black 
            borderRadius={8}
            background-colourLight 
            label={label}
            labelStyle={{fontWeight: '800'}}
            onPress={onPress}
            
        />
    );
};

const styling = (theme) => StyleSheet.create({

});
export default FormButton;