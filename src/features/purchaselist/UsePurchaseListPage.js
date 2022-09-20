import { useEffect, useState } from "react";
import useDependency from "../../shared/hook/UseDependency"

const usePurchaseListPage = () => {
    const {purchaseListService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [video, setVideo] = useState('');

    useEffect(() => { 
        if (posts != null ){
            // console.log("Done set posts : ", posts);
        }
    }, [posts])

    useEffect(() => { 
        if (video !== '') {
           
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
            // console.log('Response: ', response);
            const data = response.data
            setVideo(data)
            setIsError(false)
        } catch (error) {
            setPosts(error)
            console.log(error);
            swal({
                title:'Download Failed!',
                text:'An error occured while getting video..',
                icon:'success'
            })
        } finally {
            setLoading(false)
            swal({
                title:'Download Started!',
                text:'Your download should have been started by now!',
                icon:'success'
            })
        }
    }

    return {
        posts, onGetOrder, onGetVideoResult,isLoading
    }
  
}

export default usePurchaseListPage