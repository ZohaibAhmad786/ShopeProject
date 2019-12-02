import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import * as authActions from '../store/actions/auth';
import color from '../constant/color';
import { useDispatch } from "react-redux";

export default StartUpScreen = props => {
    const dispatch = useDispatch();

    const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('userData');
        console.log(userData);
        if (!userData) {
            props.navigation.navigate('Auth');
            return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authActions.authenticate(userId, token, expirationTime));

        if (expirationDate <= new Date() || !token || !userId) {
            props.navigation.navigate('Auth');
            return;
        }
        props.navigation.navigate('Shop');
    }
    useEffect(() => {
        tryLogin();
    }, [dispatch,tryLogin])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color={color.primary} />
        </View>
    )
}