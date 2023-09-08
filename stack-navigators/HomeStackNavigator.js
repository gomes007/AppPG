import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator()

const Home = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen!</Text>
    </View>
)

const HomeStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name="bars" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;

