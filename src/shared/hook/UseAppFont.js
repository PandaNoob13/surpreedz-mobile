import {useFonts} from 'expo-font';

const useAppFont = () => {
    const [fontsLoaded] = useFonts({
        'fa-brands-400': require('../../../assets/fonts/fa-brands-400.ttf'),
        'fa-regular-400': require('../../../assets/fonts/fa-regular-400.ttf'),
        'fa-solid-900': require('../../../assets/fonts/fa-solid-900.ttf'),
    });
    return fontsLoaded;
}
export default useAppFont;