'use strict';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import React, {Component, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {StylesAll} from './commanStyle/objectStyle';

const ScanQr = ({navigation}) => {

  const [isLoadingList, setIsLoadingList] = useState(false);
  

  const onSuccess = (e) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );

  };

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <View
      style={{flex: 1, backgroundColor: '#fafbfb', flexDirection: 'column'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}>ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 15, paddingLeft: 25,paddingVertical : 10}}>
            Scan QR Code
          </Text>
          <QRCodeScanner
      
            markerStyle={{borderColor: '#fff', borderRadius: 10}}
            onRead={onSuccess}
            showMarker={true}
            containerStyle={{marginTop: 10}}
           
            showFrame={true}
            laserColor={"blue"}
            frameColor={"white"}
            cameraStyle={{
              height: screenHeight - 150,
              width: screenWidth,
              alignSelf: 'center',
              justifyContent: 'center',
              
            }}
 

            // markerStyle={{
            //     height : 50,
            //     width : '100%',
            //     alignSelf: 'center'
            // }}
            // customMarker={
            //   <View style={{height : 50, width : '100%', flex: 1,
            //   alignItems: "center",
            //   flexDirection: "column",
            //   justifyContent: "flex-end",
            //   backgroundColor: "transparent"}}>
            //     <Text style={{color : '#fff'}}>Place a QR or barcode inside the scan area</Text>
            //   </View>
            // }
             
            

            ></QRCodeScanner>
              <View style={{height : 50, width : '100%', position: 'absolute',
                      bottom: 50,
                      borderRadius: 20,
                      margin: 10,
                      backgroundColor: '#00000070',
                      color: '#FFFFFF',
                      alignItems: 'center',
                       justifyContent: "flex-end",
                       backgroundColor: "transparent"}}>
                <Text style={{color : '#fff'}}>Place a QR or barcode inside the scan area</Text>
              </View>
         </View>
      </SafeAreaView>
    </View>
  );
};
export default ScanQr;
