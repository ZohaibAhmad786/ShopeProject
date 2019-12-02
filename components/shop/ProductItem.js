import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import color from '../../constant/color';

export default ProductItem = props => {

    let TouchableCamp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCamp = TouchableNativeFeedback
    }
    return (
        <View style={styles.listItem}>
            <View style={styles.touchable}>
                <TouchableCamp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: props.image }} style={styles.image} />
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.action}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCamp>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    listItem: {
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
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow:'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    detail: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})