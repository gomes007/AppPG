import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Picker, Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import styles from "./styles";
import {CustomFieldset} from "../CustomFieldset";

const FieldForm = ({label, type, value, options, onChange, rows, onRemove, previews}) => {
    const handleFilePick = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.uri) {
                onChange(response.uri);
            }
        });
    };

    const isLargeField = type === 'textarea';
    const containerStyle = [styles.container, isLargeField ? styles.containerLarge : null];


    return (
        <CustomFieldset label={label} style={{ height: 100 }}>
            <View style={containerStyle}>
                {type === 'textarea' ? (
                    <TextInput
                        style={{height: 80, width: '100%', borderWidth: 0}}
                        multiline={true}
                        numberOfLines={rows || 4}
                        onChangeText={text => onChange(text)}
                        value={value}
                    />
                ) : type === 'select' ? (
                    <Picker
                        selectedValue={value}
                        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                    >
                        {options.map((item, index) => (
                            <Picker.Item key={index} label={item.label} value={item.value}/>
                        ))}
                    </Picker>
                ) : type === 'checkbox' ? (
                    <TouchableOpacity onPress={() => onChange(!value)}>
                        <Text>{value ? 'Checked' : 'Unchecked'}</Text>
                    </TouchableOpacity>
                ) : type === 'radio' ? (
                    <View style={{flexDirection: 'row'}}>
                        {options.map((option, index) => (
                            <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => onChange(option.value)}>
                                    <Text>{value === option.value ? 'Selected' : 'Not Selected'}</Text>
                                </TouchableOpacity>
                                <Text>{option.label}</Text>
                            </View>
                        ))}
                    </View>
                ) : type === 'file' ? (
                    <View>
                        <TouchableOpacity onPress={handleFilePick}>
                            <Text>{value ? 'Change File' : 'Pick File'}</Text>
                        </TouchableOpacity>
                        {value && <Text>File selected: {value}</Text>}
                    </View>
                ) : (
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => onChange(text)}
                        value={value}
                    />
                )}
            </View>
        </CustomFieldset>
    );
};

export default FieldForm;
