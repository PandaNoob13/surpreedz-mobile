const OrderService = ({doPost}) => {
    const postOrderService = async (data) => {
        console.log("Try Order Service Post");
        try {
            return await doPost({url: '/order/create-order', data: data})
        } catch (error) {
            throw error
        }
    }
    return {postOrderService}
  
}

export default OrderService
