import React from 'react'
import { Text, View } from "react-native"
import styles from '../style/style'

export default Home = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                Home
            </Text>
        </View>
    )
}