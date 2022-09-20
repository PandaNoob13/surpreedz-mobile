import { View, Text } from 'react-native'
import React, { useState } from 'react'

const UseOrderPage = () => {
    const [occasion, onChangeOccasion] = useState('')
    const [recipient, onChangeRecipient] = useState('')
    const [message, onChangeMessage] = useState('')
    const [description, onChangeDescription] = useState('')
    


    return {
        occasion, onChangeOccasion,recipient, onChangeRecipient,message, onChangeMessage,description, onChangeDescription
    }
}



export default UseOrderPage