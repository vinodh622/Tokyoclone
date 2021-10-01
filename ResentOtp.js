import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  Image,
  Button,
  View,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
import ActivityIndi from './ActivityIndi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {date} from 'yup/lib/locale';

import {
  Ltout,
  loginAction,
  loginPhoneAction,
  loginSocialAction,
} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';



const ResentOtp = ({navigation, route}) => {

  const[ deviceToken,setdeviceToken]=useState('')
  const[ deviceType ,setdeviceType]=useState('')

  const [referralBtnText, setReferralBtnText ] = useState('I have a referral code');
  

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;

  const [apiToken, setApiToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [currentOTP, setCurrentOTP] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);
 
  const [done, setDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [errorCheck, seterrorCheck] = useState(false);
  const [errorMsg, setErrormsg] = useState('');

  const [minutesTimer, setMinutesTimer] = useState(0);
  const [secondsTimer, setSecondsTimer] = useState(60);
  const foo = useRef();
  



  useEffect(() => {
    requestUserPermission();
   }, []);

 const  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken() //<---- Add this
     /// console.log('Authorization status:', authStatus);
    }
  }

const   getFcmToken = async () => {

    const fcmToken = await messaging().getToken();
    
    if (fcmToken) {
  
    setdeviceToken(fcmToken)
   
    } else {
     console.log("Failed", "No token received");
    }
  }

  const notificationValues = {
    tok: deviceToken,
    os: Platform.OS==="android"? "Android":"IOS",
  };



PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log("TOKEN:", token);

    //  setdeviceToken(token.token);
    //  setdeviceType(token.os);

    PushNotification.createChannel(
      {
        channelId: "fcm_fallback_notification_channel", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION: mathan1111", notification);
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("NOTIFICATION: mathan 222", notification);
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

   senderID: '945025541582',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// const notificationValues = {
//   tok: deviceToken,
//   os: deviceType,
// };

//   console.log('notificationValuesnotificationValues',notificationValues);



  setTimeout(()=>{
    if(errorCheck===true){
      seterrorCheck(false)
    }
    },1000)


  const applyRefercode = () => {
    setIsLoadingList(true);
    if (referralCode === '') {
      seterrorCheck(true);
      setErrormsg('Kindly enter your referral code')
      //createAlertWithTwoButton1('Kindly enter your referral code');
    } else {
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', apiToken);
      form.append('referral_code',referralCode);
       console.log('formformform',form)

      fetch(
        'http://sos.shiftlogics.com/api/user/referral',
        {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        },
        {signal: abort.signal},
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoadingList(false);

          if (data.status === 'success') {
            setReferralBtnText(referralCode);
            console.log('datadatadatadata success',data);
             setModalVisible(false);
            setCurrentOTP('');
            createAlertWithTwoButton1(data.status);
          } else {
            console.log('datadatadatadata fall',data);
            //createAlertWithTwoButton1(data.data);
            seterrorCheck(true);
            setErrormsg(data.data)
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (secondsTimer > 0) {
        setSecondsTimer(secondsTimer - 1);
      }
      if (secondsTimer === 0) {
        if (minutesTimer === 0) {
          clearInterval(myInterval);
          setDone(true);
        } else {
          setMinutesTimer(minutesTimer - 1);
          setSecondsTimer(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [secondsTimer, minutesTimer]);


  
  const createTwoButttonWithoutOTP = () => {
    Alert.alert('Alert', 'Please Fill OTP Fields', [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Press');
        },
      },
    ]);
  };

  const createAlertWithTwoButton1 = (itemValue) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',

          style: 'cancel',
        },
        {text: 'ok', onPress: () => {}},
      ],
      {cancelable: false},
    );

  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',

          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            if (itemValue == 'Otp verified successfully!') {
              // navigation.goBack('Post')
              //navigation.navigate('Post');

              navigation.goBack();
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );

  const resendOTPAPI = (apiUrl) => {

    
    setSecondsTimer(60);
    setMinutesTimer(0);
    setDone(false);

    setIsLoadingList(true);

    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', apiToken),
      form.append('phone', phoneNumber),


      fetch(
        apiUrl,
        {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        },
        {signal: abort.signal},
      )
        .then((response) => response.json())

        .then((data) => {
          setIsLoadingList(false);

          if (data.status === 'success') {

            if(route?.params.loginfrom == 'Login'){
              createAlertWithTwoButton1(data.msg);
            }else{
              createAlertWithTwoButton1(data.data);
            }
           
            setCurrentOTP('');
            
          } else {
            
            setErrormsg(data.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    return () => {
      abort.abort();
    };
  };

  const failLogin = () => {
    navigation.navigate('Home');
    dispatch(Ltout(purgeStoredState));
  };

  const submitOTPAPI = async () => {

   
 
    if (currentOTP.length == 4) {
      
      seterrorCheck(false);
      setIsLoadingList(true);

      try {
        dispatch(Ltout(purgeStoredState));
        await dispatch(
          loginPhoneAction(apiToken, currentOTP, phoneNumber,(route?.params.loginfrom == 'Login') ? 'http://sos.shiftlogics.com/api/user/loginotpverified' : 'http://sos.shiftlogics.com/api/user/otpverified',navigation,notificationValues),
        ).then(() => {
          setIsLoadingList(false);
        });
      } catch {}
    } else {
      seterrorCheck(true);
 
      setErrormsg('Kindly Fill OTP Fields');
      //createTwoButttonWithoutOTP();
    }
  };
  

  useEffect(() => {
    if (route?.params.loginfrom == 'Create') {
        let abort = new AbortController();
        var form = new FormData();

      
        form.append('api_token', route?.params.loginData.token),
        form.append('phone',route.params?.phoneNumberData),

        console.log('formmmmm',form)
        fetch(
          'http://sos.shiftlogics.com/api/user/sendotp',
          {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }),
            body: form,
          },
          {signal: abort.signal},
        )
          .then((response) => response.json())

          .then((data) => {

            setIsLoadingList(false);
            Alert.alert(
              data.data,
              '',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    if (data.status === 'success') {
   
                      setApiToken(route?.params.loginData.token);
                      setPhoneNumber(route.params?.phoneNumberData);
                    }else{
                      
                    }
                   
                  },
                },
              ],
              {cancelable: false},
            );
 
          })
          .catch((e) => {
            console.log(e);
          });
      return () => {
        abort.abort();
      };
    } else {

      if (route?.params.loginfrom == 'Social') {
        setApiToken(route?.params.loginData.token);
      }else{
        setApiToken(route?.params.loginData.api_token);
      }
      setPhoneNumber(route.params?.phoneNumberData);
    }
  },[]);

  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafbfb'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        {errorCheck ? (
          <View style={StylesAll.errorSnackbar}>
            <Image
              resizeMode="cover"
              style={{width: 30, height: 30, tintColor: '#fff'}}
              source={require('./Image/opps.png')}
            />

            <View style={{flexDirection: 'column', paddingLeft: 13}}>
              <Text style={StylesAll.whitecolor}>SOS</Text>
              <Text style={[StylesAll.mediamFont, StylesAll.whitecolor]}>
                {errorMsg}
              </Text>
            </View>
          </View>
        ) : null}

     <View style={{marginBottom: 10, marginHorizontal: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader1]}>
              <Image
                source={require('./Image/back.png')}
                style={StylesAll.headArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{flex: 1, margin: 30, marginTop: 30}}>
          <Text
            style={StylesAll.main_Title}>
            VERIFY TAC
          </Text>
          <Text style={StylesAll.commom_color}>
            Please key in the code send to {route.params?.phoneNumberData} via
            SMS within the next 60 seconds
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: 20,
              paddingBottom: 10,
            }}>
            00 : {secondsTimer < 10 ? '0' + secondsTimer : secondsTimer}
          </Text>

          {done == false ? (
            <View></View>
          ) : (
            <TouchableOpacity onPress={() => resendOTPAPI((route?.params.loginfrom == 'Login') ? 'http://sos.shiftlogics.com/api/user/loginphone' : 'http://sos.shiftlogics.com/api/user/sendotp')}>
              <View
                style={[
                  {
                    padding: 10,
                    width: 180,
                    backgroundColor: COLORS.app_browntheme,
                    borderRadius: 50,
                  },
                ]}>
                <Text
                  style={[
                    {color: 'white', textAlign: 'center'},
                    StylesAll.boldFont,
                  ]}>
                  RESEND CODE
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <OTPInputView
          backgroundColor={'red'}
            style={{width: '80%', height: 100}}
            pinCount={4}
            editable={true}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            code={currentOTP}
            onCodeChanged={(code) => {
              setCurrentOTP(code);
            }}
            onCodeFilled={(code) => {
              setCurrentOTP(code);
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', margin: 20}}>

          {(route?.params.loginfrom == 'Login') ? null : <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{padding: 20, textAlign: 'center',fontFamily:'SFCompactDisplay-Medium',color: '#9C9C9C'}}>
             {referralBtnText}
            </Text>
          </TouchableOpacity>}
          
          <TouchableOpacity onPress={() => submitOTPAPI()}>
            <View
              style={{
                backgroundColor: COLORS.app_browntheme,
                borderRadius: 50,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'SFCompactDisplay-Bold',
                  fontSize: 15,
                  color: 'white',
                }}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <View style={[StylesAll.common_Modal, {justifyContent: 'center'}]}>
            <View style={StylesAll.modalBox}>
              <Text style={[StylesAll.main_Title]}>Referral Code</Text>

              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: COLORS.grey_line,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginTop: 10,
                  height: 45,
                }}
                onChangeText={(text) => setReferralCode(text)}
                placeholder={'Enter referral code'}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{flex: 1}}>
                  <View style={[StylesAll.cancelBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      CLOSE
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => applyRefercode()}
                  style={{flex: 1}}>
                  <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default ResentOtp;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
    color: COLORS.app_browntheme,
  },

  underlineStyleHighLighted: {
    borderBottomWidth: 2,
    borderColor: COLORS.app_browntheme,
  },
});
