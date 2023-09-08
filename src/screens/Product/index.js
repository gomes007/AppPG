import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import tabGeneralData from "./tabGeneralData";
import {ProductProvider} from "./ProductContext";
import tabPrice from "./tabPrice";
import tabInventory from "./tabInventory";


const Tab = createMaterialTopTabNavigator();

const Product = () => {
    return (
        <ProductProvider>
            <Tab.Navigator>
                <Tab.Screen name="General Data" component={tabGeneralData} />
                <Tab.Screen name="Price" component={tabPrice} />
                <Tab.Screen name="Inventory" component={tabInventory} />
            </Tab.Navigator>
        </ProductProvider>
    );
};

export default Product;

