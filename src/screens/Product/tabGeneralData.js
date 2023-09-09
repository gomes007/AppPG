import React from 'react';
import {View} from 'react-native';
import {useProduct} from './useProduct';
import {Input} from "../../components/input";
import styles from './styles'
import FieldForm from "../../components/form";

const TabGeneralData = () => {
    const {product, handleProduct} = useProduct();

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
                <FieldForm
                    label="Description"
                    name='description'
                    type='textarea'
                    value={product.description}
                    onChange={(value) => handleProduct('description', value)}
                />
            </View>
        </View>
    );
};

export default TabGeneralData;
