 
import React,{useEffect,useState} from 'react';
import { Dimension,StatusBar,View,FlatList,TouchableOpacity, Text,Image ,Dimensions,StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './Styles/colors'
import { ScrollView } from 'react-native-gesture-handler';
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";

 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const TransactionDetail = ({navigation,route}) => {

const [transactionDetail,SetTransactionDEtail] = useState({})
const [isLoadingList,setIsLoadingList] = useState(true)

   useEffect(() => {

      console.log('myDataValue',route.params?.transData.id);

   
      let abort = new AbortController();
      var form = new FormData();
       form.append('transactionid',route.params?.transData.id);

      fetch(
        'http://sos.shiftlogics.com/api/merchant/viewpayment',
        {
              method: 'POST',
              headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
          }),
          body: form,
        },
        {signal: abort.signal},
       )
        .then((response) => response.json())
  
        .then((data) => {
          if (data.status === 'success') {
             
             SetTransactionDEtail(data.data);
             setIsLoadingList(false)
          } else {
             setIsLoadingList(false)
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
   }, [])
    return(
 
        <ScrollView >
            <View style={{backgroundColor:COLORS.app_light_theme ,flex:1,flexDirection:'column',height:windowHeight}}>
                <View style={{margin:20,padding:20,backgroundColor:COLORS.white,flexDirection:'column'}}>

                <View style={{padding:5}}>
                 <Text>PaymentId: {transactionDetail.paymentID}</Text>    
                 </View>
                 <View style={{padding:5}}>
                    <Text style={[StylesAll.LoginBoldFont,{color:COLORS.appBrown}]}>MYR {transactionDetail.amount}</Text>    
                 </View>

                 <View style={{flexDirection:'row',padding:10}}> 
                 
                 <Image source={require('./Image/round.png')} 
                        style={{width:20,height:20}}    
                 />

                <Text>  {transactionDetail.point} Point Earned</Text>
                 </View>

                 <View style={{padding:10}}>
                    <Text>Customer Name</Text>
                    <Text style={[StylesAll.boldFont,{paddingTop: 5}]}>{transactionDetail.username}</Text>  
                 </View>

                 <View style={{padding:10}}>
                    <Text>Customer Phone Number</Text>
                    <Text  style={[StylesAll.boldFont,{paddingTop: 5}]}>{transactionDetail.phone}</Text>  
                 </View>

                 <View style={{padding:10}}>
                    <Text>Outlet Name</Text>
                    <Text  style={[StylesAll.boldFont,{paddingTop: 5}]}>{transactionDetail.outlet}</Text>  
                 </View>

                 <View style={{padding:10}}>
                    <Text>Transaction Type</Text>
                    <Text style={[StylesAll.boldFont,{paddingTop: 5}]}>{transactionDetail.transaction_type}</Text>  
                 </View>

                 <View style={{padding:10}}>
                    <Text>Date</Text>
                    <Text style={[StylesAll.boldFont,{paddingTop: 5}]}>{transactionDetail.date}</Text>  
                 </View>


                 <View style={{padding:10}}>
                    <Text>Time</Text>
                    <Text  style={[StylesAll.boldFont,{paddingTop: 5}]}>J{transactionDetail.date}</Text>  
                 </View>

                </View>

                <View>

               </View>

               <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>     

            </View>

           

            </ScrollView>
 
           
          );

};

export default TransactionDetail;

const styles = StyleSheet.create({
  btnRedeem : {

  }
 });
 