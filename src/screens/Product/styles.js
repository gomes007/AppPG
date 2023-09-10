import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',

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
    row2: {
        flexDirection: 'column',
        marginRight: 12,
        marginLeft: 13,
    },
    half: {
        width: '33%',
    },
    half2: {
        width: '35%',
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    previewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
    },
    removeText: {
        color: 'red',
        marginLeft: 10,
    },
});

module.exports = styles
