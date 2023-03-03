import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import * as Constants from '../constants/index';
import { Col, Row, Grid } from 'react-native-easy-grid';

let board = [];

export default Gameboard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(Constants.NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDice, setSelectedDice] = useState(new Array(Constants.NBR_OF_DICE).fill(false));
    const [selectedCats, setSelectedCats] = useState(new Array(Constants.MAX_SPOT).fill(false));
    const [catPoints, setCatPoints] = useState(new Array(Constants.MAX_SPOT).fill(0));

    function getDieColor(i) {
        return selectedDice[i] ? "black" : "steelblue";
    }

    function getCatColor(i) {
        return selectedCats[i] ? "black" : "steelblue";
    }

    const selectDie = (i) => {
        let dice = [...selectedDice];
        dice[i] = selectedDice[i] ? false : true;
        setSelectedDice(dice);
    }

    const selectCat = (i) => {
        let cats = [...selectedCats];
        cats[i] = selectedCats[i] ? false : true;
        setSelectedCats(cats[i]);
    }

    const throwDice = () => {
        for (let i = 0; i < Constants.NBR_OF_DICE; i++) {
            if(!selectedDice[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);   
    }

    const checkWinner = () => {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if(board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDice(new Array(Constants.NBR_OF_DICE).fill(false));
        }
        else if(nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDice(new Array(Constants.NBR_OF_DICE).fill(false));
        }
        else {
            setStatus('Keep on throwing');
        }
    }

    useEffect(() => {
        checkWinner();
        if(nbrOfThrowsLeft === Constants.NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if(nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(Constants.NBR_OF_THROWS - 1);
        }
    }, [nbrOfThrowsLeft]);

    const row = [];
    for (let i = 0; i < Constants.NBR_OF_DICE; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDie(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDieColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }
    const category = [];
    for (let i = 0; i < Constants.MAX_SPOT; i++) {
        category.push(
            <View>
                <Text>{catPoints[i]}</Text>
                <Pressable
                    key={"catrow" + i}
                    onPress={() => selectDie(i)}>
                    <MaterialCommunityIcons
                        name={"numeric-" + (i + 1) + "-box"}
                        key={"catrow" + i}
                        size={50}
                        color={getCatColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </View>
        );
    }

    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDice()}>
                    <Text style={styles.buttonText}>
                        Throw dice
                    </Text>
            </Pressable>
            <Text>Total: score</Text>
            <Text>You are points away from bonus</Text>
            <View style={styles.flex}>{category}</View>
        </View>
    )
}