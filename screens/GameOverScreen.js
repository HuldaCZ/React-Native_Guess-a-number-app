import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    Image,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import Colors from '../constants/colors';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
            <ScrollView>
                <View style={styles.screen} >
                    <TitleText>The Game is Over!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/success.png')} // Local Image
                            fadeDuration={1000}
                            // source={{uri: 'https://cdn.pixabay.com/photo/2019/06/13/09/41/business-4271251_960_720.png' }} // Online Image
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.resultContainer} >
                        <BodyText style={styles.resultText} >Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text>  rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
                    </View>
                    <MainButton onPress={props.onNewGame} >NEW GAME</MainButton>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'

    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 35
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 550 ? 16 : 20
    }
});

export default GameOverScreen;