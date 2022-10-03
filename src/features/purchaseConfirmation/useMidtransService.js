import React, { useEffect, useState } from 'react'
import useDependency from '../../shared/hook/UseDependency';
import usePurchaseListPage from '../purchaselist/UsePurchaseListPage';

const useMidtransService = () => {
    const {orderService} = useDependency();
    const {posts, onGetOrder} = usePurchaseListPage();
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [midPosts, setMidPosts] = useState([])
    const [statMidtrans, setStatMidTrans] = useState(false)

    // useEffect(() => {

    // }, [midPosts]);

    useEffect(() => {
        onGetOrder();
    }, [])

    const onPostMidtrans = async (order_id, email, amount) => {
        setLoading(true);
        console.log("On Post Midtrans Service Called");
        // console.log('post', posts);

        // const arr = posts.map((data) => { 
        //     const account = data.account  
        //     const orders = account.Orders.map((order) => {
        //         return {...order, CreatedAt: new Date(order.CreatedAt)}
        //     })
        //     return orders
        // })

        // const sortedDesc = arr.flat().sort(
        //     (objA, objB) => Number(objB.CreatedAt) - Number(objA.CreatedAt)
        // )
        // console.log('sortedDesc', sortedDesc);

        try {
            console.log("Email in midtrans post service : ", email);
            const response = await orderService.postMidtrans({
                email: email,
                order_id: order_id,
                amount: amount,
            })
            console.log('Response: ', response);
            setMidPosts(response.redirect_url)
            setIsError(false)
            setStatMidTrans(true)
            return response.redirect_url;
        } catch (error) {
            setMidPosts(error)
            console.log(error);
        } finally{
            setLoading(false)
        }   
    }

    return {
        onPostMidtrans, isLoading, midPosts, statMidtrans
    }
}

export default useMidtransService