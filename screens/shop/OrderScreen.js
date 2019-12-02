import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';

export default OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const order = useSelector(state =>
        state.orders.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        setError(null);
        setIsLoading(true);
        try {
            dispatch(orderActions.fetchAllOrder()).then(() => {
                setIsLoading(false);
            }).catch((err) => {
                setError(err.message);
            });
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={color.primary} />
            </View>
        );
    }
    if (order.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No order found. Maybe start order some products?</Text>
            </View>
        )
    }
    return <FlatList data={order}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderItem
                date={itemData.item.readableDate}
                amount={itemData.item.totalAmount}
                items={itemData.item.items}
            />
        )}
    />
}

OrderScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Order Screen',
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