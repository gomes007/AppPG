import React from 'react';
import {ScrollView, View} from 'react-native';
import {useProduct} from './useProduct';
import {Input} from "../../components/input";
import styles from './styles'
import FieldForm from "../../components/form";
import CheckBox from 'react-native-checkbox';


const TabGeneralData = () => {

    const {product, handleProduct} = useProduct();
    const {details, handleDetails} = useProduct();

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
                    <View style={styles.row2}>
                        <View style={styles.half2}>
                            <CheckBox
                                label="Enabled"
                                name='enabled'
                                checked={details.enabled}
                                onChange={() => handleDetails({target: {name: 'enabled', value: !details.enabled}})}
                            />
                        </View>
                        <View style={styles.half2}>
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
                        <View style={styles.half2}>
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
            </View>
            <View style={{height: 80}}></View>
        </ScrollView>
    );
};

export default TabGeneralData;
