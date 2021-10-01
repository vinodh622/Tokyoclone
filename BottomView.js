

import React from 'react';
import {Text,Dimensions, View,SafeAreaView, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity,TextInput, Constants,Linking} from 'react-native';
import {COLORS} from "./Styles/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const BottomView = ({dataValue}) => {


    console.log('ggggg',dataValue);

    return(
        <View style={{flex: 1,flexDirection : 'column',backgroundColor:"#fafbfb"}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',paddingBottom: 30}}>

                    <TouchableOpacity onPress={() =>{
                                          Linking.openURL(
                                                 `http://maps.apple.com/maps?daddr=${(myData[0])},${(myData[1])}`
                                              );
                    }}>        
                    <View style={{margin: 10,paddingVertical:20,backgroundColor: COLORS.app_browntheme,alignItems: 'center',justifyContent: 'center',borderRadius: 50}}>
                    <Text style={{color:'white',fontSize: 18}}>Google</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>        
                    <View style={{margin: 10,paddingVertical:20,backgroundColor: COLORS.app_browntheme,alignItems: 'center',justifyContent: 'center',borderRadius: 50}}>
                    <Text style={{color:'white',fontSize: 18}}>Apple</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>     
                    <View style={{margin: 10,paddingVertical:20,backgroundColor: COLORS.app_browntheme,alignItems: 'center',justifyContent: 'center',borderRadius: 50}}>
                    <Text style={{color:'white',fontSize: 18}}>Waze</Text>
                    </View>
                     </TouchableOpacity>


                    </View>
                    </SafeAreaView>
            </View>
    );
}
export default BottomView;
 