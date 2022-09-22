import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = () => {
    const setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            throw e
        }
    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value
            }else{
                return null;
            }
        } catch (e) {
            throw e
        }
    }
    const deleteData = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            throw e
        }
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
        }catch(e){
            throw(e)
        }
    }

    return {
        setData, getData, deleteData,clearStorage
    }
}

export default Storage;