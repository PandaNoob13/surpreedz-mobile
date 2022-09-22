import { useEffect, useState } from 'react';
import useDependency from '../../../shared/hook/UseDependency'


const useHomePage = () => {
    const {homeService} = useDependency();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [posts, setPosts] = useState([])
  
    useEffect(() => { 
        
    }, [posts])

    const onGetService = async () => {
        setLoading(true);
        // console.log("On Get Home Service Called");
        try {
            const response = await homeService.getService()
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

    return {
        posts, onGetService,isLoading
    }
}

export default useHomePage