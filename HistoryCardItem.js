import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";


const HistoryCardItem = ({item,index}) => {

  console.log('itemitemitem value',item);


    return(

        <View>
          <View style={StylesAll.historyLists}>
          <View style={StylesAll.hs_row_wrapper}>
            <Text style={StylesAll.commom_color}>{item.created_at}</Text>
            <View style={StylesAll.common_successBtn}>
              <Text style={{color: '#967421', fontFamily: 'SFCompactDisplay-Bold'}}>
                {item.status === 1 ? "Success" : item.status === 2 ? "Canceled" : "Cancel"}
              </Text>
            </View>
          </View>

          <View style={[StylesAll.hs_row_wrapper]}>
            <Text style={StylesAll.payId}>Payment ID:{item.paymentID}</Text>

            <Text style={[StylesAll.hs_Amount]}> {item.status === 1 ? (item.pay_type === 'Payment' ? '-' : '+' ) :  (item.pay_type === 'Topup' ? '-' : '+' ) }  RM {(Math.round(item.amount * 100) / 100).toFixed(2)}</Text>
          </View>
        </View>
        </View>

    );
};


export default HistoryCardItem;
