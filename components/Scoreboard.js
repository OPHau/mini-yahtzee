import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import styles from '../style/style';
import * as Constants from '../constants/index';
import { DataTable } from 'react-native-paper';

export default Scoreboard = ({navigation}) => {
    const [scores, setScores] = useState([]);

    const getScoreboardData = () => {
        try {
            return AsyncStorage.getItem(Constants.STORAGE_KEY)
            .then(req => JSON.parse(req))
            .then(json => {
              if(json === null) {
                json = [];
              }
              json.sort((a, b) => parseInt(b.score) - parseInt(a.score));
              setScores(json);
            })
            .catch(error => console.log(error));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const top3 = [];
    for (let i = 0; i < scores.length && i < 3; i++) {
        top3.push(
            <DataTable.Row key={"top" + i}>
                <DataTable.Cell numeric style={{ flex: 0.3}}>{i + 1}.</DataTable.Cell>
                <DataTable.Cell>{scores[i].name}</DataTable.Cell>
                <Text style={{ flex: 1.5}}>{scores[i].date}</Text>
                <DataTable.Cell numeric>{scores[i].score}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    const Table = () => (
        <DataTable>
            {top3}
        </DataTable>
    );

    return (
        <View style={styles.gameboard}>
            <Text>Scoreboard</Text>
            <Table />
        </View>
    )
}