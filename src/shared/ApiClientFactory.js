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
  
    return {doPost, doGet, doDelete, doPut}
}

export default apiClientFactory;
