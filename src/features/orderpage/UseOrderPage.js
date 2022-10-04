import { View, Text } from 'react-native'
import React, { useState } from 'react'

const UseOrderPage = () => {
    const [occasion, onChangeOccasion] = useState('')
    const [recipient, onChangeRecipient] = useState('')
    const [message, onChangeMessage] = useState('')
    const [description, onChangeDescription] = useState('')
    const [buttonDisable, setButtonDisable] = useState({
        birthday: false,
        graduation: false,
        surprise: false,
        other: false,
    })

    return {
        occasion, onChangeOccasion,recipient, onChangeRecipient,message, onChangeMessage,description, onChangeDescription, buttonDisable, setButtonDisable
    }
}



export default UseOrderPage