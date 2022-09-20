import { View ,StyleSheet} from 'react-native'
import React from 'react'
import { Text } from 'react-native-ui-lib';
import { useTheme } from '../../../shared/context/ThemeContext';
import RequestCard from '../../../shared/components/RequestCard';

const RequestListPage = () => {
    const theme = useTheme();
    const styles = styling(theme);


    return (
        <View>
            <Text colourTextPrimary text40BO marginT-25>Request list</Text>
                        
            {/* <RequestCard openModalDetailOrder={()=> setModalDetailOrder(true)} /> */}
            <View style={{marginVertical:10}}>
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </View>            
        </View>        
    )
}

const styling = (theme) => ( StyleSheet.create({
  subtitle:{
      fontSize:15,
      color: '#ffffff',
      fontWeight:'bold'
   },
   lineStyle:{
      borderWidth: 0.5,
      borderColor:'white',
      alignItems:'flex-start',
      marginRight:16,
      marginTop:8,
      marginBottom:8
  },
  textStyle :{
      fontSize:15,
      color: '#ffffff',
   },
   requestStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 2
   }
}))

export default RequestListPage