import React,{useEffect} from 'react'
import { View ,Text,TouchableOpacity,Image,Dimensions} from 'react-native'
import Outlet from "./Outlet";
import Reservation from "./Reservation"

import  Detail   from "./Detail";
import Rewards from "./Rewards";
import Home from './Home'
import ScanQr from './ScanScreen';

import Dashboard from './Dashboard'
import VoucherData from "./VoucherData";
import  Profiledetail from "./Profiledetail";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator}  from '@react-navigation/stack';
import BottomView from "./BottomView";
import {COLORS} from "./Styles/colors";


import { Ltout,loginAction,loginPhoneAction,loginSocialAction } from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

function Feed() {
    return (
      <View style= {{backgroundColor:  '#EFCB38'}}>
      <Text style= {{padding: 20,marginTop : 40,textAlign: 'center',color:'#fff'}} >
         TOKYO SECRET
      </Text>
      </View>
    );
  }

  function Voucher() {
    return (
      <View style= {{backgroundColor:  '#EFCB38'}}>
      <Text style= {{padding: 20,marginTop : 40,textAlign: 'center',color:'#fff'}} >
         Voucher
      </Text>
      </View>
    );
  }
  
  function Voucher1() {
    return (
      <View style= {{backgroundColor:  '#EFCB38'}}>
      <Text style= {{padding: 20,marginTop : 40,textAlign: 'center',color:'#fff'}} >
          TOKYO SECRET
      </Text>
      
      </View>
    );
  }

  // function Rewards() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Rewards!</Text>
  //     </View>
  //   );
  // }

 function Profile() {
     return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>  
     );
 }
  

const Post = ({ navigation }) => {
 
  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const{status} = LoginStatus;


  useEffect(() => {
    if (status === "failure"){
      console.log("failurefailurefailurefailurefailurefailurefailurefailure");
      dispatch(Ltout(purgeStoredState))
    }else{
      console.log("ssssssssssssucesss");
    }

  }, [])
 
    return (

        <Tab.Navigator
            initialRouteName= "Feed"
            tabBarOptions={{
            showLabel: true,
              activeTintColor: COLORS.app_browntheme,
              inactiveTintColor: 'black',
              
               style: {
                
                 backgroundColor : COLORS.app_bgtheme ,
               }
          }}   
          >
        
       <Tab.Screen 
          name= "Menu"
          component = {Home}
          options= {{
          tabBarLabel: "Menu",
           tabBarIcon : ({color}) =>(
           <Image source={require('./Image/menuNew.png')} style={{ height: 25, width: 25 }} tintColor={color} />
           ),
       }}
       />

       <Tab.Screen
          name= "ScanQr"
          component= {ScanQr}
          options= {{
             tabBarLabel: 'Scanner',
             tabBarIcon: ({ color }) => (
                <Image source= {require('./Image/orderNew.png')} style={{height: 25,width : 25}} tintColor={color} />
             ),
         }}
        />

{/* <Tab.Screen
        name= "Dashboard"
        component= {Dashboard}
         options= {{
             
        tabBarIcon: () => (

        <View
                  style={{
                  position: 'absolute',
                  bottom: 0,  
                  height: 68,
                  width: 68,
                  borderRadius: 68,
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
              >
             <Image source= {require('./Image/reserveNew.png')} style={{height: 60,width : 60}} />
              </View>
             ),
         }}
        /> */}

        <Tab.Screen
        name="Reserve"
        component={Reservation}
        options={{
            tabBarLabel: 'Reserve',
            tabBarIcon: ({color}) => (
            <Image source= {require('./Image/reserveNew.png')} style= {{height: 25,width: 25}} tintColor= {color}  />
            ),
        }} 
        />

        <Tab.Screen
        name= "Outlet"
        component= {Outlet}
        options= {{
            tabBarLabel: 'Outlet' ,
            tabBarIcon: ({ color }) => (
                <Image source= {require('./Image/outletNew.png')} style= {{height: 25,width: 25}} tintColor= {color}  />   
            ),
        }}
        />
       </Tab.Navigator>
        
    );
}

export default Post;
