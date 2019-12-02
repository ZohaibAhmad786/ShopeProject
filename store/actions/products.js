import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fecthProducts = () => {
    return async (dispatch,getState) => {
        //any async corde you want!!
        //create folder in firebase 
        const userId=getState().auth.userId;
        try {
            const response = await fetch('https://rn-complete-guid-58735.firebaseio.com/products.json'
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
            //console.log(responseData);


            const loadedProducts = [];
            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    responseData[key].ownerId,
                    responseData[key].title,
                    responseData[key].imgUrl,
                    responseData[key].description,
                    responseData[key].price
                )
                );
            }
            dispatch({ type: SET_PRODUCTS, products: loadedProducts,userProducts:loadedProducts.filter(prod=>prod.ownerId===userId) })
        } catch (error) {
            throw error;
        }
    }
}


export const deleteProduct = productId => {
    return async (dispatch,getState) => {
        const token=getState().auth.token;
        const response = await fetch(`https://rn-complete-guid-58735.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
                method: 'DELETE'
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_PRODUCT, pId: productId });
    }
}
export const createProduct = (title, description, imgUrl, price) => {
    return async (dispatch,getState) => {
        //any async corde you want!!
        //create folder in firebase 
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const response = await fetch(`https://rn-complete-guid-58735.firebaseio.com/products.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl,
                    price,
                    ownerId:userId
                })
            });
        const responseData = await response.json();
        //console.log(responseData);
        dispatch({
            type: CREATE_PRODUCT, productData: {
                id: responseData.name,
                title,
                description,
                imgUrl,
                price,
                ownerId:userId
            }
        });
    };
};
export const updateProduct = (id, title, description, imgUrl) => {
    return async (dispatch,getState) => {
        console.log(getState);
        const token=getState().auth.token;
        const response = await fetch(`https://rn-complete-guid-58735.firebaseio.com/products/${id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl,
                })
            });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            productData: {
                title,
                description,
                imgUrl,
            }
        });
    }
}