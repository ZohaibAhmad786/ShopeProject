import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator,Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import color from '../../constant/color';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';


export default CartScreen = props => {
    const cartTotalAcount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const cartItems = useSelector(state => {
        const tranformedCartItems = [];
        for (const key in state.cart.items) {
            tranformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].prodTitle,
                productPrice: state.cart.items[key].prodPrice,
                productTQuantity: state.cart.items[key].qty,
                totalAmount: state.cart.items[key].totalAmount

            });
        }
        return tranformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    })
  

    const sendOrderHandler = async () => {
        setError(null);
        setIsLoading(true);
        try {

            await dispatch(orderActions.addOrder(cartItems, cartTotalAcount));
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error]);



    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.amount}>${Math.round(cartTotalAcount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='large' color={color.primary} />:
                <Button
                    color={color.accent}
                    title='Order Now'
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}
                />
                }
            </View>
            <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData =>
                <CartItem
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }}
                    qty={itemData.item.productTQuantity}
                    amount={itemData.item.totalAmount}
                    title={itemData.item.productTitle}
                    deletable={true}
                />
            }
            />
        </View>
    )
}
CartScreen.navigationOptions = () => {
    return {
        headerTitle: 'Your Carts',

    }
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
    },
    amount: {
        color: color.primary
    }

});