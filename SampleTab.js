import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {COLORS} from './Styles/colors';

import Friends from './Friends';
import HomeScreen from './HomeScreen';
import { StylesAll } from './commanStyle/objectStyle';


export default function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{flexDirection: 'row',backgroundColor: '#fafbfb',justifyContent:"center",alignItems:"center"  ,marginTop:25,marginBottom: 15}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:"center"}}
          >
            <View  style={{backgroundColor:isFocused? COLORS.app_browntheme : COLORS.app_bgtheme ,borderRadius:50 ,paddingHorizontal:11 ,paddingVertical:11,width: 140,alignItems:'center',justifyContent:'center'}}>
            <Text style={isFocused ? [{fontSize:14 ,color:"#fff" } ,StylesAll.mediamFont ]   :[{fontSize:14 ,color:"#000" } ,StylesAll.mediamFont] }>
              {label}
            </Text>

            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
// 	return (
// 		<Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
// 			<Tab.Screen name="HomeScreen" component={HomeScreen} />
// 			<Tab.Screen name="Friends" component={Friends} />
           

// 		</Tab.Navigator>

// 	);
// }

// const Stack = createStackNavigator();

// export default function SampleTab() {
// 	return (

 

// <MyTabs/>

  	
			

// 	);
// }