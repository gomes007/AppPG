import React, {useState} from "react";
import {Text, View} from "react-native";

import {Input} from "../../components/input";
import {Button} from "../../components/button";
import styles from "./styles";

import permissionService from "../../services/permissionService";


export default function Permission() {

    const [permission, setPermission] = useState({
        name: "",
    });

    const handlePermission = (name, value) => {
        setPermission({
            ...permission,
            [name]: value
        });
    }

    const savePermission = async () => {
        try {
            const data = await permissionService.createPermission(permission);
            console.log('Permission registered', data);
            setPermission({
                name: "",
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputContent}>
                <View>
                    <Input
                        label="Permission Name"
                        name='name'
                        autoCapitalize='none'
                        isPassword={false}
                        value={permission.name}
                        onChangeText={(value) => handlePermission('name', value)}
                    />
                </View>
            </View>
            <View style={styles.saveButton}>
                <Button
                    title="Save"
                    onPress={savePermission}
                />
            </View>
        </View>
    )
}
