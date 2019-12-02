
import { Order } from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';


export const fetchAllOrder = () => {
    return async (dispatch,getState) => {
        const userId=getState().auth.userId;
        try {
            const response = await fetch(`https://rn-complete-guid-58735.firebaseio.com/orders/${userId}.json`
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
            //console.log(responseData);


            const loadedOrders = [];
            for (const key in responseData) {
                console.log(key);
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].cartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date)
                    )
                );
            }
            dispatch({
                type: SET_ORDER, orders: loadedOrders
            });
        } catch (err) {
            throw new Error('');
        }
    }
}
export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch,getState) => {
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const date = new Date();

        const response = await fetch(`https://rn-complete-guid-58735.firebaseio.com/orders/${userId}.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        
        const responseData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: responseData.name,
                item: cartItems,//retireve total carts
                amount: totalAmount,//total amount
                date: date
            }
        });
    }

}