import { useEffect, useState } from 'react'
import Storage from '../../shared/Storage';
import useDependency from '../../shared/hook/UseDependency';
import { KEY } from '../../shared/constants';
import { Keyboard } from 'react-native';


const UseEditProfilePage = () => {
    const storage = Storage();
    const {editProfileService} = useDependency();
    const [isLoading,setLoading] = useState(false);
    const [isError, setIsError] = useState(true);
    const [data, setData] = useState({});
    const [posts, setPosts] = useState({});
    const [uploadStatus, setUploadStatus] = useState(false);

    const handleSetItem = async () => {
        await storage.setData(KEY.ACCOUNTNAME, data.name);
        await storage.setData(KEY.ACCOUNT_LOCATION,data.location);
    }

    const handleSetPhotoProfile = async () => {
        const dataUrlSeparated = data.dataUrl.split(',')
        await storage.setData(KEY.PHOTO_PROFILE, dataUrlSeparated[1]);
    }

    useEffect(()=>{
        if (isError === false) {
            handleSetItem();
            if (data.dataUrl != undefined) {
                console.log("Data url empty : ", data.dataUrl);
                console.log("Dataurl is not empty!");
                handleSetPhotoProfile();
            }
        }
    },[isError,data])


    const onPutProfile = async (name,location, photo, photoName, url, dataUrl) => {
        Keyboard.dismiss();
        setLoading(true);
        console.log("On Put Profile Called");
        console.log('islOading edit profile', isLoading);
        try {
            console.log('On Put Profile Called => Try');
            const accountId = await storage.getData(KEY.ACCOUNT_ID)
            const response = await editProfileService.putProfile({
                account_id : parseInt(accountId),
                name :name,
                location : location,
                photo_name: photoName,
                url: url,
                data_url: dataUrl
            })
            setPosts(response.status);
            console.log('response.status)', response);
            setData({
                name: name,
                location: location,
                photo_name: photoName,
                url: url,
                data_url: dataUrl
            })
            setUploadStatus(!uploadStatus)
            setIsError(false)
            console.log(' finish update');
        } catch (error) {
            setPosts(error);
        }finally{
            setLoading(false)
        }
    }

    return {
        onPutProfile, isLoading
    }
    
  
}

export default UseEditProfilePage