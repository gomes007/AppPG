import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CustomFieldset = ({ label, children, style }) => {
    return (
        <View style={[styles.fieldset, style]}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldset: {
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#696767',
        position: 'relative',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    label: {
        position: 'absolute',
        top: -13,
        left: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 4,
        fontSize: 16,
        color: '#333',

    },
});
