import { useState } from 'react';
import {StyleSheet} from 'react-native';
import {Incubator, Colors} from 'react-native-ui-lib';
const { TextField } = Incubator;
import {useTheme} from "../context/ThemeContext";

const FormTextInput = ({label, value, onChangeText, placeholder='', keyboard = 'default', enableErrors = false, validate = [], validationMessage = []}) => {
    const theme = useTheme();
    const styles = styling(theme);
    return (
        <TextField 
            text70R 
            labelColor={Colors.colourText} 
            labelStyle={styles.labelStyle} 
            placeholderTextColor={Colors.grey50} 
            fieldStyle={styles.withFrame} 
            color={Colors.colourText}
            label={label}
            placeholder={placeholder} 
            value={value}
            onChangeText={onChangeText}
            enableErrors={enableErrors}
            validate={validate}
            validationMessage={validationMessage}
            validateOnChange validationMessageStyle={styles.labelStyle} validationMessagePosition={TextField.validationMessagePositions.TOP}
            keyboardType={keyboard}
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
    },
    withFrameError: {
        borderColor: Colors.red1,
    },
    // TextField label styling
    labelStyle: {
        paddingLeft: 16,
        paddingBottom: 8,
        fontSize: 14,
    }
});
export default FormTextInput;