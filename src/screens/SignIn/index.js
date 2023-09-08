import React, {useEffect, useState} from 'react';

import {Button, Text, TouchableOpacity, View} from 'react-native';

import styles from './styles'
import AuthService from '../../services/authService';
import {useAuth} from '../../services/AuthContext';
import {Input} from "../../components/input";


const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    function toggleShowPassword() {
        setshowPassword(!showPassword)
    }


    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [isAuthenticated])



    const handleLogin = async () => {

        console.log("Email: ", email);
        console.log("Password: ", password);

        try {
            const response = await AuthService.login(email, password);

            console.log("API Response: ", response);

            if (response.token) {
                setIsAuthenticated(true);
                navigation.navigate('Home');
                /*
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });

                 */
                console.log(navigation.getState());

            } else {
                setErrorMessage('Erro ao efetuar login. Por favor, tente novamente.');
            }
        } catch (err) {

            console.log("Error: ", err);

            setErrorMessage('Erro ao efetuar login. Por favor, tente novamente.');
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Login</Text>
            </View>
            <View style={styles.inputContent}>
                <View style={styles.firstInput}>
                    <Input
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        isPassword={false}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                    <Input
                        label="Password"
                        keyboardType="default"
                        secureTextEntry={showPassword}
                        showPassword={showPassword}
                        onPress={toggleShowPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        isPassword={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
            </View>
                    <View style={styles.buttonsContainer}>

                        <View style={styles.firstButton}>
                            <Button
                                title="Sing In"
                                onPress={handleLogin}/>
                        </View>

                        <TouchableOpacity style={styles.thirdButton}>
                            <Text style={styles.thirdButtonText}>Forgot password?</Text>
                        </TouchableOpacity>

                    </View>
        </View>

    )
}


export default SignIn;
