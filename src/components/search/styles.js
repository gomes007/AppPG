import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#e8e8e8'
    },
    icon: {
        fontSize: 15,
        color: '#bdbdbd',
        marginLeft: 10
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: '#bdbdbd',
        marginLeft: 10
    }
});

module.exports = styles
