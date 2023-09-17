import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Row, Table} from "react-native-table-component";
import {Searchbar} from "react-native-paper";
import productService from "../../services/productService";
import Icon from 'react-native-vector-icons/FontAwesome';


const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [providerFilter, setProviderFilter] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [paginationInfo, setPaginationInfo] = useState({
        itemsPerPage: 10,
        currentPage: 1,
        totalRecordsQuantity: 0,
        totalPages: 1,
        previousPage: null,
    });


    const fetchProducts = useCallback(async () => {
        try {
            let fetchedProducts;

            if (nameFilter) {
                const { content } = await productService.searchProductsByName(nameFilter);
                fetchedProducts = content || [];
            } else if (providerFilter) {
                const { content } = await productService.searchProductsByProviderName(providerFilter, page, size);
                fetchedProducts = content || [];
            } else {
                const response = await productService.getAllProductsPages(page, size);
                fetchedProducts = response.items || [];
                setPaginationInfo({
                    itemsPerPage: response.itemsPerPage,
                    currentPage: response.currentPage,
                    totalRecordsQuantity: response.totalRecordsQuantity,
                    totalPages: response.totalPages,
                    previousPage: response.previousPage,
                });
            }

            const fetchAllAttachments = await Promise.all(
                fetchedProducts.map(async product => {
                    const attachments = await productService.getProductAttachmentsById(product.id);
                    return {
                        ...product,
                        images: attachments.map(a => `data:image/jpeg;base64,${a.imageData}`)
                    };
                })
            );

            setProducts(fetchAllAttachments);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [nameFilter, providerFilter, page, size]);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDeleteProduct = (id) => {
        Alert.alert(
            'Are you sure?',
            "You won't be able to revert this!",
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        productService.deleteProduct(id).then(r => {
                            const newProducts = products.filter(product => product.id !== id);
                            setProducts(newProducts);
                        })
                            .catch(error => {
                                console.error("Error deleting product:", error);
                            })
                    }
                }
            ]
        );
    };

    const tableHead = ['Name', 'Image', 'Unit Cost', 'Sales Price', 'Provider', 'Stock', 'Actions'];
    const colWidths = [100, 100, 100, 100, 100, 50, 100];


    function handleEdit(id) {
        return undefined;
    }

    const tableData = products.map((product) => [

        product.productName,
        <Image source={{ uri: product.images[0] }} style={{ width: 30, height: 30 }} />,
        product.price.unitCost,
        product.price.salePrice,
        product.providers.map((provider) => provider.generalInformation.name).join(', '),
        product.inventory.currentQuantity,
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => handleEdit(product.id)}>
                <Icon name="edit" size={20} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteProduct(product.id)}>
                <Icon name="trash" size={20} color="#900" />
            </TouchableOpacity>
        </View>,
    ]);

    return (
        <View style={{ margin: 20 }}>
            <Searchbar
                placeholder="Filter by Name"
                value={nameFilter}
                onChangeText={setNameFilter}
            />


            <View style={{ margin: 0, marginTop: 20 }}>
                <ScrollView>
                    <ScrollView horizontal>
                        <Table>
                            <Row data={tableHead} style={{ height: 40, backgroundColor: '#cdc9c9' }} widthArr={colWidths} />
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        textStyle={{ margin: 6 }}
                                        widthArr={colWidths}
                                        style={{
                                            height: 40,
                                            backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#FFFFFF',
                                        }}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </ScrollView>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setPage(Math.max(page - 1, 1))}>
                    <Icon name="arrow-left" size={30} color="lightblue" />
                </TouchableOpacity>
                <Text>Page {page} of {paginationInfo.totalPages}</Text>
                <TouchableOpacity onPress={() => setPage(Math.min(page + 1, paginationInfo.totalPages))}>
                    <Icon name="arrow-right" size={30} color="lightblue" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductsList;
