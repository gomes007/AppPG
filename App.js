import React, {useEffect, useState} from 'react';

import {Keyboard, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import AuthService from "./src/services/authService";
import {AuthProvider, useAuth} from "./src/services/AuthContext";

import Home from "./src/screens/home";
import SignIn from "./src/screens/SignIn/index";
import Permission from "./src/screens/Permisison/index";
import Product from "./src/screens/Product";
import ProvidersList from "./src/screens/Provider/providerList";
import SearchProvider from "./src/screens/Provider/SearchProvider";
import ProductsProviders from "./src/screens/Products/ProductsProviders";
import ProductsList from "./src/screens/Product/ProductsList";


const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();


const DrawerContent = (props) => {
    const {navigation} = props;

    const navigateToScreen = (route) => {
        navigation.navigate(route);
        navigation.closeDrawer();
    }

    const {setIsAuthenticated} = useAuth();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setIsAuthenticated(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <View style={{flex: 1, zIndex: 100}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerItemContainer}>
                    <DrawerItem
                        icon={() => <Icon name="lock" size={24} color="black"/>}
                        label="Permission"
                        labelStyle={styles.drawerItemLabel}
                        onPress={() => navigateToScreen('Permission')}
                    />
                </View>
                <View style={styles.drawerItemContainer}>
                    <DrawerItem
                        icon={() => <Icon name="product-hunt" size={24} color="black"/>}
                        label="Product"
                        labelStyle={styles.drawerItemLabel}
                        onPress={() => navigateToScreen('Product')}
                    />
                </View>
                <View style={styles.drawerItemContainer}>
                    <DrawerItem
                        icon={() => <Icon name="list" size={24} color="black"/>}
                        label="Providers List"
                        labelStyle={styles.drawerItemLabel}
                        onPress={() => navigateToScreen('ProvidersList')}
                    />
                </View>
                <View style={styles.drawerItemContainer}>
                    <DrawerItem
                        icon={() => <Icon name="line-chart" size={24} color="black"/>}
                        label="ProductsList"
                        labelStyle={styles.drawerItemLabel}
                        onPress={() => navigateToScreen('ProductsList')}
                    />
                </View>
            </DrawerContentScrollView>
            <View style={{paddingBottom: 80}}>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon style={{ marginLeft: 15 }} name="sign-out" size={24} color="black" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const BottomTabs = () => {
    const navigation = useNavigation();
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);

    const {isAuthenticated} = useAuth();

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Keyboard Shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('Keyboard Hidden');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (keyboardStatus === 'Keyboard Shown' || !isAuthenticated) {
        return null;
    }

    if (keyboardStatus === 'Keyboard Shown') {
        return null;
    }

    return (
        <View style={styles.bottomTabs}>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={24} color="black"/>
                <Text style={styles.tabText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
                <Icon name="phone" size={24} color="black"/>
                <Text style={styles.tabText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
                <Icon name="info" size={24} color="black"/>
                <Text style={styles.tabText}>About us</Text>
            </TouchableOpacity>
        </View>
    );
}


const AuthenticatedNavigation = () => {
    return (
        <Drawer.Navigator
            name="Home"
            initialRouteName="Home"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#d40c4f',
                },
                headerTintColor: '#fff',
            }}
        >
            <Drawer.Screen name="Permission" component={Permission}/>
            <Drawer.Screen name="Product" component={Product}/>
            <Drawer.Screen name="ProductsProviders" component={ProductsProviders}/>
            <Drawer.Screen name="ProductsList" component={ProductsList}/>
            <Drawer.Screen name="SearchProvider" component={SearchProvider}/>
            <Drawer.Screen name="Home" component={Home}/>
        </Drawer.Navigator>
    );
}


const UnauthenticatedNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    );
}

const MainNavigator = () => {
    const {isAuthenticated} = useAuth();
    return (
        <View style={{flex: 1}}>
            {isAuthenticated ? <AuthenticatedNavigation/> : <UnauthenticatedNavigation/>}
            {isAuthenticated && <BottomTabs/>}
        </View>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <MainNavigator/>
                </NavigationContainer>
            </SafeAreaView>
        </AuthProvider>
    );
}


const styles = StyleSheet.create({
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 0.5,
        borderTopColor: '#cdc7c7',
        height: 60,
        zIndex: 1,
        backgroundColor: '#e7e6e6',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        zIndex: 1,


    },
    tabText: {
        color: 'black',

    },
    drawerItemContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdc7c7',
        marginLeft: 8,
        marginRight: 15,


    },
    drawerContent: {
        zIndex: 100,
    },
    drawerItemLabel: {
        color: 'black',
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
        letterSpacing: 0.5,
        lineHeight: 24,
    },
    logoutText: {
        marginLeft: 8,
        color: 'black',
        fontSize: 14,
        fontFamily: 'Arial',
    },
});

