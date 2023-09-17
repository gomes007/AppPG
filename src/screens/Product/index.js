import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabGeneralData from "./tabGeneralData";
import TabPrice from "./tabPrice";
import TabInventory from "./tabInventory";
import TabPictures from "./tabPictures";
import TabProvider from "./tabProvider";
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import { ProductProvider, ProductContext } from "./ProductContext";

const Tab = createMaterialTopTabNavigator();

const InnerProduct = () => {
    const { handleSubmit } = useContext(ProductContext);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.tabContainer}>
                <Tab.Navigator
                    tabBarOptions={{
                        scrollEnabled: true,
                        style: { backgroundColor: '#F5F5F5' },
                        labelStyle: {
                            textTransform: 'none',
                            fontSize: 14,
                            marginTop: 10
                        },
                        tabStyle: {
                            width: 130,
                        },
                        indicatorStyle: {
                            backgroundColor: '#d40c4f'
                        },
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="General Data" component={TabGeneralData} />
                    <Tab.Screen name="Price" component={TabPrice} />
                    <Tab.Screen name="Inventory" component={TabInventory} />
                    <Tab.Screen name="Pictures" component={TabPictures} />
                    <Tab.Screen name="Provider" component={TabProvider} />
                </Tab.Navigator>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const Product = () => {

    return (
        <ProductProvider>
            <InnerProduct />
        </ProductProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    tabContainer: {
        flex: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 60,
        width: '100%',
    },
});

export default Product;
