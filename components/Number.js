import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = props => {
    return (
        <View style={styles.container} >
            <Text style={styles.number} >{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.primary,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        marginVertical: 10,
    },
    number: {
        color: Colors.primary,
        fontSize: 20
    }
});

export default NumberContainer;