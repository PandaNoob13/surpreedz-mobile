const OrderService = ({doPost}) => {
    const postOrderService = async (data) => {
        console.log("Try Order Service Post");
        console.log("Data in order service: ", data);
        try {
            return await doPost({url: '/order/create-order', data: data})
        } catch (error) {
            throw error
        }
    }
    const postMidtrans = async (data) => {
        console.log("Try Midtrans Post");
        try {
            return await doPost({url: '/order/payment', data: data})
        } catch (error) {
            throw error
        }
    }
    return {postOrderService, postMidtrans}
}

export default OrderService
