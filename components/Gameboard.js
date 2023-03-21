import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import Footer from '../components/Footer';
import * as Constants from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = [];
let boardValue = [];

export default Gameboard = ({route, navigation}) => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(Constants.NBR_OF_THROWS);
    const [gameDone, setGameDone] = useState(false);
    const [status, setStatus] = useState('');
    const [bonusStatus, setBonusStatus] = useState('');
    const [selectedDice, setSelectedDice] = useState(new Array(Constants.NBR_OF_DICE).fill(false));
    const [selectedCats, setSelectedCats] = useState(new Array(Constants.MAX_SPOT).fill(false));
    const [catPoints, setCatPoints] = useState(new Array(Constants.MAX_SPOT).fill(0));
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([]);

    function getDieColor(i) {
        if(nbrOfThrowsLeft <= 0) return "orange";
        else return selectedDice[i] ? "black" : "darkturquoise";
    }

    function getCatColor(i) {
        return selectedCats[i] ? "orange" : "darkturquoise";
    }

    const selectDie = (i) => {
        if(nbrOfThrowsLeft === 3) return;
        let dice = [...selectedDice];
        dice[i] = selectedDice[i] ? false : true;
        setSelectedDice(dice);
    }

    const deselectDice = () => {
        let dice = [...selectedDice];
        dice.fill(false);
        setSelectedDice(dice);
    }

    const selectCat = (i) => {
        if(nbrOfThrowsLeft > 0) return;

        let cats = [...selectedCats];
        let catPts = [...catPoints];

        if(!selectedCats[i]) {
            cats[i] = true;
            let pts = 0;
            boardValue.forEach(element => {
                if(element === i + 1) pts += i + 1;
            });
            catPts[i] = pts;
            if(score < Constants.BONUS_POINTS_LIMIT && score + pts >= Constants.BONUS_POINTS_LIMIT) pts += Constants.BONUS_POINTS;
            setScore(score + pts);
            setCatPoints(catPts);
            setSelectedCats(cats);
            deselectDice();
            setNbrOfThrowsLeft(Constants.NBR_OF_THROWS);
        }
    }

    const throwDice = () => {
        if(gameDone) {
            if(nbrOfThrowsLeft === 0) return;
            else if(allCatsSelected()) {
                resetBoard();
            }
        }
        for (let i = 0; i < Constants.NBR_OF_DICE; i++) {
            if(!selectedDice[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                boardValue[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);   
    }

    const allCatsSelected = () => {
        let sCats = [...selectedCats];
        if(sCats.every((val) => val === true)) return true;
        else return false;
    }

    const nbrOfCatsSelected = () => {
        let sCats = [...selectedCats];
        let catS = 0;
        sCats.forEach((cat) => {
            if(cat === true) catS++;
        })
        return catS;
    }

    const resetBoard = () => {
        setGameDone(false);
        setStatus('');
        setBonusStatus('');
        setSelectedDice(new Array(Constants.NBR_OF_DICE).fill(false));
        setSelectedCats(new Array(Constants.MAX_SPOT).fill(false));
        setCatPoints(new Array(Constants.MAX_SPOT).fill(0));
        setScore(0);
        setNbrOfThrowsLeft(Constants.NBR_OF_THROWS);
    }

    const checkState = () => {
        if(gameDone) return;

        if(nbrOfThrowsLeft > 0) {
            setStatus('Keep on throwing');
        }
        else setStatus('Choose a point category below');
        score < Constants.BONUS_POINTS_LIMIT ?
            setBonusStatus("You are " + (Constants.BONUS_POINTS_LIMIT - score) + " points away from bonus") :
            setBonusStatus(Constants.BONUS_POINTS +" bonus points awarded");

        if (!gameDone && allCatsSelected()) {
            setStatus('Game over');
            setGameDone(true);

            const newKey = scores.length + 1;
            const newScore = {key: newKey.toString(), name: route.params.name, date: new Date().toLocaleString(), score: score};
            const newScores = [...scores, newScore];
            storeScore(newScores);
        }    
    }

    const storeScore = async(value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(Constants.STORAGE_KEY, jsonValue);
        } catch(e) {
            console.log(e);
        }
    }

    const getScore = async() => {
        try {
            return AsyncStorage.getItem(Constants.STORAGE_KEY)
            .then(req => JSON.parse(req))
            .then(json => {
              if(json === null) {
                json = [];
              }
              setScores(json);
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkState();
        if(nbrOfThrowsLeft === Constants.NBR_OF_THROWS && nbrOfCatsSelected() === 0) {
            setStatus('Game has not started');
        }
        if(nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(Constants.NBR_OF_THROWS - 1);
        }
        getScore();
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
            <View key={"catscorerow" + i}>
                <Text style={styles.boldtext}>{catPoints[i]}</Text>
                <Pressable
                    key={"catrow" + i}
                    onPress={() => selectCat(i)}>
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

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDice()}>
                    {gameDone === true ?
                        <Text style={styles.buttonText}>
                            New game
                        </Text>
                    :
                        <Text style={styles.buttonText}>
                            Throw dice
                        </Text>}
            </Pressable>
            <Text style={styles.boldtext}>Total: {score}</Text>
            <Text>{bonusStatus}</Text>
            <View style={styles.flex}>{category}</View>
            <Footer />
        </View>
    );
}