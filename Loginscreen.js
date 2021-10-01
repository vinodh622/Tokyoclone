import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  alert,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {StylesAll} from './commanStyle/objectStyle';
import {COLORS} from './Styles/colors';
import ActivityIndi from './ActivityIndi';
import Moment from 'moment';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import {
  Ltout,
  loginAction,
  loginPhoneAction,
  loginSocialAction,
  loginSocialGoogleAction,
  loginSocialAppleAction,
} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import auth from '@react-native-firebase/auth';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  appleAuthCredentialState
} from '@invertase/react-native-apple-authentication';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const phoneSchema = yup.object({
  phoneNumber: yup.string(),
});


const Loginscreen = ({navigation}) => {

  const[ deviceToken,setdeviceToken]=useState('')
  const[ deviceType ,setdeviceType]=useState('')

  const [value, onChangeText] = React.useState('+60');
  const [value1, onChangeText1] = React.useState('');

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData1} = LoginStatus;
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [loginData, setLoginData] = useState({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDob, setUserDob] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [errorCheck, seterrorCheck] = useState(false);

  const [errorMsg, setErrormsg] = useState('');

  const [accessToken, setAccessToken] = useState('');
  
  

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
  
      console.log('tokene mmmmm',fcmToken);
      
    setdeviceToken(fcmToken)
   
    } else {
     console.log("Failed", "No token received");
    }
  }

  const notificationValues = {
    tok: deviceToken,
    os: Platform.OS==="android"? "Android":"IOS",
  };


// Must be outside of any component LifeCycle (such as `componentDidMount`).
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
    //console.log("NOTIFICATION: mathan1111", notification);

    // process the notification
    
    
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log("NOTIFICATION: mathan 222", notification);
   
    // console.log("ACTION:", notification.action);
    // console.log("NOTIFICATION:", notification);

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


  setTimeout(() => {
    if (errorCheck === true) {
      seterrorCheck(false);
    }
  }, 1000);


 
  const handleResponse = async () => {
    if (Platform.OS === 'ios') {
      return appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then((appleAuthRequestResponse) => {         
        try {
          dispatch(Ltout(purgeStoredState));
          dispatch(
            loginSocialAppleAction(
              appleAuthRequestResponse.user,
              appleAuthRequestResponse.fullName.givenName,
              appleAuthRequestResponse.email,
              navigation,notificationValues
            ),
          ).then(() => {
            setIsLoadingList(false);
          });
        } catch {
          setIsLoadingList(false);
          
        }
        let {identityToken, email} = appleAuthRequestResponse;
       
      }); 
    }
  };

  const createAlertWithTwoButton = (itemValue, phoneNumber, login) => {
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
            if (itemValue == 'Otp send successfully!') {
              navigation.navigate('ResentOtp', {
                phoneNumberData: phoneNumber,
                loginData: login,
                isCreate: false,
              });
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const _signIn = async () => {
    setIsLoadingList(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      try {
        dispatch(Ltout(purgeStoredState));
        await dispatch(
          loginSocialGoogleAction(
            userInfo.user.id,
            userInfo.user.name,
            userInfo.user.email,
            navigation,notificationValues
          ),
        ).then(() => {
          setIsLoadingList(false);
          signOut();
        });
      } catch {
        setIsLoadingList(false);
       
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoadingList(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setIsLoadingList(false);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsLoadingList(false);
        // play services not available or outdated
      } else {
        setIsLoadingList(false);
        // some other error happened
      }
    }
  };

 

  useEffect(() => {
  
    GoogleSignin.configure({
      webClientId:
        '945025541582-g13i18tn7ul98o8nmspk07pptsrkuqie.apps.googleusercontent.com',
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const getResponseInfo = async (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('checking mathan');
      //response alert
      console.log('test mathan', JSON.stringify(result));

      setUserEmail('Email', +result.email);

      setUserName('Welcome ' + result.name);

      setToken('User Token: ' + result.id);

      setProfilePic(result.picture.data.url);

      setIsLoadingList(true);

      const userInfo = JSON.stringify(result);

      
      try {
        dispatch(Ltout(purgeStoredState));
        await dispatch(
          loginSocialAction(result.id, result.name, result.email, navigation,notificationValues),
        ).then(() => {
          setIsLoadingList(false);
          onLogout();
        });
      } catch {
        setIsLoadingList(false);
        console.log('no return');
      }
    }
  };

  const fbLogout = (accessToken) => {
    let logout = new GraphRequest(
      'me/permissions/',
      {
        accessToken: accessToken,
        httpMethod: 'DELETE',
      },
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          LoginManager.logOut();
          console.log('Logout Successful');
        }
      },
    );
    new GraphRequestManager().addRequest(logout).start();
  };

  const onLogout = () => {
    LoginManager.logOut();
    setUserName(null);
    setToken(null);
    setProfilePic(null);
  };

  const onPress2 = () => {
    navigation.navigate('CreateAccount',{phone : ''});
  };
  const onPress3 = () => {
    loginWithFacebook();
  };

  const onPress4 = () => {};

  const onPressLoginWithPhone = () => {
    navigation.navigate('loginWithPhone');
  };

  const dimissAction = () => {
    navigation.goBack();
  };

  const loginWithFacebook = () => {
    setIsLoadingList(true);

    onLogout();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          setIsLoadingList(false);
          console.log('==> Login cancelled');
        } else {
          setIsLoadingList(false);
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log('mathan', data);
            console.log('token.......', data.accessToken.toString());
            setAccessToken(data.accessToken.toString());
            const processRequest = new GraphRequest(
              '/me?fields=name,email,picture.type(large)',
              null,
              getResponseInfo,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(processRequest).start();
          });
        }
      },
      function (error) {
        setIsLoadingList(false);
        console.log('==> Login fail with error: ' + error);
      },
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      
        <SafeAreaView style={{flex: 1, flexDirection: 'column' ,backgroundColor:"#fff"}}>
          <SafeAreaView>
            {/* 
<SnackBar visible={true}    autoHidingTime={3000}

 position="top" textMessage="Hello There!" actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="let's go"/> */}
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
          </SafeAreaView>
          {}

           
          <View style={StylesAll.field_Box}>
<View style={{justifyContent:"center" ,alignItems:"center"}}>
<Image
              source={require('./Image/sosLogo.png')}
              style={{width: 160, height: 100}}
              resizeMode="contain"
            />

</View>
         
            <Text></Text>

            <Text style={StylesAll.main_Title}>LOGIN</Text>
            <Text style={StylesAll.commom_color}>
              You 're just one step away from chef-made food.
            </Text>

            <Text></Text>

            <Formik
              initialValues={{
                phoneNumber: '',
              }}
              validationSchema={phoneSchema}
              onSubmit={async (values) => {
                seterrorCheck(false);
                setIsLoadingList(true);

                let abort = new AbortController();
                var form = new FormData();
                form.append(
                  'phone',
                  value.replace('+', '') + values.phoneNumber,
                );
                fetch(
                  'http://sos.shiftlogics.com/api/user/loginphone',
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
                    console.log(data)
                    setLoginData(data.data);

                    if (data.status === 'success') {
                      setIsLoadingList(false);
                      seterrorCheck(false);

                      console.log('datadatadatadata mathan', data);
                      navigation.navigate('ResentOtp', {
                        phoneNumberData:
                          value.replace('+', '') + values.phoneNumber,
                        loginData: data.data,
                        loginfrom: 'Login',
                      });
                    } else {
                      console.log('datadatadatadatadata', data);

                      seterrorCheck(true);

                      setIsLoadingList(false);

                      setErrormsg(data.msg);

                      setTimeout(() => {
                        if (data.msg === 'Phone number not registered') {
                          navigation.navigate('CreateAccount', {
                            phone: values.phoneNumber
                          });
                        }
                      }, 1000);
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                    //createAlertWithTwoButton(e);
                  });
                return () => {
                  abort.abort();
                };
              }}>
              {(props) => (
                <View>
                  <View style={StylesAll.inputFieldBox}>
                    <TextInput
                      style={{fontFamily:'SFCompactDisplay-Medium'}}
                      defaultValue={'+60'}
                      style={{flex: 0.15}}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                      keyboardType="number-pad"
                    />
                    <View
                      style={{
                        width: 1,
                        height: 15,
                        borderWidth: 1,
                        position: 'relative',
                        top: 13,
                        borderColor: '#000',
                      }}></View>

                    <TextInput
                      style={[StylesAll.inputwrap2,{fontFamily:'SFCompactDisplay-Medium'}]}
                      //onChangeText={(text) => onChangeText1(text)}
                      onChangeText={props.handleChange('phoneNumber')}
                      value={props.values.phoneNumber}
                      placeholder="Mobile Number"
                      keyboardType="number-pad"
                      returnKeyType="done"
                    />
                  </View>
                  <Text style={{color: 'red'}}>
                    {props.touched.phoneNumber && props.errors.phoneNumber}
                  </Text>

                  <TouchableOpacity
                    onPress={props.handleSubmit}
                    disabled={ props.values.phoneNumber.length >= 9 ? false : true}>
                    <View
                      style={
                        props.values.phoneNumber.length >= 9
                          ? StylesAll.commonButton
                          : StylesAll.commonButtondisabled
                      }>
                      <Text style={StylesAll.btnText}>SUBMIT</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <Text></Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Text style={[StylesAll.mediamFont, {textAlign: 'center',color:'#343434'}]}>
                Continue as guest
              </Text>
            </TouchableOpacity>
            <View style={StylesAll.ltguestWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey_line,
                  }}
                />
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: 50,
                      color: COLORS.grey,
                    }}>
                    or
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey_line,
                  }}
                />
              </View>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  onPress={() => {
                    handleResponse();
                  }}>
                  <View style={StylesAll.appleButton}>
                    <Image
                      source={require('./Image/icons8-apple-logo.png')}
                      style={{width: 20, height: 20, marginRight: 5}}
                      resizeMode="contain"
                    />
                    <Text style={[StylesAll.btnText, {textAlign: 'center'}]}>
                      Continue with Apple
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 4,
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: '50%', marginRight: 2}}>
                  <TouchableOpacity onPress={onPress3}>
                    <View style={StylesAll.fbButton}>
                      <Image
                        source={require('./Image/icons8-facebook-f.png')}
                        style={{width: 14, height: 14, marginRight: 4}}
                        resizeMode="contain"
                      />
                      <Text style={[StylesAll.btnText, {fontSize: 10}]}>
                        Login with Facebook
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{width: '50%', marginLeft: 2}}>
                  <TouchableOpacity onPress={_signIn}>
                    <View style={StylesAll.googleButton}>
                      <Image
                        source={require('./Image/iconfinder_Google.png')}
                        style={{width: 14, height: 14, marginRight: 5}}
                        resizeMode="contain"
                      />
                      <Text style={[{fontSize: 12,color:'#717171',fontFamily:'SFCompactDisplay-Medium'}]}>Sign in with Google</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text></Text>
              <TouchableOpacity onPress={onPress2}>
                <Text style={{textAlign: 'center',color:'#343434',fontFamily:'SFCompactDisplay-Medium'}}>Register with email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAndroid: {
    flex: 1,
  },
  containerIOS: {
    flex: 1,
    marginTop: 40,
  },

  faceGoogleButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOr: {
    paddingTop: 10,
    color: 'black',
    // fontWeight: 'light',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  textMala: {
    paddingTop: 5,
    color: 'black',
    // fontWeight: 'light',
  },
  textLets: {
    paddingTop: 5,
    color: 'black',
    // fontWeight:'bold',
    fontSize: 15,
  },
  textClear: {
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    color: 'black',
    // fontWeight:'bold',
    fontSize: 13,
  },
  texttext: {
    width: '43%',
    borderRadius: 6,
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#EFCB38',
  },

  faceBook: {
    width: '48%',
    borderRadius: 6,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
  },

  google: {
    borderWidth: 1,
    borderColor: 'black',
    width: '48%',
    borderRadius: 6,
    textAlign: 'center',
    alignItems: 'center',

    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  apple: {
    borderRadius: 6,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    color: 'white',
    // fontWeight:'bold',
    fontSize: 13,
    backgroundColor: 'black',
  },
  text: {
    borderRadius: 6,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    color: 'white',
    //  fontWeight:'bold',
    fontSize: 13,
    backgroundColor: '#EFCB38',
  },
  imageView: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
    flexDirection: 'column',
    height: windowHeight,
  },

  topHeaderView: {
    height: 50,
    flex: 1,
    backgroundColor: '#EFCB38',
    position: 'relative',
  },

  bottomHeaderView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

  list: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
  },

  toptext: {
    color: 'white',
    paddingLeft: 10,
    marginTop: 10,
  },
  search: {
    marginLeft: 10,
    marginTop: 20,
    justifyContent: 'flex-start',
  },

  toptext1: {
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
  },

  errorSnackbar: {
    backgroundColor: '#C02925',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
});
export default Loginscreen;
