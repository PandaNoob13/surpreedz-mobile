const homeService = ({doGet}) => {
    const getService = async () => {
        // console.log("Try Getting Service Cards");
        try {
            const page = 1;
            const limit = 100;
            return await doGet({url: `/service-detail/homepage/?page=${page}&limit=${limit}`})
        } catch (error) {
            throw error
        }
    }
    return {getService}
  
}

export default homeService