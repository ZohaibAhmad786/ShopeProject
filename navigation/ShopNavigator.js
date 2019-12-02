import React from 'react';
import { SafeAreaView, Button, View,AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import color from "../constant/color";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from '../screens/shop/OrderScreen';
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';



let defaultNavigationOption = {
    headerStyle: {
        backgroundColor: color.primary
    },
    headerTintColor: 'white',
}

const ProductNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    CartScreen: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigationOption
});


const OrderNavigator = createStackNavigator({
    OrderScreen: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigationOption
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigationOption
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrderNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: color.primary,

    },
    contentComponent: props => {
        const dispatch=useDispatch();
        return <View style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <Button title='Logout' color={color.primary} onPress={()=>{
                    dispatch(authActions.logout());
                    // AsyncStorage.removeItem('useData');
                    props.navigation.navigate('Auth');
                }}/>
            </SafeAreaView>
        </View>
    }
})


const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavigationOption
});

const Mainavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(Mainavigator);