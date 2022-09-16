import { useState } from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Incubator, Colors, View} from 'react-native-ui-lib';
const { TextField } = Incubator;
import {useTheme} from "../context/ThemeContext";
import {Entypo} from '@expo/vector-icons';

const FormPasswordInput = ({label, value, onChangeText, placeholder='', keyboard = 'default', validate = [], validationMessage = []}) => {
    const theme = useTheme();
    const styles = styling(theme);
    const [hidePass, setHidePass] = useState(true);

    return (
        <TextField 
            text70R 
            labelColor={Colors.colourTextPrimary} 
            labelStyle={styles.labelStyle} 
            placeholderTextColor={Colors.grey50} 
            fieldStyle={styles.withFrame} 
            color={Colors.colourTextPrimary}
            label={label}
            placeholder={placeholder} 
            value={value}
            secureTextEntry={hidePass}
            onChangeText={onChangeText}
            enableErrors 
            // validate={['required', (value) => {
            //     // Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:
            //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            //     return regex.test(value);
            // }]} 
            validate={['required', (value) => value.length > 6]}
            validationMessage={['Password is required', 'Password is invalid']} 
            validateOnChange validationMessageStyle={styles.labelStyle} validationMessagePosition={TextField.validationMessagePositions.TOP}
            keyboardType={keyboard}
            trailingAccessory={
                <Pressable onPress={() => setHidePass(!hidePass)}>
                    <Entypo name={hidePass ? 'eye' : 'eye-with-line'} size={20} color={Colors.grey50}/>
                </Pressable>
            }
        />
    );
};

const styling = (theme) => StyleSheet.create({
    // TextField field styling
    withUnderline: {
        borderBottomWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        paddingBottom: 4
    },
    withFrame: {
        borderWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
        width: "100%",
    },
    // TextField label styling
    labelStyle: {
        paddingLeft: 16,
        paddingBottom: 8,
        fontSize: 14,
    }
});
export default FormPasswordInput;