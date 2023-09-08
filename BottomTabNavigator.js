import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookStackNavigator from './stack-navigators/BookStackNavigator';
import ContactStackNavigator from './stack-navigators/ContactStackNavigator';
import HomeStackNavigator from "./stack-navigators/HomeStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Book" component={BookStackNavigator} />
            <Tab.Screen name="Contact" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
