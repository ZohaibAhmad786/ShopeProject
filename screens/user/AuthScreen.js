import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import color from '../../constant/color';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from "react-redux";
import * as authActions from '../../store/actions/auth';


export default AuthScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signup(email, password);
        } else {
            action = authActions.login(email, password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#eef3ff']} style={styles.gradient}>
                <View style={styles.authContainer}>
                    <ScrollView>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={(email) => setEmail(email)}
                            placeholder='Email'
                            value={email}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            autoCapitalize='none'
                            onChangeText={(pass) => setPassword(pass)}
                            placeholder='Password'
                            value={password}
                            secureTextEntry
                        />

                        <View style={styles.button}>
                            {
                                isLoading ? <ActivityIndicator size='large' color={color.primary} /> :
                                    <Button title={isSignUp ? 'Sign Up' : 'Login'} color={color.primary} onPress={authHandler} />
                            }
                        </View>
                        <View style={styles.button}>
                            <Button title={`Swicth to ${isSignUp ? 'Login' : 'SignUp'}`} color={color.accent} onPress={() => setIsSignUp(preState => !preState)} />
                        </View>

                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Authenticate'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
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
        padding: 20

    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold'
    },
    input: {
        marginHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,

    },
    button: {
        marginTop: 5,
    }
});
