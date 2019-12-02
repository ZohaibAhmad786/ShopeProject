import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from '../../store/actions/products';
import color from '../../constant/color';


export default EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const prodId = props.navigation.getParam('productId');
    const editProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editProd ? editProd.title : '');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState(editProd ? editProd.imgUrl : '');
    const [description, setDescription] = useState(editProd ? editProd.description : '');
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error]);
    const submitHandler = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (editProd) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        title,
                        description,
                        imgUrl
                    ));
            } else {

                await dispatch(productsActions.createProduct(
                    title,
                    description,
                    imgUrl,
                    +price));
            }
            props.navigation.goBack();
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, prodId, title, description, imgUrl, price, setError, setIsLoading]);


    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    if (isLoading) {
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={color.primary} />
        </View>
    }
    // if(!error){

    // }
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input}
                        value={title}
                        onChangeText={state => setTitle(state)}
                    />
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input}
                        value={imgUrl}
                        onChangeText={state => setImgUrl(state)}
                    />
                </View>

                {
                    editProd ? null : (
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput style={styles.input}
                                value={price}
                                onChangeText={state => setPrice(state)}
                            />
                        </View>
                    )
                }

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input}
                        value={description}
                        onChangeText={state => setDescription(state)}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) => {
    const submitFatchHandler = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName='md-checkmark'
                    onPress={
                        submitFatchHandler
                    }

                />
            </HeaderButtons>
        ),
    }
}
const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
    },
    input: {
        marginHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});