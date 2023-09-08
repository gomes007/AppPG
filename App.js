import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import BookStackNavigator from './stack-navigators/BookStackNavigator';
import ContactStackNavigator from './stack-navigators/ContactStackNavigator';
import LocationsStackNavigator from "./stack-navigators/LocationsStackNavigator";
import MyRewardsStackNavigator from "./stack-navigators/MyRewardsStackNavigator";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
};

const AnotherScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Another Screen</Text>
        </View>
    );
};

const DrawerContent = (props) => {
    const { navigation } = props;
    const navigateToScreen = (route) => {
        navigation.navigate(route);
        navigation.closeDrawer();
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem label="Home" onPress={() => navigateToScreen('Home')} />
            <DrawerItem label="MyRewards" onPress={() => navigateToScreen('MyReward')} />
            <DrawerItem label="Book" onPress={() => navigateToScreen('Books')} />
        </DrawerContentScrollView>
    );
};

const BottomTabs = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomTabs}>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Location" onPress={() => navigation.navigate('Location')} />
            <Button title="Contact" onPress={() => navigation.navigate('Contact')} />
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Another" component={AnotherScreen} />
                        <Drawer.Screen name="Books" component={BookStackNavigator} />
                        <Drawer.Screen name="Contact" component={ContactStackNavigator} />
                        <Drawer.Screen name="Location" component={LocationsStackNavigator} />
                        <Drawer.Screen name="MyReward" component={MyRewardsStackNavigator} />
                    </Drawer.Navigator>
                    <BottomTabs />
                </View>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
