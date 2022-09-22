import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'

const HeaderPageLabel = ({children}) => {
    const theme = useTheme();
    const styles = styling(theme);

  return (
    <View style={styles.headerStyle}>
             {/* <Text style={styles.textTitle}>{textTitle}</Text>  */}
             {children}
    </View>
  )
}

const styling = (theme) => StyleSheet.create({
    textTitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginRight:8
    },
    headerStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#000000',
        height:50,
    }
   })

export default HeaderPageLabel