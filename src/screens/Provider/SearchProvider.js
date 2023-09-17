import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import providerService from "../../services/providerService";


const SearchProvider = () => {
    const [query, setQuery] = useState('');
    const [providers, setProviders] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState([]);

    const handleSearch = async (text) => {
        setQuery(text);

        if (text === '') {
            setProviders([]);
            return;
        }

        try {
            const response = await providerService.searchProvidersByName(text);
            setProviders(response.content);
        } catch (error) {
            console.error("Provider Search Request failure: ", error.message);
            setProviders([]);
        }
    };

    const selectProvider = (provider) => {
        setSelectedProviders([...selectedProviders, provider]);
        setProviders([]);
    };

    return (
        <View style={{ padding: 20 }}>
            <Searchbar
                placeholder="Search Provider"
                value={query}
                onChangeText={handleSearch}
            />
            <FlatList
                data={providers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => selectProvider(item.generalInformation.name)}
                    >
                        <Text style={{ padding: 10 }}>
                            {item.generalInformation.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 20 }}>
                <Text>Selected Providers:</Text>
                {selectedProviders.map((provider, index) => (
                    <Text key={index}>{provider}</Text>
                ))}
            </View>
        </View>
    );
};

export default SearchProvider;
