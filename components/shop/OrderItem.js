import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import color from '../../constant/color';
import CartItem from '../shop/CartItem';



export default OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={color.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
                title={showDetails ? 'Hide Details' : 'Show Deatil'} />
            {
                showDetails && <View>
                    {
                        props.items.map(cartItem =>
                            <CartItem key={cartItem.productId}
                                qty={cartItem.productTQuantity}
                                amount={cartItem.totalAmount}
                                title={cartItem.productTitle}
                            />
                        )
                    }
                </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    orderItem: {
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
        margin: 20,
        padding: 10,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: '#888'
    }
});