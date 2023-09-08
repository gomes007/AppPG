import React from 'react';
import {View} from 'react-native';
import {useProduct} from './useProduct';
import {Input} from "../../components/input";
import styles from './styles'

const TabGeneralData = () => {
    const { product, handleProduct } = useProduct();

    return (
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
            </View>


        </View>
    );
};

export default TabGeneralData;
