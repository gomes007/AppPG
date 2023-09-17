import React, {useEffect, useState} from 'react';

import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import providerService from "../../services/providerService";
import {Row, Rows, Table} from "react-native-table-component";
import Icon from "react-native-vector-icons/FontAwesome";
import {Searchbar} from "react-native-paper";


export default function ProvidersList({ navigation }) {


    const [providers, setProviders] = useState([]);
    const [companyTypeFilter, setCompanyTypeFilter] = useState('all');
    const [situationFilter, setSituationFilter] = useState('all');
    const [nameFilter, setNameFilter] = useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const applyFilters = (items) => {
        let filteredProviders = items;

        if (nameFilter) {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        if (companyTypeFilter !== 'all') {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.companyType.toLowerCase() === companyTypeFilter.toLowerCase());
        }

        if (situationFilter !== 'all') {
            filteredProviders = filteredProviders.filter(provider => provider.generalInformation.situation.toLowerCase() === situationFilter.toLowerCase());
        }

        return filteredProviders;
    }

    useEffect(() => {
        providerService.getAllProviders(currentPage + 1, itemsPerPage)
            .then(data => {
                console.log("data", data);
                if (data && Array.isArray(data.items)) {
                    const filteredProviders = applyFilters(data.items);
                    setProviders(filteredProviders);
                    console.log("filteredProviders", filteredProviders);
                    setTotalPages(data.totalPages || 1);
                } else {
                    console.error("Unexpected response data:", data ? data.items : 'data is undefined');
                }
            })
            .catch(error => {
                console.error("Error retrieving providers: ", error);
            });
    }, [currentPage, nameFilter, companyTypeFilter, situationFilter]);


    const handleEdit = id => {
        navigation.navigate('ProviderDetail', { id });
    };

    const handleDeleteProvider = id => {
        Alert.alert(
            'Are you sure?',
            "You won't be able to revert this provider!",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        providerService.deleteProvider(id)
                            .then(() => {
                                const newProviders = providers.filter(provider => provider.id !== id);
                                setProviders(newProviders);
                            })
                            .catch(error => {
                                console.error("Error deleting provider: ", error);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };


    //begin table
    const tableHead = ['Name', 'Email', 'Company Type', 'Phone', 'Actions'];

    const colWidths = [100, 100, 120, 50, 100];

    const tableData = providers.map((provider) => [
        provider.generalInformation.name,
        provider.generalInformation.email,
        provider.generalInformation.companyType,
        provider.generalInformation.contactphone,
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => handleEdit(provider.id)}>
                <Icon name="edit" size={20} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteProvider(provider.id)}>
                <Icon name="trash" size={20} color="#900" />
            </TouchableOpacity>
        </View>,
    ]);
    //end table

    return (
        <View style={{ margin: 20 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <Searchbar
                    placeholder="Filter by Name"
                    value={nameFilter}
                    onChangeText={setNameFilter}
                />

                <Text style={{ marginRight: 10,marginTop: 15 }}>Filter by Type:</Text>

                <Picker
                    selectedValue={companyTypeFilter}
                    onValueChange={(itemValue) => setCompanyTypeFilter(itemValue)}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Person" value="PERSON" />
                    <Picker.Item label="Company" value="COMPANY" />
                </Picker>

                <Text style={{ marginRight: 10 }}>Filter by situation:</Text>
                <Picker
                    selectedValue={situationFilter}
                    onValueChange={(itemValue) => setSituationFilter(itemValue)}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Active" value="ACTIVE" />
                    <Picker.Item label="Inactive" value="INACTIVE" />
                </Picker>

            </View>

            <View style={{ margin: 0, marginTop: 20}}>
                <ScrollView>
                    <ScrollView horizontal>
                        <Table>
                            <Row data={tableHead} style={{ height: 40, backgroundColor: '#a09e9e' }} widthArr={colWidths} />
                            <Rows data={tableData} textStyle={{ margin: 6 }} widthArr={colWidths} />
                        </Table>
                    </ScrollView>
                </ScrollView>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)}>
                    <Icon name="arrow-left" size={30} color="lightblue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)}>
                    <Icon name="arrow-right" size={30} color="lightblue" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
