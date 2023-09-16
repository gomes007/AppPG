import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabGeneralData from "./tabGeneralData";
import {ProductProvider} from "./ProductContext";
import TabPrice from "./tabPrice";
import TabInventory from "./tabInventory";
import TabPictures from "./tabPictures";


const Tab = createMaterialTopTabNavigator();

const Product = () => {
    return (
        <ProductProvider>
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
            </Tab.Navigator>
        </ProductProvider>
    );
};

export default Product;

