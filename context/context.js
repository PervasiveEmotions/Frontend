import React from 'react';
import { createContext, useState } from "react";
// import server from "../axios/server";
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';


const Context = createContext(null);

export const Provider = ({ children }) => {
    const [error, setError] = useState("heyo");
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
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


    const onStartRecord = async (audioRecorderPlayer) => {
        const path = 'hello.m4a';
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };

        console.log('audioSet', audioSet);

        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            setAudioDetails({
                ...audioDetails,
                recordSecs: e.current_position,
                recordTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
        });

        console.log(`uri: ${uri}`);

    };

    const onStopRecord = async (audioRecorderPlayer) => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setAudioDetails({
            ...audioDetails,
            recordSecs: 0,
        });
        console.log(result);
    };


    const values = {
        error,
        audioDetails,
        onStartRecord,
        onStopRecord
    };

    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default Context;
