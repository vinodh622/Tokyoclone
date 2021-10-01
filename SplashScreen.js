import React,{useEffect} from 'react'
import {View,ImageBackground, Image,StatusBar} from 'react-native'
import {COLORS} from './Styles/colors';
 
    const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 3000);
    }, []);


    return (
      <View style={{flex:1 ,flexDirection:"column"}}>
      
       <StatusBar barStyle="dark-content" backgroundColor="#EFCB38"></StatusBar>   

       <ImageBackground source={require('./Image/appInvite.png')} style={{width:"100%" ,height:"100%"}}>

 
        </ImageBackground>
 
    </View>
 
    )
}
export default SplashScreen;
