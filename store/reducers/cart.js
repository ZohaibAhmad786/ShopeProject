import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const priceProduct = addedProduct.price;
            const titleProduct = addedProduct.title;
            let updatedOrNewCartItem;
            if (state.items[addedProduct.id]) {
                //already have the item in the cart we change qty
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].qty + 1,
                    priceProduct,
                    titleProduct,
                    state.items[addedProduct.id].totalAmount + priceProduct
                );
                console.log("isUpdate " + JSON.stringify(updatedOrNewCartItem));
            } else {
                updatedOrNewCartItem = new CartItem(1, priceProduct, titleProduct, priceProduct);
                console.log("isAddedNew Product " + JSON.stringify(updatedOrNewCartItem));
                console.log("isUpdate vannilla javaScript " + [addedProduct.id]);
            }
            console.log('asdasd', { ...state.items });
            return {
                
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + priceProduct
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pId];
            const currenQty = selectedCartItem.qty;
            let updatedCartItems;
            if (currenQty > 1) {
                //need to reduce it
                const updatedCartItem = new CartItem(
                    selectedCartItem.qty - 1,
                    selectedCartItem.prodPrice,
                    selectedCartItem.prodTitle,
                    selectedCartItem.totalAmount - selectedCartItem.prodPrice
                );
                updatedCartItems = { ...state.items, [action.pId]: updatedCartItem }
            } else {
                //erase it
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.pId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.prodPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pId]) {
                return state;
            }
            const updatedItem = { ...state.items }
            const itemTotal = state.items[action.pId].totalAmount;
            delete updatedItem[action.pId];
            return {
                ...state,
                items: updatedItem,
                totalAmount: state.totalAmount - itemTotal
            }

    }
    return state;
}

