import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/Number';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    };
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem} >
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
};

const GameScreen = props => {
    const initalGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initalGuess);
    const [pastGuesses, setPastGuesses] = useState([initalGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [aviableDeviceWidth, setAviableDeviceWidth] = useState(Dimensions.get('window').width)
    const [aviableDeviceHeight, setAviableDeviceHeight] = useState(Dimensions.get('window').height)

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAviableDeviceHeight(Dimensions.get('window').height)
            setAviableDeviceWidth(Dimensions.get('window').width)
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        };
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
            return;
        };
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(currRounds => currRounds + 1)
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses])
    };

    if (aviableDeviceHeight < 500) {
        return (
            <View style={styles.screen} >
                <Text style={DefaultStyles.title}>Oponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="arrow-down-sharp" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name="arrow-up-sharp" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer} >
                    {/*<ScrollView contentContainerStyle={styles.list} >
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                        </ScrollView>*/}
                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>)
    }

    return (
        <View style={styles.screen} >
            <Text style={DefaultStyles.title}>Oponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer} >
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="arrow-down-sharp" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="arrow-up-sharp" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer} >
                {/*<ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>*/}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 15 : 10,
        width: 300,
        maxWidth: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '40%' : '80%',
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: Colors.accent,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
});

export default GameScreen;