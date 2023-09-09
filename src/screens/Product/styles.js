import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    headerTitle: {
        textAlign: "center",
        alignItems: "center",
        fontSize: 24,
        bottom: 0,
        fontWeight: "bold"
    },

    saveButton: {
        marginTop: 50,
    },
    nomeInput: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12,
    },
    half: {
        width: '33%',
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

module.exports = styles
