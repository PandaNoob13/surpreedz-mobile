import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardContainer from './CardContainer'
import { useTheme } from '../context/ThemeContext';
import FormTextInput from './FormTextInput';

const PersonalisedMessageCard = (props) => {
    const theme = useTheme();
    const styles = styling(theme)
    const {recipient, message, description, onChangeRecipient, onChangeMessage, onChangeDescription} = props
    return (
        <CardContainer style={{marginVertical: 4}}> 
            <View>
                <Text style={styles.subtitle}>
                        Your Personalised Message
                </Text>
            </View>
            <View>
                <FormTextInput 
                    label={'Who is this message for ?'}
                    value={recipient} 
                    onChangeText={onChangeRecipient}
                    />

                    <FormTextInput 
                    label={`What should ${props.orderParam.nameSeller} say to the person ?`}
                    value={message}
                    onChangeText={onChangeMessage}
                    multiline
                    />

                    <FormTextInput 
                    label={`What should ${props.orderParam.nameSeller} know about the person?`}
                    value={description} 
                    onChangeText={onChangeDescription}
                    multiline
                    />
            </View>
        </CardContainer>
    )
}

export default PersonalisedMessageCard

const styling = (theme) => ( StyleSheet.create({
    subtitle:{
        textAlign:'center',
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginBottom: 8,
    },
}))