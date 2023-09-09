import React from 'react';
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useProduct} from './useProduct';
import * as ImagePicker from 'expo-image-picker';


const TabPictures = () => {
    const { uploadedFiles, handleFileChange, removeFile, previews } = useProduct();

    const chooseImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Você precisa permitir o acesso à galeria para continuar!");
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        handleFileChange(pickerResult);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title="Choose image" onPress={chooseImage} />

                <View>
                    {previews.map((preview, index) => (
                        <View key={index} style={styles.previewContainer}>
                            <Image source={{ uri: preview }} style={styles.previewImage} />
                            <TouchableOpacity onPress={() => removeFile(index)}>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default TabPictures;
