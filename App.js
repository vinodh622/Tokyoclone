/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Post from './Post';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

import Rewards from './Rewards';
import React, {useCallback,useEffect} from 'react';
import Loginscreen from './Loginscreen';
import CreateAccount from './CreateAccount';
import loginWithPhone from './loginWithPhone';
import feedBack from './feedBack';
import MyInvites from './MyInvites';
import Friends from './Friends';
import VoucherData from './VoucherData';
import NewFile from './NewFile';
import Outlet from './Outlet';
import Menu from './Menu';
import ScanQr from './ScanScreen';
import Reservation from './Reservation';
import History from './History';
import TransactionDetail from './TransactionDetails';
import Test from './Test';
import DepartmentSection from './DepartmentSection';
import menuDashboard from './menuDashboard';
import ResentOtp from './ResentOtp';
import ContactsData from './ContactsData';
import AppTest from './AppTest';
import WebViewComman from './webViewTK';
import ReservationOutlet from './ReservationOutlet';
import Voucherdetail from './VoucherDetail';
import {COLORS} from './Styles/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import {Drawercontent} from './DrawerContent';
import Drawer from './RightSlide';
import Detail from './Detail';
import Payment from './Payment';
import TopUp from './TopUp';
import SampleTab from './SampleTab';
import Timer from './TimerEx';
import SplashScreen from './SplashScreen';
import Reserve from './Reservation';
import RewardDetails from './RewardDetails';
import HomeScreen from './HomeScreen';
import OnlineTopup from './OnlineTopup';

import MyWeb from './MyWeb';
import LottieViewScreen from './LottieView';


import TermsandConditions from './TermsandConditions';

import Menusubcategory from './Menusubcategory';

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

import {Platform,Alert} from 'react-native';





 
import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

// const DrawerLists = (navigation) => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <Drawercontent {...props} />}
//       drawerStyle={{width: 320}}>
//          <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Voucher" component={VoucherData} />
//       <Drawer.Screen name="Member" component={MyDesign} />
//       <Drawer.Screen name="Rewards" component={Rewards} />
//       <Drawer.Screen name="Profile" component={Detail} />

//     </Drawer.Navigator>
//   );
// };


const App = ({navigate}) => {


  useEffect(() => {
  


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(Platform.OS==="ios"){
     

     Alert.alert(
      remoteMessage.notification.body,
      "",
      [
        
        { text: "OK",}
      ]
    );
    }

    else{
     

    }




    });


    return unsubscribe;



   }, []);


// // export default function RewardDetails({navigation, route}) {



// // Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);

     
//     PushNotification.createChannel(
//       {
//         channelId: "fcm_fallback_notification_channel", // (required)
//         channelName: "My channel", // (required)
//         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//         playSound: false, // (optional) default: true
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: 4, // (optional) default: 4. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//       },
//       (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//     );

//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION: mathan1111", notification);

//     // process the notification
    
//       //navigation.navigate('Rewards');

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log("NOTIFICATION: mathan 222", notification);
    
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },

//    senderID: '945025541582',

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            backgroundColor: COLORS.app_bgtheme,
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Roboto-Regular',
          },
        }}
        headerMode='none'
        
        >
          
          {/* <Stack.Screen
          name="Timer"
          options={{title: 'Timer'}}
          component={Timer}
        />  
 
          {/* <Stack.Screen
          name="SampleTab"
          options={{headerShown: false}}
          component={SampleTab}
        /> */}
{/* 
        <Stack.Screen
          name=" "
          options={{headerShown: false}}
          component={Post}
        /> */}

        {/* {Platform.OS === 'ios' ?   <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        /> : <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        } */}

       <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
         
         <Stack.Screen 
          name="Reserve"
          options={{headerShown: false}}
          component={Reserve}
           />
          {/* <Stack.Screen
          name="Post"
          options={{headerShown: false}}
          component={Post}
        />
  */}

        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        /> */}

        <Stack.Screen
          name="Login"
          component={Detail}
          options={{title: 'Loginscreen'}}
        />


 
        <Stack.Screen
          name="Loginscreen"
          component={Loginscreen}
          options={{title: 'Login',headerShown: false}}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{title: ' '}}
        />

        <Stack.Screen
          name="loginWithPhone"
          component={loginWithPhone}
          options={{title: 'loginWithPhone'}}
        />

        <Stack.Screen
          name="feedBack"
          component={feedBack}
          options={{title: 'FEEDBACK'}}
        />

        <Stack.Screen
          name="Rewards"
          component={Rewards}
          options={{title: 'REWARDS'}}
        />

        <Stack.Screen
          name="WebViewComman"
          component={WebViewComman}
          options={{title: ' '}}
        />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{title: 'Friends'}}
        />



<Stack.Screen
          name="RewardDetails"
          component={RewardDetails}
          options={{title: 'RewardDetails'}}
        />
        <Stack.Screen
          name="MyInvites"
          component={MyInvites}
          options={{title: 'INVITE'}}
        />

        <Stack.Screen
          name="VoucherData"
          component={VoucherData}
          
          options={{title: 'VOUCHER'}}
        />

        <Stack.Screen
          name="Outlet"
          component={Outlet}
          options={{title: 'Outlet'}}
        />

        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />

        <Stack.Screen
          name="NewFile"
          component={NewFile}
          options={{title: 'NewFile'}}
        />

        <Stack.Screen
          name="ScanQr"
          component={ScanQr}
          options={{title: 'ScanQr'}}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{title: 'History'}}
        />

        <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{title: 'MY RESERVATION'}}
        />

        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{title: 'TransactionDetail'}}
        />

        <Stack.Screen
          name="DepartmentSection"
          component={DepartmentSection}
          options={{title: 'DepartmentSection'}}
        />

        <Stack.Screen
          name="menuDashboard"
          component={menuDashboard}
          options={{title: 'MENU'}}
        />

        <Stack.Screen
          name="ResentOtp"
          component={ResentOtp}
          options={{title: 'ResentOtp'}}
        />

        <Stack.Screen
          name="ContactsData"
          component={ContactsData}
          options={{title: 'ContactsData'}}
        />

        <Stack.Screen
          name="AppTest"
          component={AppTest}
          options={{title: 'AppTest'}}
        />

        <Stack.Screen
          name="ReservationOutlet"
          component={ReservationOutlet}
          options={{title: 'ReservationOutlet'}}
        />

        <Stack.Screen
          name="Voucherdetail"
          component={Voucherdetail}
          options={{title: 'Voucherdetail'}}
        />

        {/* <Stack.Screen
            name = "DrawerLists"
          options={{headerShown: false}}
        component={DrawerLists}
          /> */}

        <Stack.Screen
          name="Drawer"
          options={{headerShown: false}}
          component={Drawer}
        />

        <Stack.Screen
          name="Detail"
          options={{title: 'PROFILE'}}
          component={Detail}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'MEMBER',
        
        headerStyle:{
          backgroundColor:"#fff",
          headerTintColor: 'red',
        }
       }}
          
         
        />
        
        <Stack.Screen
          name="Payment"
          options={{title: 'Payment'}}
          component={Payment}
        />

       <Stack.Screen
          name="HomeScreen"
          options={{title: 'HomeScreen'}}
          component={HomeScreen}
        />
 
          <Stack.Screen
          name="TopUp"
          options={{title: 'TopUp'}}
          component={TopUp}
        />

<Stack.Screen
          name="TermsandConditions"
          options={{title: 'TermsandConditions'}}
          component={TermsandConditions}
        />


<Stack.Screen
          name="PrivacyPolicy"
          options={{title: 'PrivacyPolicy'}}
          component={PrivacyPolicy}
        />



          <Stack.Screen
          name="Menusubcategory"
          options={{title: 'Menusubcategory'}}
          component={Menusubcategory}
        />


        <Stack.Screen
          name="OnlineTopup"
          options={{title: 'OnlineTopup'}}
          component={OnlineTopup}
        />

 
        <Stack.Screen
          name="MyWeb"
          options={{title: 'MyWeb'}}
          component={MyWeb}
        />


         <Stack.Screen
          name="LottieViewScreen"
          options={{title: 'LottieViewScreen'}}
          component={LottieViewScreen}
        />


    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//ScanScreen

export default App;
