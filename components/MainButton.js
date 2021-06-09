import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer} >
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress} >
                <View style={styles.button} >
                    <Text style={styles.buttonText} >{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>

    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15

    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    buttonContainer: {
       borderRadius: 15,
       overflow: 'hidden'
    }
});

export default MainButton;