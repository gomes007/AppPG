import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useProduct} from './useProduct';
import {Input} from '../../components/input';
import styles from './styles';

const TabPrice = () => {
    const { price, handlePrice } = useProduct();

    const [prices, setPrices] = useState({
        unitCost: price.unitCost || "",
        additionalCost: price.additionalCost || "",
        profitPercent: price.profitPercent || ""
    });

    useEffect(() => {
        for (const [key, value] of Object.entries(prices)) {
            handlePrice(key, value);
        }
    }, [prices]);

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.nomeInput}>
                <Input
                    label="Unit Cost"
                    name='unitCost'
                    keyboardType='numeric'
                    value={String(prices.unitCost)}
                    onChangeText={(text) => setPrices(prev => ({ ...prev, unitCost: text }))}
                />
                <Input
                    label="Additional Cost"
                    name='additionalCost'
                    keyboardType='numeric'
                    value={String(prices.additionalCost)}
                    onChangeText={(text) => setPrices(prev => ({ ...prev, additionalCost: text }))}
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
                    onChangeText={(text) => setPrices(prev => ({ ...prev, profitPercent: text }))}
                />
                <Input
                    label="Sale Price"
                    name='salePrice'
                    keyboardType='numeric'
                    value={String(price.salePrice)}
                    editable={false}
                />
            </View>
            </ScrollView>
        </View>
    );
};



export default TabPrice;

