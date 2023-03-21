import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import styles from '../style/style';
import Footer from '../components/Footer';
import * as Constants from '../constants/index';
import { DataTable } from 'react-native-paper';
import { Pressable } from 'react-native';

export default Scoreboard = ({navigation}) => {
    const [scores, setScores] = useState([]);

    const clearScoreboard = async() => {
        AsyncStorage.clear();
    }

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

    const top5 = [];
    for (let i = 0; i < scores.length && i < 5; i++) {
        top5.push(
            <DataTable.Row key={"top" + i}>
                <DataTable.Cell numeric style={{ flex: 0.3}}>#{i + 1} </DataTable.Cell>
                <DataTable.Cell>{scores[i].name}</DataTable.Cell>
                <Text style={{ flex: 1.5}}>{scores[i].date}</Text>
                <DataTable.Cell numeric>{scores[i].score}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    const Table = () => (
        <DataTable>
            {top5}
        </DataTable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.boldtext}>Scoreboard</Text>
            <Table />
            <Pressable style={styles.erasebutton} onPress={() => clearScoreboard()}>
                <Text style={styles.erasebuttontext}>Clear scoreboard</Text>
            </Pressable>
            <Footer />
        </View>
    )
}