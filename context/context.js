import React from 'react';
import { createContext, useState } from "react";
import axios from "../axios/server";
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";



const Context = createContext(null);

export const Provider = ({ children }) => {
    const [error, setError] = useState("heyo");
    const [token, setToken] = useState("Not Recording");
    const [status, setStatus] = useState();
    const whatsEmotion = (num) => {
        switch (num) {
            case '1':
                return "Neutral"

            case '2':
                return "Disgust"

            case '3':
                return "Happy"

            case '4':
                return "Sad"

            case '5':
                return "Angry"
            case '6':
                return "Fearful"

            default:
                return "Neutrall"
        }
    }

    const [audioDetails, setAudioDetails] = useState(
        {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
        });


    const [recording, setRecording] = React.useState();
    const onStartRecord = async () => {

        try {
            setToken('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            setToken('Starting recording..');
            const { recording, status } = await Audio.Recording.createAsync(
                {
                    ...Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
                    ios: {
                        ...Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY.ios,
                        sampleRate: 48000,
                        numberOfChannels: 1
                    }

                }
            );
            setRecording(recording);
            setStatus(status);
            setToken("Recording");

        } catch (err) {
            console.error('Failed to start recording', err);
        }

    };

    const onStopRecord = async () => {
        setToken('Stopping recording..');

        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setToken('Recording stopped ');
        try {

            var a = await FileSystem.uploadAsync("http://50d2-31-161-187-93.ngrok.io", uri, {
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
                httpMethod: "post",
                fieldName: `audio`,
                parameters: { "name": ` S${Math.floor(Math.random() * 1000)}` }
            });
            const data = JSON.parse(a.body).data

            const emotion = data[0];
            setToken(`Emotion: ${whatsEmotion(emotion)}\n Confidence ${data.substring(1, 4)}%`);
        } catch (error) {
            console.error(error);
        }
    };


    const values = {
        error,
        token,
        audioDetails,
        onStartRecord,
        onStopRecord,
        recording,
        status
    };

    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default Context;
