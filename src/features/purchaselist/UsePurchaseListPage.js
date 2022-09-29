import { useEffect, useState } from "react";
import useDependency from "../../shared/hook/UseDependency"

const usePurchaseListPage = () => {
    const {purchaseListService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [video, setVideo] = useState('');
    const [modalVisible, setModalVisible] = useState(false)


    useEffect(() => { 
        if (posts != null ){
            // console.log("Done set posts : ", posts);
        }
    }, [posts])

    useEffect(() => { 
        if (video !== '') {
        //    console.log('Video',video);
        }
    }, [video])

    const onGetOrder = async () => {
        setLoading(true);
        // console.log("On Get Order Service Called");
        try {
            const response = await purchaseListService.getService()
            // console.log('Response: ', response);
            setPosts(response.data)
            setIsError(false)
        } catch (error) {
            setPosts(error)
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    const onGetVideoResult = async (orderId) => {
        setLoading(true)
        console.log("On get video result called");
        try {
            const response = await purchaseListService.getVideoResult(orderId)
            console.log('Response onGetVideoResult: ', response);
            // const data = response.data
            // setVideo(data)

            setIsError(false)
        } catch (error) {
            setPosts(error)
            console.log('error onGetVideoResult', error);
        } finally {
            setLoading(false)
        }
    }

    const onPlayVideoResult = async (orderId) => {
        setModalVisible(true)
        setLoading(true)
        console.log("On Play video result called");
        try {
            const response = await purchaseListService.playVideoResult(orderId)
            // console.log('Response onGetVideoResult: ', response.data.data_url);
            const data = response.data
            setVideo(data.data_url)
            setIsError(false)
        } catch (error) {
            setPosts(error)
            console.log('error onGetVideoResult', error);
            
        } finally {
            setLoading(false)
        }
    }

    return {
        posts, onGetOrder, onGetVideoResult,isLoading,onPlayVideoResult,video,modalVisible, setModalVisible,setVideo
    }
  
}

export default usePurchaseListPage