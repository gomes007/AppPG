import {TextInput, View} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather"

import styles from "./styles"

export function Search({...rest}){
    return(
        <View style={styles.container}>
            <FeatherIcon name="search" style={styles.icon}/>
            <TextInput
                {...rest}
                style={styles.textInput}
            />
        </View>
    )
}
