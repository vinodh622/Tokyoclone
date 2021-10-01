import React from 'react'
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const Timer = () => {
    //const {initialMinute = 0,initialSeconds = 0} = ;
    const [ minutes, setMinutes ] = useState(5);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
        console.log('mathan test');
            if (seconds > 0) {
                
                setSeconds(seconds - 1);

                console.log('second')
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    console.log('minutes',minutes);
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <View style={{flex:1,backgroundColor:'red'}}>
        { minutes === 0 && seconds === 0
            ? null
            : <Text> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text> 
        }
        </View>
    )
}

export default Timer;