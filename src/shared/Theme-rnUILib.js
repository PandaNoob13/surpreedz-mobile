import {Typography, Colors, Spacings, Assets, ThemeManager} from 'react-native-ui-lib';


export const themeRnUILib = () => {
    Colors.loadColors({
        colourBg: "#212121",
        colourCard: "#373535",
        colourTextPrimary: "white",
        colourTextSecondary: "white, .6",        
        colourNav: "black",
        colourLight: "#F8F9FA",
    });

    Typography.loadTypographies({
        // h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
        // h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
    });

    Spacings.loadSpacings({
        // screenOffset: 30,
    })

    Assets.loadAssetsGroup('backgrounds', {
        // wet: require('../assets/background.jpg'),
    });

    ThemeManager.setComponentTheme('Text', (props, context) => {

        return {
        // h1: true,
        // gold: true,
        // h2: props.secondary,
        // pink: props.secondary,
        };
    });
};