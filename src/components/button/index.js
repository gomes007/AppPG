import {Text, TouchableOpacity} from "react-native";
import styles from './styles'

export function Button(props){
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}


