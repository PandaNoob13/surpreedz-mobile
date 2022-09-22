import { ORDER_ACTION_TYPE } from "../../../shared/constants";

export function addOrder(newOrder) {
    // console.log('addOrder action called');
    return {
        type: ORDER_ACTION_TYPE.ADD_ORDER,
        payload: {
            loading: true,
            data: newOrder,
            errorMessage: false
        }
             
    }
}

export function getOrderDetail() {
    // console.log('getOrder action called');
    const response = addOrder()
    return {
        type: ORDER_ACTION_TYPE.ADD_ORDER,
        payload: {
            loading: true,
            data: false,
            errorMessage: false
        }
             
    }
}