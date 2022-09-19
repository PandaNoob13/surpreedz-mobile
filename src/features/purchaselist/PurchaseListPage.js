import { StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { useTheme } from '../../shared/context/ThemeContext';
import MainContainer from '../../shared/components/MainContainer';
import { Text, View } from 'react-native-ui-lib';
import FormTextInput from '../../shared/components/FormTextInput';
import FormButton from '../../shared/components/FormButton';
import PurchasedCard from '../../shared/components/PurchasedCard';

const imageUrl='https://img.okezone.com/content/2022/03/15/33/2561783/musisi-ardhito-pramono-akan-segera-bebas-dari-jerat-hukum-narkoba-PSrk23ID54.jpg'


const PurchaseListPage = () => {
    const theme = useTheme();
    const styles = styling(theme)

    return (
        <MainContainer>
            <ScrollView>
                <View flex paddingH-25 paddingT-120 colourText>
                    <Text colourTextPrimary text20>Purchased List</Text>
                    <View useSafeArea marginV-10>
                        <PurchasedCard imageUrl={imageUrl}></PurchasedCard>
                    
                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
   
}))

export default PurchaseListPage