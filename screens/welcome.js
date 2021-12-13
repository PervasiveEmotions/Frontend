import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Context from '../context/context';

const Welcome = () => {
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState({
        audioRecorder: new AudioRecorderPlayer()
    });
    const { error, audioDetails, onStartRecord, onStopRecord } = useContext(Context);

    useEffect(() => {
        const audioRecorderPlayer = new AudioRecorderPlayer();

        audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pervasive Emotions {audioDetails.recordSecs}</Text>
            <Button
                title={"Record"}
                onPress={async () => {

                    await onStartRecord(audioRecorderPlayer);
                }}
            />
            <Button
                title={"Stop"}
                onPress={() => {
                    onStopRecord(audioRecorderPlayer);
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
    }
});

export default Welcome
