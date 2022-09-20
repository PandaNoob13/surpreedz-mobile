import {combineReducers, createStore, compose,applyMiddleware } from "redux";
import orderDetailReducer from "./features/orderpage/state/OrderDetailReducer"
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    orderDetailReducer
})

export const setupStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
}