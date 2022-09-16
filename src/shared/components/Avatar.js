import {Image} from "react-native";

const Avatar = ({imageUrl = ''}) => {
    return (
        <Image
            source={{uri: imageUrl}}
            style={{
                width: 45,
                height: 45,
                borderRadius: 23,
                overflow: 'hidden',
            }}
        />
    )
}

export default Avatar