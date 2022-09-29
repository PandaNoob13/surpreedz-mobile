import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const apiClientFactory = (client) => {
    const doPost = async ({url = '', data = null}) => {
        // console.log('data api client factory =>', data);
        try {
            const response = await client.post(url, data);
            return response.data;
        } catch (error) {
            throw error
        }
        
    }
    const doGet = async ({url = ''}) => {
        try {
            const response = await client.get(url);
            return response.data;
        } catch (error) {
            throw error
        }

    }
    const doDelete = async ({url='', data = null}) => {
        try {
            const response = await client.delete(url, {
                headers: {
                },
                data: data
            });
            return response.data
        } catch (error) {
            throw error
        }
    }
    const doPut = async ({url='', data=null}) => {
        try {
            const response = await client.put(url, data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    const doDownloadVideo = async ({url = ''}) => {
        const initialDir = FileSystem.StorageAccessFramework.getUriForDirectoryInRoot('Expo');
        console.log('initialDir => ', initialDir);

        try {
            const dirPermission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(initialDir);
            console.log('dirPermission => ',dirPermission);
            console.log('dirPermission directoryUri => ',dirPermission.directoryUri);

            if (!dirPermission.granted) {
                console.log('not permitted');
                return
            }

            const fileLoc = `${FileSystem.cacheDirectory}` ;
            // Disini terpilih lokasi filenya terus proses download berlangsung
            console.log('fileLoc => ', fileLoc);

            const response = await client.get(url);
            const data = response.data
            // console.log('type ', response.data.data.data_url);
            const base64Code = response.data.data.data_url;
            const filename = response.data.data.video_link;

            
            const newFile = await FileSystem.StorageAccessFramework.createFileAsync(dirPermission.directoryUri,filename,'video/mp4');
            console.log('newFile',newFile);
            await FileSystem.writeAsStringAsync(newFile,base64Code,{
                encoding: FileSystem.EncodingType.Base64,
              });
            console.log('DONE');
            return true


        } catch (error) {
            console.log('error Api Client Factory', error);
            throw error
        }
    }
  
    return {doPost, doGet, doDelete, doPut, doDownloadVideo }
}

export default apiClientFactory;
