import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import ProductService from "../../services/productService";
import styles from "../Product/styles";
import {Input} from "../../components/input";
import FieldForm from "../../components/form";
import CheckBox from "react-native-checkbox";
import * as ImagePicker from "expo-image-picker";
import serviceProvider from "../../services/providerService";
import {Searchbar} from "react-native-paper";


const ProductsProviders = () => {

    const [product, setProduct] = useState({
        productName: '',
        barCode: '',
        weight: '',
        height: '',
        length: '',
        description: '',
        commission: ''
    });

    const [details, setDetails] = useState({
        enabled: false,
        soldSeparately: false,
        enabledOnPDV: false,
    });

    const [price, setPrice] = useState({
        unitCost: 0,
        additionalCost: 0,
        finalCost: 0,
        profitPercent: 0,
        salePrice: 0,
    });

    const [prices, setPrices] = useState({
        unitCost: price.unitCost || "",
        additionalCost: price.additionalCost || "",
        profitPercent: price.profitPercent || ""
    });

    useEffect(() => {
        (async () => {
            for (const [key, value] of Object.entries(prices)) {
                await handlePrice(key, value);  // Adicionando await aqui
            }
        })();
    }, [prices]);




    const [inventory, setInventory] = useState({
        minQuantity: 0,
        maxQuantity: 0,
        currentQuantity: 0,
    });

    const [inventories, setInventories] = useState({
        minQuantity: inventory.minQuantity || "",
        maxQuantity: inventory.maxQuantity || "",
        currentQuantity: inventory.currentQuantity || "",
    });

    useEffect(() => {
        for (const [key, value] of Object.entries(inventories)) {
            handleInventory(key, value);
        }
    }, [inventories]);

    //provider
    const [provider, setProvider] = useState(null);
    const [selectedProviders, setSelectedProviders] = useState([]);


    const handleProvider = (selectedProvider) => {
        setProvider(selectedProvider);
    };


    const [input, setInput] = useState('');
    const [providers, setProviders] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        const fetchProviders = async () => {
            if (input.length < 1) {
                setProviders([]);
                setShowDropdown(false);
                return;
            }
            const data = await serviceProvider.searchProvidersByName(input);
            setProviders(data.content || []);
            setShowDropdown(true);
        };
        fetchProviders();
    }, [input]);

    const selectProvider = (selectedProvider) => {
        setSelectedProviders([...selectedProviders, selectedProvider]);
        handleProvider(selectedProvider);
        setInput('');
        setShowDropdown(false);
    };
    //end provider


    //images
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const isValidFileExtension = (filename) => {
        const validExtensions = ['jpg', 'jpeg', 'gif', 'png'];
        const fileExtension = filename.split('.').pop().toLowerCase();
        return validExtensions.includes(fileExtension);
    };

    const handleFileChange = (pickerResult) => {
        if (!pickerResult.uri) {
            console.error("Objeto de resposta inválido recebido em handleFileChange.");
            return;
        }

        setUploadedFiles([...uploadedFiles, pickerResult.uri]);
        setPreviews([...previews, pickerResult.uri]);
    };


    const removeFile = (index) => {
        setUploadedFiles(files => files.filter((file, i) => i !== index));
        setPreviews(files => files.filter((file, i) => i !== index));
    }

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
    //end images


    const handleProduct = (name, value) => {
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleDetails = (e) => {
        const name = e.target.name;
        const currentValue = details[name];
        setDetails({
            ...details,
            [name]: !currentValue
        });
    };


    const handlePrice = async (name, value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
            // Handle invalid number input, if necessary
            return;
        }

        let updatePrice = {...price, [name]: parsedValue};

        if (['unitCost', 'additionalCost', 'profitPercent'].includes(name)) {
            const calculatedPrice = await ProductService.calculateProductPrice(updatePrice);
            updatePrice = {...calculatedPrice};
        }

        setPrice(updatePrice);
    };


    const handleInventory = (name, value) => {
        setInventory({
            ...inventory,
            [name]: value
        });
    };


    const handleSubmit = async () => {

        console.log('handleSubmit called');

        const preparedProduct = {
            ...product,
            commission: parseFloat(product.commission),
            weight: parseFloat(product.weight),
            height: parseFloat(product.height),
            length: parseFloat(product.length),
        };

        const data = {
            ...preparedProduct,
            details,
            price,
            inventory,
            providers: selectedProviders.map(provider => ({id: provider.id}))
        };



        console.log('Data prepared:', data);

        try {
            console.log('Trying to save product...');
            const response = await ProductService.saveProduct(data, uploadedFiles);
            console.log('Response received:', response);

            if (response) {
                Alert.alert(
                    'Sucesso',
                    'Produto cadastrado com sucesso!',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                );
            } else {
                Alert.alert(
                    'Erro',
                    'Erro ao salvar produto!',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                );
            }
        } catch (error) {
            console.error("Detailed error:", error, error.message, JSON.stringify(error));
            Alert.alert(
                'Erro',
                'Ocorreu um erro inesperado!',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            );
        }
    };


    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.nomeInput}>
                <Input
                    label="Product Name"
                    name='name'
                    autoCapitalize='none'
                    isPassword={false}
                    value={product.productName}
                    onChangeText={(value) => handleProduct('productName', value)}
                />
                <Input
                    label="Bar code"
                    name='barCode'
                    autoCapitalize='none'
                    isPassword={false}
                    value={product.barCode}
                    onChangeText={(value) => handleProduct('barCode', value)}
                />
                <Input
                    label="Commission (%)"
                    name='commission'
                    autoCapitalize='none'
                    isPassword={false}
                    value={product.commission}
                    onChangeText={(value) => handleProduct('commission', value)}
                />
                <View style={styles.row}>
                  <View style={styles.half}>
                    <Input
                        label="Weight"
                        name='weight'
                        autoCapitalize='none'
                        isPassword={false}
                        value={product.weight}
                        onChangeText={(value) => handleProduct('weight', value)}
                    />
                  </View>
                  <View style={styles.half}>
                    <Input
                        label="Height"
                        name='height'
                        autoCapitalize='none'
                        isPassword={false}
                        value={product.height}
                        onChangeText={(value) => handleProduct('height', value)}
                    />
                  </View>
                  <View style={styles.half}>
                    <Input
                        label="Length"
                        name='length'
                        autoCapitalize='none'
                        isPassword={false}
                        value={product.length}
                        onChangeText={(value) => handleProduct('length', value)}
                    />
                  </View>

                </View>
                <View style={styles.row}>
                  <FieldForm
                      label="Description"
                      name='description'
                      type='textarea'
                      value={product.description}
                      onChange={(value) => handleProduct('description', value)}
                  />
                </View>
              </View>


                <View style={styles.nomeInput}>
                    <Input
                        label="Min Quantity"
                        name='minQuantity'
                        keyboardType='numeric'
                        value={String(inventories.minQuantity)}
                        onChangeText={(text) => setInventories(prev => ({...prev, minQuantity: text}))}
                    />
                    <Input
                        label="Max Quantity"
                        name='maxQuantity'
                        keyboardType='numeric'
                        value={String(inventories.maxQuantity)}
                        onChangeText={(text) => setInventories(prev => ({...prev, maxQuantity: text}))}
                    />
                    <Input
                        label="Current Quantity"
                        name='currentQuantity'
                        keyboardType='numeric'
                        value={String(inventories.currentQuantity)}
                        onChangeText={(text) => setInventories(prev => ({...prev, currentQuantity: text}))}
                    />
                    <View style={styles.row2}>
                        <View>
                            <CheckBox
                                label="Enabled"
                                name='enabled'
                                checked={details.enabled}
                                onChange={() => handleDetails({target: {name: 'enabled', value: !details.enabled}})}
                            />
                        </View>
                        <View >
                            <CheckBox
                                label="Sold Separately"
                                name='soldSeparately'
                                checked={details.soldSeparately}
                                onChange={() => handleDetails({
                                    target: {
                                        name: 'soldSeparately',
                                        value: !details.soldSeparately
                                    }
                                })}
                            />
                        </View>
                        <View>
                            <CheckBox
                                label="Enabled PDV"
                                name='enabledOnPDV'
                                checked={details.enabledOnPDV}
                                onChange={() => handleDetails({
                                    target: {
                                        name: 'enabledOnPDV',
                                        value: !details.enabledOnPDV
                                    }
                                })}
                            />
                        </View>
                    </View>
                </View>


                <View style={styles.nomeInput}>
                    <Input
                        label="Unit Cost"
                        name='unitCost'
                        keyboardType='numeric'
                        value={String(prices.unitCost)}
                        onChangeText={(text) => setPrices(prev => ({...prev, unitCost: text}))}
                    />
                    <Input
                        label="Additional Cost"
                        name='additionalCost'
                        keyboardType='numeric'
                        value={String(prices.additionalCost)}
                        onChangeText={(text) => setPrices(prev => ({...prev, additionalCost: text}))}
                    />
                    <Input
                        label="Final Cost"
                        name='finalCost'
                        keyboardType='numeric'
                        value={String(price.finalCost)}
                        editable={false}
                    />
                    <Input
                        label="Profit Percent"
                        name='profitPercent'
                        keyboardType='numeric'
                        value={String(prices.profitPercent)}
                        onChangeText={(text) => setPrices(prev => ({...prev, profitPercent: text}))}
                    />
                    <Input
                        label="Sale Price"
                        name='salePrice'
                        keyboardType='numeric'
                        value={String(price.salePrice)}
                        editable={false}
                    />
                </View>


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


                <View style={styles.container2}>
                    <View style={styles.searchContainer}>
                        <Searchbar
                            style={styles.searchbar}
                            placeholder="Type to search for providers..."
                            value={input}
                            onChangeText={text => setInput(text)}
                        />
                    </View>

                    {showDropdown && (
                        <View style={styles.listContainer}>
                            <FlatList
                                data={providers}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.listItem} onPress={() => selectProvider(item)}>
                                        <Text style={styles.listItemText}>{item.generalInformation.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}

                    <View style={styles.selectedContainer}>
                        <Text style={styles.selectedText}>Selected Providers:</Text>
                        {selectedProviders.map((provider, index) => (
                            <View key={index} style={styles.selectedItem}>
                                <Text style={{ flex: 4 }}>{provider.generalInformation.name}</Text>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        setSelectedProviders(selectedProviders.filter(p => p.id !== provider.id));
                                    }}
                                >
                                    <Text style={styles.removeButton}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

export default ProductsProviders;
