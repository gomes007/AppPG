import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import tabGeneralData from "./tabGeneralData";
import {ProductProvider} from "./ProductContext";
import tabPrice from "./tabPrice";
import tabInventory from "./tabInventory";
import tabPictures from "./tabPictures";


const Tab = createMaterialTopTabNavigator();

const Product = () => {
    return (
        <ProductProvider>
            <Tab.Navigator>
                <Tab.Screen name="General Data" component={tabGeneralData} />
                <Tab.Screen name="Price" component={tabPrice} />
                <Tab.Screen name="Inventory" component={tabInventory} />
                <Tab.Screen name="Pictures" component={tabPictures} />
            </Tab.Navigator>
        </ProductProvider>
    );
};

export default Product;

