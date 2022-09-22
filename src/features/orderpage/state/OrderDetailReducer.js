import {ORDER_ACTION_TYPE} from "../../../shared/constants"


const orderInitialState = {
    addOrderDataResult: false,
    addOrderLoading:false,
    addOrderError:false
}

const orderDetailReducer = (state = orderInitialState, action) => {
    // console.log('orderDetailReducer called',action);
    switch(action.type){
        case ORDER_ACTION_TYPE.ADD_ORDER:
            return {
                ...state,
                addOrderDataResult: action.payload.data,
                addOrderLoading:action.payload.loading,
                addOrderError:action.payload.errorMessage
            }
        default:
            return state;
    }
  
}

export default orderDetailReducer;
