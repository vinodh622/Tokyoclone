import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Modal,
  Alert,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {StylesAll} from './commanStyle/objectStyle';
import QRCode from 'react-native-qrcode-image';
import moment from 'moment';
import {COLORS} from './Styles/colors';
import {useDispatch, useSelector} from 'react-redux';
// import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import User from './User';
import HTML from "react-native-render-html";
import messaging from '@react-native-firebase/messaging';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RewardDetails = ({navigation, route}) => {
  // PushNotification.configure({

    useEffect(() => {
  
      const unsubscribe = messaging().onMessage(async remoteMessage => {
      
        if(Platform.OS==="ios"){
        navigation.navigate("Rewards")
    
         Alert.alert(
        remoteMessage.notification.body,
        "",
        [      
          { text: "OK",}
        ]
        );
        }
  
       else{
        navigation.navigate("Rewards")
       }
  
       });
       return unsubscribe;
     }, []);

     

  //   onNotification: function (notification) {
  //     navigation.navigate('Rewards');
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });

  // const onRemoteNotification = (notification) => {
  //   const isClicked = notification.getData().userInteraction === 1;
  //   if (isClicked) {
  //     navigation.navigate('Rewards');
  //   } else {
  //     navigation.navigate('Rewards');
  //   }
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const [isVisible, setisVisible] = useState(false);

  const [getMilliSec, setMilliSec] = useState(0);

  const [getMin, setMin] = useState(5);

  const [getSec, setSec] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [progress, setProgress] = useState(0);

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const [qrCode, setQrcode] = useState({});

  const [minutesTimer, setMinutesTimer] = useState();

  const [secondsTimer, setSecondsTimer] = useState();

  const [millSecTimer, setMillSecTimer] = useState();

  const [totalTime, setTotalTime] = useState(0.0);

  //let  counterTime = 0;

  // useEffect(() => {
  //   let myInterval = setInterval(() => {
  //     if (secondsTimer > 0) {
  //       //setSecondsTimer(secondsTimer - 1);
  //       setSecondsTimer(secondsTimer => secondsTimer - 1);
  //     }
  //     if (secondsTimer === 0) {
  //       if (minutesTimer === 0) {
  //         clearInterval(myInterval);
  //        // setDone(true);
  //       } else {
  //         setMinutesTimer(minutesTimer =>  minutesTimer - 1);
  //         setSecondsTimer(59);
  //       }
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [secondsTimer, minutesTimer]);

  // useEffect(() => {
  //   let myInterval = setInterval(() => {
  //     if (secondsTimer > 0) {
  //       //setSecondsTimer(secondsTimer - 1);
  //       setSecondsTimer(secondsTimer => secondsTimer - 1);
  //     }
  //     if (secondsTimer === 0) {
  //       if (minutesTimer === 0) {
  //         clearInterval(myInterval);
  //        // setDone(true);
  //       } else {
  //         setMinutesTimer(minutesTimer =>  minutesTimer - 1);
  //         setSecondsTimer(59);
  //       }
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [secondsTimer, minutesTimer]);

  useEffect(() => {
    // if (Platform.OS === 'ios') {
    //   PushNotificationIOS.addEventListener(
    //     'notification',
    //     onRemoteNotification,
    //   );
    // }
    // if (currentId === route.params?.dataValue.voucherID){
    //   counterTime = counterTime;
    // }else{
    //     currentId = route.params?.dataValue.voucherID;
    //     counterTime = 0;
    // }

    const interval = setInterval(() => {
      if (secondsTimer > 0) {
        User.currentUser = User.currentUser + totalTime;
        setSecondsTimer((secondsTimer) => secondsTimer - 1);
      }
      if (secondsTimer === 0) {
        setMinutesTimer((minutesTimer) => minutesTimer - 1);
        setSecondsTimer((secondsTimer) => secondsTimer + 59);
      }

      if (minutesTimer === 5) {
        setMinutesTimer((minutesTimer) => minutesTimer - 1);
        setSecondsTimer(59);
      } else if (minutesTimer === 0 && secondsTimer === 0) {
        User.currentUser = 0;
        setModalVisible1(false);
        clearInterval(interval);
        navigation.navigate('Rewards');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsTimer, minutesTimer]);

  //console.log(loginData.token)

  // useEffect(() => {
  //   let myInterval = setInterval(() => {
  //     if (getSec > 0) {
  //       setSec((getSec) => getSec - 1);
  //     }
  //     if (getSec === 0) {
  //       if (getMin === 0) {
  //         clearInterval(myInterval);
  //       } else {
  //         setMin((getMin) => getMin - 1);
  //         setSec((getSec) => getSec + 59);
  //       }
  //     }

  //     if (getMin === 5) {
  //       setMin((getMin) => getMin - 1);
  //       setSec(59);
  //     } else if (getMin === 0 && getSec === 0) {
  //       navigation.goBack();
  //     }
  //     // setProgressState(getSec)
  //   }, 1000);

  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [getMin, getSec]);

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    var form = new FormData();

    form.append('api_token', loginData.token);
    form.append('voucherID', route.params?.dataValue.voucherID);

    fetch('http://sos.shiftlogics.com/api/redeem/checkRedeem', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setQrcode(data.data.qr_code);
          setQR(data);
        } else if (data.status === 'failure') {
          User.currentUser = 0;
          setisVisible(false);
        }
      })

      .catch((e) => console.log(e));
    // });

    return () => {
      // unsubscribe;
    };
  }, []);

  // const useProgress = (maxTimeInSeconds = getMilliSec) => {
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       if (progress < 1) {
  //         setElapsedTime((t) => t + 1);
  //       }
  //     }, 1000);

  //     return () => clearInterval(intervalId);
  //   }, []);

  //   useEffect(() => {
  //     setProgress(elapsedTime / maxTimeInSeconds);
  //   }, [elapsedTime]);

  //   return progress;
  // };

  // const progressx = useProgress();

  const setreddem = () => {
    
    var form = new FormData();
    form.append('api_token', loginData.token);
    form.append('voucherID', route.params?.dataValue.voucherID);

    fetch('http://sos.shiftlogics.com/api/redeem/addRedeem', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
     
        if (data.status === 'success') {
          setQrcode(data.data.qr_code);
          setQR(data);
          setModalVisible1(true);
          setModalVisible(false);
        } else if (data.status === 'failure') {
          Alert.alert(
            data.Msg,
            '',
            [
              {
                text: 'OK',
                onPress: () => {
                  setModalVisible(false);
                  navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch((e) => console.log(e));
  };

  const setQR = (data) => {
    var maxTime = moment(data.data.max_time);

    let setMaxtime = new Date(maxTime);

    let getMaxtime = setMaxtime.getTime();

    var minTime = moment(data.DateTime);

    let setMintime = new Date(minTime);
    let getMintime = setMintime.getTime();

    let diffTime = getMaxtime - getMintime;

    let secTotal = diffTime / 1000;
 
    setMilliSec(secTotal);

    setTotalTime((windowWidth + 20) / secTotal);

    let balSec = 300 - secTotal;

    setElapsedTime((ellapse) => ellapse + balSec);

    let mins = Math.floor(diffTime / 60000);
    setMinutesTimer(mins);
    //setMin(mins);

    let secs = ((diffTime % 60000) / 1000).toFixed(0);
    //setSec(secs);
    setSecondsTimer(secs);

    setisVisible(true);

    setModalVisible1(true);
  };

  return (
    <View style={[StylesAll.flexWtrapper, {backgroundColor: '#fafbfb'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={[StylesAll.headWrapper, {paddingBottom: 20}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={StylesAll.commonHeader}>
              <Image
                source={require('./Image/back.png')}
                style={StylesAll.headArrow}
                resizeMode="contain"
              />
              <Text style={[StylesAll.headTitle]}>VOUCHER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{width: '100%', height: undefined, aspectRatio: 800 / 450}}>
          <ImageBackground
            source={{
              uri: `http://sos.shiftlogics.com/${route.params?.dataValue.photo}`,
            }}
            style={[
              StylesAll.imageStyle,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {isVisible === true ? (
              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <QRCode
                  value={loginData != null ? qrCode : 'No Token Please Login'}
                  size={160}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </View>

        <View style={StylesAll.innerWrapper}>
          <View style={[StylesAll.flexWtrapper, {}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={StylesAll.md_Title}>
                {route.params?.dataValue.title}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                }}>
                <Image
                  source={require('./Image/calendar.png')}
                  style={{width: 25, height: 20}}
                  resizeMode="contain"
                />

                <Text style={StylesAll.commom_color}>
                  {' '}
                  Valid till{' '}
                  {moment(route.params?.dataValue.expired_date).format(
                    'MMMM Do YYYY',
                  )}
                </Text>
              </View>

              <Text style={[StylesAll.commom_color, {paddingVertical: 18}]}>
                {route.params?.dataValue.sub_title}
              </Text>

              {/* <Text style={StylesAll.commom_color}>
                {route.params?.dataValue.description.replace(
                  /<\/?[^>]+(>|$)/g,
                  '',
                )}
              </Text> */}

            <HTML 
            baseFontStyle={{color:"#000"}}
            listsPrefixesRenderers={{
              ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
                return <View style={{
                  marginRight: 10,
                  width: 7,
                  height: 7,
                  marginTop: 3,
                  borderRadius: 10,
                  backgroundColor: '#171717',
                }}/>
              },
              ol: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
                return <View style={{
                  marginRight: 10,
                  width: 7,
                  height: 7,
                  marginTop: 3,
                  borderRadius: 10,
                  backgroundColor: '#171717',
                }}/>
              },
            }}

            source={
              {html: route.params?.dataValue.description}}
              />

            </ScrollView>
          </View>

          <View
            style={[
              StylesAll.flexWtrapper,
              {justifyContent: 'flex-end', flex: 0.2},
            ]}>
            {isVisible ? null : (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <View style={StylesAll.commonButton}>
                  <Text style={StylesAll.btnText}>REDEEM</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* <View>
                      <TouchableOpacity onPress={() => addFavourite(route.params?.dataValue.id)}>
                        <View style={Styleall.sm_Button}>
                          <Text style={Styleall.btnText}>Reedem</Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}
        </View>
      </SafeAreaView>

      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <SafeAreaView style={StylesAll.flexWtrapper}>
          <View style={[StylesAll.common_Modal, {justifyContent: 'flex-end'}]}>
            <View style={[StylesAll.modalBox]}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={require('./Image/icons8-clock.png')} />
              </View>
              <Text></Text>

              <Text
                style={[
                  StylesAll.main_Title,
                  {textAlign: 'center', fontSize: 20},
                ]}>
                Redeem in 5 minutes
              </Text>
              <Text></Text>

              <TouchableOpacity onPress={() => setreddem()}>
                <View style={StylesAll.commonButton}>
                  <Text style={StylesAll.btnText}>ACTIVATE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={StylesAll.ltcancelbtn}>
                  <Text style={StylesAll.btnText}>NOT NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal animationType="none" transparent={true} visible={modalVisible1}>
        <SafeAreaView style={StylesAll.flexWtrapper}>
          <TouchableOpacity
            style={[StylesAll.common_Modal, {padding: 0}]}
            onPress={() => setModalVisible1(false)}>
            <View
              style={[
                StylesAll.flexWtrapper,
                {justifyContent: 'center', alignItems: 'center', padding: 10},
              ]}>
              <View style={StylesAll.redeemQrbox}>
                <QRCode
                  value={loginData != null ? qrCode : 'No Token Please Login'}
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </View>
              <Text></Text>
              <Text></Text>
              <Text
                style={[
                  StylesAll.whitecolor,
                  StylesAll.boldFont,
                  {textAlign: 'center'},
                ]}>
                {route.params?.dataValue.title}
              </Text>
            </View>

            <View style={[{flex: 0.1, justifyContent: 'flex-end'}]}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('./Image/icons8-clock.png')}
                    />

                    <Text style={[{paddingLeft: 10}, StylesAll.boldFont]}>
                      Redeem in
                    </Text>

                  </View>

                  <Text style={StylesAll.boldFont}>
                    {(minutesTimer < 10 ? '0' : '') +
                      minutesTimer +
                      ':' +
                      (secondsTimer < 10 ? '0' : '') +
                      secondsTimer}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'lightgray',
                    height: 10,
                    width: '100%',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      backgroundColor: COLORS.app_browntheme,
                      height: 10,
                      width: User.currentUser,
                      borderRadius: 5,
                    }}></Text>
                </View>
                {/* <View style={{}}>
                  <ProgressBar progress={1} color={'#9A7527'} />
                </View> */}
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default RewardDetails;

const styles = StyleSheet.create({
  btnRedeem: {},
});
