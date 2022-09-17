import React from 'react';
import {Text, View} from "react-native";

const TitleLabel = ({text, titleStyle = {}}) => {
    return (
        <View>
            <Text style={titleStyle}>{text}</Text>
        </View>
    );
};
export default TitleLabel;
