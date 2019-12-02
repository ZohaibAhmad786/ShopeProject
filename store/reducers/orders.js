import { ADD_ORDER, SET_ORDER } from "../actions/orders";
import { Order } from "../../models/order";

const initialState = {
    orders: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.item,
                action.orderData.amount,
                action.orderData.date
            );
            console.log(newOrder);
            return {
                ...state,
                orders: state.orders.concat(newOrder),//new return array 

            }
            case SET_ORDER:
                return {
                    orders:action.orders
                }
    }
    return state;
}