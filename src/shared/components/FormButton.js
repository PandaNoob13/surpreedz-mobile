import {StyleSheet} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {useTheme} from "../context/ThemeContext";

const FormButton = (props) => {
    const theme = useTheme();
    const styles = styling(theme);
    return (
        <Button 
            {...props}
            text70 
            black 
            borderRadius={8}
            background-colourLight 
            label={props.label}
            onPress={props.onPress}
        />
    );
};

const styling = (theme) => StyleSheet.create({

});
export default FormButton;