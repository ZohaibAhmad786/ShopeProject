import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.qty} </Text>
                <Text style={styles.mainTitle}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainTitle}>{props.amount.toFixed(2)}</Text>
                {props.deletable &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name='md-trash'
                            size={23}
                            color='red'
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontSize: 16,
        color: '#888',
        margin: 2
    },
    mainTitle: {
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20
    }
});