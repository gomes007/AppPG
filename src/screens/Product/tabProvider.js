import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import serviceProvider from '../../services/providerService';
import { ProductContext } from './ProductContext';
import styles from './styles';

const TabProvider = () => {
    const { provider, handleProvider, selectedProviders, setSelectedProviders } = useContext(ProductContext);
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

    return (
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
    );
};

export default TabProvider;
