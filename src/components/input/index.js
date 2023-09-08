import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CustomFieldset } from '../CustomFieldset';
import styles from './styles';

export function Input({ label, isPassword, onPress, showPassword, onChangeText, editable = true, ...rest }) {
    return (
        <CustomFieldset label={label}>
            <View style={styles.container}>
                <TextInput
                    {...rest}
                    editable={editable}
                    onChangeText={(value) => {
                        if (onChangeText) {
                            if (onChangeText.length === 1) {
                                onChangeText(value);
                            } else {
                                onChangeText(rest.name, value);
                            }
                        }
                    }}
                    style={styles.textInput}
                />
                {
                    isPassword &&
                    <TouchableOpacity onPress={onPress}>
                        <FeatherIcon name={showPassword ? 'eye' : 'eye-off'} size={25} color="#5BD075"/>
                    </TouchableOpacity>
                }
            </View>
        </CustomFieldset>
    );
}
