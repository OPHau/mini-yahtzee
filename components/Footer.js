import React from 'react'
import { Text, View } from 'react-native'
import styles from '../style/style'

export default Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.author}>
                Author: Olli-Pekka Hautamäki
            </Text>
        </View>
    )
}