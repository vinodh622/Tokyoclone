import React from 'react';
import {View, Text, StatusBar, SafeAreaView, Image} from 'react-native';
import {StylesAll} from "./commanStyle/objectStyle"

import QRCode from 'react-native-qrcode-image';
 

 const TopUp = ({ navigation }) => {

  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={StylesAll.qrBox}>
          <QRCode
           
          size={200}
          bgColor='#FFFFFF'
          fgColor='#000000'
          />
          </View>

          <View style={StylesAll.qrbottomBox}>
            <Text style={StylesAll.btnText}>Wallet</Text>

            <Text style={StylesAll.btnText}>RM 10.00</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default TopUp;
