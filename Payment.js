import React,{useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView, Image,TouchableOpacity,Alert} from 'react-native';
import {StylesAll} from "./commanStyle/objectStyle"

import QRCode from 'react-native-qrcode-image';
 
import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';




 const Payment = ({ navigation,route}) => {

  // PushNotification.configure({
   
  //   onNotification: function(notification) {
  //     console.log('push on',notification)
  //     navigation.navigate('Dashboard');
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true
  // })


  useEffect(() => {
  
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    
      if(Platform.OS==="ios"){

        console.log('iosiosios notification');

      navigation.navigate("Dashboard")
  
       Alert.alert(
      remoteMessage.notification.body,
      "",
      [      
        { text: "OK",}
      ]
      );
      }

     else{
      navigation.navigate("Dashboard")
     }

     });
     return unsubscribe;
   }, []);



  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1;
 
  //   if (isClicked) {
  //     navigation.navigate('Dashboard');
  //   } else {
  //     navigation.navigate('Dashboard');
  //   }
  // };



    const LoginStatus = useSelector((state) => state.loginDetails);
    const{loginData} = LoginStatus

    //route?.params.

    // useEffect(() => {
         
    //   if (Platform.OS  ===  'ios'){
    //     console.log('ios push notification');
    //     PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    //   }

    //     console.log('routeroute',route);
    //     console.log('aaaa',route.params?.memberData.wallet);
       

    // }, [])

  return (

 
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
 
        <View >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                StylesAll.commonHeader,
              
              ]}>
              <Image source={require('./Image/back.png')} style={StylesAll.headArrow} resizeMode="contain" />
              <Text
                style={[StylesAll.headTitle]}>
                {route.params?.isPayment === true ? 'PAY' : 'TOP UP'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
              

        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={[StylesAll.qrBox,{justifyContent:'center',alignItems:'center'}]}>
          <QRCode
          value={ (loginData != null) ? loginData.token : "No Token Please Login"}
          size={240}
          bgColor='#FFFFFF'
          fgColor='#000000'
          />
          <View style={{position:"absolute" , top:"55%" ,left:"55%"}}>
<Image source={require('./Image/QRimage.jpeg')} style={{width:50 ,height:50,}} resizeMode="contain"/>
</View>
          </View>

          <View style={StylesAll.qrbottomBox}>
            <Text style={StylesAll.btnText}>Wallet Balance</Text>

            <Text style={[StylesAll.mediamFont,StylesAll.whitecolor]}>RM {(Math.round(route.params?.memberData.wallet * 100) / 100).toFixed(2)} </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Payment