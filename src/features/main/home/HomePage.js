import { View ,StyleSheet, ScrollView, useWindowDimensions, Animated} from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '../../../shared/context/ThemeContext';
import MainContainer from '../../../shared/components/MainContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTE } from '../../../shared/constants';
import ServiceCard from '../../../shared/components/ServiceCard';
import { Text } from 'react-native-ui-lib';

const serviceCardContainerData = {
    picUrl: "https://jabarekspres.com/wp-content/uploads/2020/11/Gisel-.jpg",
    name: "Gisella Anastasiaaaaaaa",
    category: "Aktris",
    currency: "IDR",
    price: 1600000,
    rating: 4.9
}

const HomePage = () => {
    const theme = useTheme();
    const styles = styling(theme)
    const navigation = useNavigation();
    const route = useRoute();
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    return (
        <MainContainer>
            {/* <HeaderPageLabel > 
                <TouchableOpacity onPress={()=>{navigation.navigate(ROUTE.ABOUT,{
                    prevPage:route.name
                })}}>
                    <Text style={styles.textTitle}>How Surpreedz Works</Text>
                </TouchableOpacity>
                <Image source={require('../../../../assets/img/surpreedz-logo.png')} style={{height: 20, width:120, objectFit: "cover"}}></Image>
            </HeaderPageLabel> */}
            <ScrollView>
                <View style={styles.container}>
                    {/* <ServiceCard></ServiceCard>
                    <ServiceCard></ServiceCard>
                    <ServiceCard></ServiceCard> */}
                    <Text colourTextPrimary text40BO>Welcome home!</Text>
                    <ScrollView
                        style={{marginVertical:10}}
                        horizontal={true}
                        // pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                            {
                            nativeEvent: {
                                contentOffset: {
                                x: scrollX
                                }
                            }
                            }
                        ])}
                        scrollEventThrottle={1}
                    >
                        {/* {images.map((image, imageIndex) => {
                            return (
                            <View
                                style={{ width: windowWidth, height: 250 }}
                                key={imageIndex}
                            >
                                <ImageBackground source={{ uri: image }} style={styles.card}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.infoText}>
                                    {"Image - " + imageIndex}
                                    </Text>
                                </View>
                                </ImageBackground>
                            </View>
                            );
                        })} */}
                        <ServiceCard picUrl={serviceCardContainerData.picUrl} name={serviceCardContainerData.name} category={serviceCardContainerData.category} price={serviceCardContainerData.price} onPress={()=>{
                        navigation.navigate(ROUTE.ORDER,{
                            serviceId:10,
                            nameSeller:'Ardhito',
                            locationSeller:'Bangka Belitung',
                            sinceMember:'22 September 2021',
                            prevPage: route.name
                        })
                        }}></ServiceCard>
                        <ServiceCard picUrl={serviceCardContainerData.picUrl} name={serviceCardContainerData.name} category={serviceCardContainerData.category} price={serviceCardContainerData.price}></ServiceCard>
                        <ServiceCard picUrl={serviceCardContainerData.picUrl} name={serviceCardContainerData.name} category={serviceCardContainerData.category} price={serviceCardContainerData.price}></ServiceCard>
                        <ServiceCard picUrl={serviceCardContainerData.picUrl} name={serviceCardContainerData.name} category={serviceCardContainerData.category} price={serviceCardContainerData.price}></ServiceCard><ServiceCard picUrl={serviceCardContainerData.picUrl} name={serviceCardContainerData.name} category={serviceCardContainerData.category} price={serviceCardContainerData.price}></ServiceCard>
                    </ScrollView>
                </View>

                {/* <View>
                <FormButton label="ORDER PAGE" style={{color:'white'}} onPress={()=>{
                    navigation.navigate(ROUTE.ORDER,{
                        serviceId:10,
                        nameSeller:'Ardhito',
                        locationSeller:'Bangka Belitung',
                        sinceMember:'22 September 2021',
                        prevPage: route.name
                    })
                    }}
                ></FormButton>
                </View> */}
            </ScrollView>
        </MainContainer>
    )
}

const styling = (theme) => ( StyleSheet.create({
    textTitle:{
        fontSize:15,
        color: '#ffffff',
        fontWeight:'bold',
        marginRight:8
    },
    container: {
        marginVertical: 25,
        paddingHorizontal: 25,
        // flex: 1,
        // flexDirection:'row',
        // gap: '1rem',
        // flexWrap: "wrap",
        // justifyContent: "space-between",
        // alignItems: "center",
    },
}))

export default HomePage