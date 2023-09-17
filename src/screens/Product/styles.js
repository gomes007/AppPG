import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        color: '#000',

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
        marginTop: 25,
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



    container2: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0F0F0',
    },
    searchContainer: {
        marginBottom: 20,

    },
    searchbar: {
        backgroundColor: '#FFF',
    },
    listContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        maxHeight: 200,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    listItemText: {
        fontSize: 16,
    },
    selectedContainer: {
        padding: 16,
        backgroundColor: '#F7F7F7',
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    removeButton: {
        color: 'red',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 60,
        width: '100%',
    },


});

module.exports = styles
