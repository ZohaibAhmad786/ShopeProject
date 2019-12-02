import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from "../actions/products";
import Product from "../../models/product";
const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    prod => prod.id !== action.pId
                ),
                availableProducts: state.availableProducts.filter(
                    prod => prod.id !== action.pId
                ),


            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imgUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pId
            );
            const updatedProduct = new Product(
                action.pId,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imgUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            );
            const updatedUserProducts = [...state.userProducts];
            console.log('User products '+updatedUserProducts);
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id = action.pId
            );
            const updateAvailableProducts = [...state.availableProducts];
            updateAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updateAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
    return state;
}