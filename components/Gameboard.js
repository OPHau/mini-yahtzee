import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'

let board = [];
const NBR_OF_DICE = 5;
const NBR_OF_THROWS = 5;
//const WINNING_POINTS = 23;

export default Gameboard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    //const [nbrOfWins, setNbrOfWins] = useState(0);
    //const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDice, setSelectedDice] = useState(new Array(NBR_OF_DICE).fill(false));

    function getDieColor(i) {
        if(board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDice[i] ? "black" : "steelblue";
        }
    }

    const selectDie = (i) => {
        let dice = [...selectedDice];
        dice[i] = selectedDice[i] ? false : true;
        setSelectedDice(dice);
    }

    const throwDice = () => {
        for (let i = 0; i < NBR_OF_DICE; i++) {
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
            setSelectedDice(new Array(NBR_OF_DICE).fill(false));
        }
        else if(nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDice(new Array(NBR_OF_DICE).fill(false));
        }
        else {
            setStatus('Keep on throwing');
        }
    }

    useEffect(() => {
        checkWinner();
        if(nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if(nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
    }, [nbrOfThrowsLeft]);

    const row = [];
    for (let i = 0; i < NBR_OF_DICE; i++) {
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
        </View>
    )
}