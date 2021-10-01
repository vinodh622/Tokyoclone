
import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";
import HistoryCardItem from './HistoryCardItem';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MyTabBar from './SampleTab';

import PaymentList from './PaymentList';
import TopUpList from './TopUpList';


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="Payment" component={PaymentList} />
			<Tab.Screen name="Top Up" component={TopUpList} />
           

		</Tab.Navigator>

	);
}
 

const History = ({navigation}) => {
 
    return(
          <View style={{ backgroundColor: '#fafbfb',flex: 1,
          flexDirection: 'column',}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
            <SafeAreaView style={{flex: 1}}>
           
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={[
                StylesAll.commonHeader,
              
              ]}>
              <Image source={require('./Image/back.png')} resizeMode="contain"  style={StylesAll.headArrow}/>
              <Text
                style={[StylesAll.headTitle]}>
                 HISTORY
              </Text>
            </View>
          </TouchableOpacity>
        </View>

            <MyTabs/>
       </SafeAreaView>
 </View>

    );

};

export default History;

