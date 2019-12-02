import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';
import { useDispatch } from "react-redux";
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import color from '../../constant/color';
import * as productActions from '../../store/actions/products';


export default ProductOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate(
            {
                routeName: 'ProductDetail',
                params: {
                    productId: id,
                    productTitle: title
                }

            })
    }

    const loadProduct = useCallback(async () => {
        console.log('Load Products');
        console.disableYellowBox=true;
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fecthProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setError,setIsRefreshing]);

    //beneath useEffect re-render the component when you are moving between navigations
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProduct);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProduct]);

    //first time when compoent render this call in navigation
    useEffect(() => {
        
        setIsLoading(true);
        loadProduct().then(() => {
            setIsLoading(false);
            
        });
    }, [dispatch, loadProduct,setIsLoading]);



    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={color.primary} />
            </View>
        );
    }
    if (!isLoading && products.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Products Found. Maybe start adding some!</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>An Error Occurred</Text>
                <Button title='Try Again' onPress={loadProduct} color={color.primary} />
            </View>
        );
    }
    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        onRefresh={loadProduct}
        refreshing={isRefreshing}
        renderItem={itemData =>
            <ProductItem
                title={itemData.item.title}
                price={itemData.item.price}
                image={itemData.item.imgUrl}
                onViewDetail={() =>
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }
            >

                <Button
                    color={color.primary}
                    title='View Details'
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                />
                <Button
                    color={color.primary}
                    title='To Cart'
                    onPress={() => dispatch(cartActions.addToCart(itemData.item))}
                />
            </ProductItem>
        }
    />
}
ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName='md-cart'
                    onPress={() => {
                        navData.navigation.navigate({ routeName: 'CartScreen' })
                    }
                    }

                />
            </HeaderButtons>
        ),
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }
                    }

                />
            </HeaderButtons>
        )
    }
}