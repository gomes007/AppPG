import {ScrollView, View} from "react-native";
import {useProduct} from "./useProduct";
import {useEffect, useState} from "react";
import styles from "./styles";
import {Input} from "../../components/input";


const TabInventory = () => {

    const {inventory, handleInventory} = useProduct();

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


    return (
        <View style={styles.container}>
            <ScrollView>
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
                </View>
            </ScrollView>
        </View>
    )
}

export default TabInventory;
