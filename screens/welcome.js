import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import Context from '../context/context';

const Welcome = () => {

    const { token,  onStartRecord, onStopRecord } = useContext(Context);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pervasive Emotions</Text>
            <Text style={styles.values}>{token}</Text>
            <Button
                title={"Record"}
                onPress={async () => {

                    await onStartRecord();
                }}
            />
            <Button
                title={"Stop"}
                onPress={() => {
                    onStopRecord();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    },

    backgroundImage: {
        position: "absolute",
        flex: 1,
        resizeMode: 'center', // or 'stretch'
    },
    header: {
        position: "absolute",
        top: 150,
        fontWeight: "700",
        fontSize: 22,
        color: "#fff"
    },
    values: {
        position: "absolute",
        bottom: 150,
        fontWeight: "700",
        fontSize: 22,
        color: "#fff"
    }
});

export default Welcome
