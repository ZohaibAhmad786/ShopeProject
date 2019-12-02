import React from 'react';
import { Text, View, StyleSheet, Image, Button, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import color from '../../constant/color';
import {  useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart';

export default ProductDetailScreen = props => {
    const { navigation } = props;
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(
            prod => prod.id === productId
        )
    );

    const dispatch=useDispatch();

    return (
        <ScrollView>
            <Image style={styles.imgContainer} source={{ uri: selectedProduct.imgUrl }} />
            <View style={styles.actions}>
            <Button color={color.primary} title='Add to Cart' onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct)); 
             }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}
ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({
    imgContainer: {
        height: 300,
        width: '100%'
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        color: '#888',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    actions:{
        alignItems:'center',
        marginVertical:10
    }
});