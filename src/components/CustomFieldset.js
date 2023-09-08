import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CustomFieldset = ({ label, children }) => {
    return (
        <View style={styles.fieldset}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldset: {
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#696767',
        position: 'relative',
        width: '95%',
        height: 60,
        marginLeft: 10,
    },
    label: {
        position: 'absolute',
        top: -13,
        left: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
        fontSize: 16,
        color: '#333'
    },
});
