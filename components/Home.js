import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react'
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from "react-native"
import * as Constants from '../constants/index';
import styles from '../style/style'

export default Home = ({navigation}) => {
    const [name, setName] = useState('');
    const [isSet, setIsSet] = useState(false);
    const nameRef = useRef(null);

    useFocusEffect(
        useCallback(() => {
            const focus = () => {
                setTimeout(() => {
                    nameRef?.current?.focus();
                }, 1);
            };
            focus();
            return focus;
        }, []),
    );

    return (
        <View>
            { !isSet ? 
            <View>
                <Text>
                    Enter name for scoreboard....
                </Text>
                <TextInput 
                    placeholder=""
                    ref={nameRef}
                    onChangeText={(text) => setName(text)}
                    value={name} />
                <Button title="OK" onPress={() => setIsSet(true)} />
            </View>
            : 
            <View>
                <Text styles={styles.gameinfo}>THE GAME: Upper section of the classic Yahtzee dice game. You have {Constants.NBR_OF_DICE} dice and for the every die {Constants.NBR_OF_THROWS} throws. After each throw, you can keep dice in order to get as many matching ones as possible. At the end of a turn, you must select a category from {Constants.MIN_SPOT} to {Constants.MAX_SPOT}. The game ends when all categories have been selected. The selection order is free.</Text>
                <Text styles={styles.gameinfo}>POINTS: After each turn, the game calculates the sum for the category you selected. Only the dice having the selected value count. Each of the categories from {Constants.MIN_SPOT} to {Constants.MAX_SPOT} can be selected only once.</Text>
                <Text styles={styles.gameinfo}>GOAL: To get as many points as much as possible. A total score of {Constants.BONUS_POINTS_LIMIT} scores you additional {Constants.BONUS_POINTS} points.</Text>
                <Button title="Play" onPress={() => navigation.navigate('Gameboard', { name: name })}/>
            </View> }
        </View>
    );
}