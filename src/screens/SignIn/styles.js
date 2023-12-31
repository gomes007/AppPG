import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    header: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "600"
    },
    inputContent: {
        marginTop: 32,
        marginHorizontal: 20
    },
    firstInput: {
        marginBottom: 16
    },
    buttonsContainer: {
        paddingHorizontal: 20,
        marginTop: 100
    },
    firstButton: {
        marginBottom: 20
    },
    secondButton: {
        marginBottom: 20
    },
    thirdButton: {
        alignSelf: "center"
    },
    thirdButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: '#d40c4f'
    },



});

module.exports = styles;
