import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="HomeTab">
            <Drawer.Screen name="HomeTab" component={BottomTabNavigator} />
            {/* Outros Drawer.Screens podem ser adicionados aqui */}
        </Drawer.Navigator>
    );
};

export default MainNavigator;
