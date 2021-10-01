import React,{Component} from 'react';
import {WebView} from 'react-native-webview'
import {
  Text,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
const WebViewComman = ({ navigation, route }) => {
 
    return( 
      <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.app_bgtheme,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.app_bgtheme}></StatusBar>
      <SafeAreaView style={{flex: 1}}>
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader,{paddingBottom :20}]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}>{route.params?.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
        source={{
          uri: route.params?.urlString
        }}
        startInLoadingState={true}
      />   
</SafeAreaView>
</View>
    );
};

export default WebViewComman;
