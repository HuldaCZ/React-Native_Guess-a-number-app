import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndriod
            })
        }} >
            <TitleText style={styles.headerTitle} >{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 60,
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndriod: {
        backgroundColor: colors.primary,
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? colors.primary : 'white',
        fontSize: 20,

    }
});

export default Header;