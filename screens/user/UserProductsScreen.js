
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Button, ActivityIndicator, Alert, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import color from '../../constant/color';
import * as productsAction from "../../store/actions/products";

export default UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate(
            {
                routeName: 'EditProduct',
                params: {
                    productId: id,
                }

            })
    }


    const deleteProductHandler = async (itemData) => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productsAction.deleteProduct(itemData));
            deleteProductHandler
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);

    };


    useEffect(() => {
        if (error) {
            Alert.alert('An error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error]);

    if (isLoading) {
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={color.primary} />
        </View>
    }

    if (userProduct.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No product found. Maybe create some?</Text>
            </View>
        )
    }

    return <FlatList data={userProduct} keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imgUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id)
                }}
            >
                <Button
                    color={color.primary}
                    title='Edit'
                    onPress={() => { editProductHandler(itemData.item.id) }}
                />
                <Button
                    color={color.primary}
                    title='Delete'
                    onPress={() => deleteProductHandler(itemData.item.id)}
                />
            </ProductItem>
        }
    />
}
UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
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
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Addd'
                    iconName='md-create'
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }
                    }

                />
            </HeaderButtons>
        )
    }
}