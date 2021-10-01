import React, { useState, useEffect } from 'react';
import {Text,View,FlatList,StyleSheet,ImageBackground, Image,TouchableOpacity,Platform,Alert} from 'react-native';
import {COLORS} from './Styles/colors';
import VoucherRewardItem from "./VoucherRewardItem";
import { StylesAll } from "./commanStyle/objectStyle";


import { Ltout,loginAction,loginPhoneAction } from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
 

const HomeScreen = ( {navigation,route} ) => {
const [selectedFlateList, setSelectedFlateList] = useState(null);

  console.log("idValueidValueidValue",route.params?.idValue);

  const LoginStatus = useSelector((state) => state.loginDetails);
  const{loginData} = LoginStatus
  const[favourite , setFavourite] = useState([]);


  const loginAlertWithTwoButton = () => {
    Alert.alert(
      'Alert',
      'Please Login to Reservation',
      [{
        text: "Cancel",
        onPress: () => {

        },
         style: "cancel",
      },
       {
         text: "OK",
         onPress: () => {
          //navigation.navigate('Detail');
       },
      
       }]

    );
  };

 
  useEffect(() => {
  
    const unsubscribe = navigation.addListener('focus', () => {
   
    if (loginData !== null){
      let abort = new AbortController();
      var form = new FormData();
       form.append('api_token',loginData.token);


       console.log('formformformform',form)
       

      fetch(
        'http://sos.shiftlogics.com/api/favourite/viewFavourite',
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

     
          console.log('datadata rewards',data)

          if (data.status === 'success') {
            setFavourite(data.data);
          } else {
            
          }
        })
        .catch((e) => console.log(e));
  
      return () => {
        abort.abort();
      };

    }else{
     // loginAlertWithTwoButton();
    }

    });
    return () => {
      unsubscribe;
    };


    }, [ ]);

   
    const renderItem = ({item,index}) => {
      return (
        <TouchableOpacity disabled={item.remaining_voucher == '' ||   item.remaining_voucher == 'null' ||  item.remaining_voucher == '0' ?  true : false  } onPress={() =>{
          navigation.navigate('RewardDetails',{dataValue : item, isVoucher : false,indexValue : index});
        }}>
        <View style={StylesAll.rewardLists}>
          <View>

            <Image
              source={{uri: `http://sos.shiftlogics.com/${item.photo}`}}
              style={[
                StylesAll.imageStyle,
                {borderTopLeftRadius: 10, borderTopRightRadius: 10,backgroundColor:COLORS.app_brownlightheme,width: '100%' ,
                height: undefined,
                aspectRatio: 800 / 450,},
              ]}
              resizeMode="cover"
            />
          </View>
  
   
    
          <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
            <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
              <Text style={[StylesAll.md_Title11,{marginBottom:5}]} numberOfLines={1} >
                {item.title}
              </Text>
              
              <Text numberOfLines={1} style={StylesAll.md_Title12}>{item.sub_title}</Text>
             </View>
              <View>


            { item.remaining_voucher == '' ||   item.remaining_voucher == 'null' ||  item.remaining_voucher == '0' ?  
              <View style={StylesAll.sm_Button1}>
              <Text style={StylesAll.btnText}>Used</Text>
            </View> 
            : 
          <View style={StylesAll.sm_Button}>
          <Text style={StylesAll.btnText}>Use now</Text>
        </View>
         }  
         </View>
          </View>

  
        { item.remaining_voucher == '' ||   item.remaining_voucher == 'null' ||  item.remaining_voucher == '0' ?  <View style={{position:"absolute" ,top:0 ,right:0 ,width:"100%" ,height:"100%" ,backgroundColor:"#fafbfb96" ,marginBottom:20 }}>
          </View> : <View></View>
          }      
        </View>
        </TouchableOpacity>
      );
    };






    const EmptyListMessage = ({item}) => {

      if (loginData === null) {
        return (
           <TouchableOpacity onPress={()=>navigation.navigate('Detail')}>
           <View style={[StylesAll.alertMsg,{flex:1}]}>
            <Image
              resizeMode="cover"
              style={{width: 40, height: 40}}
              source={require('./Image/opps.png')}
            />
           <Text style={[{marginVertical: 10}, StylesAll.boldFont]}>
            Oops, login is required!
           </Text>
           <Text>You need to login to access  this feature</Text>
           </View>
           </TouchableOpacity>
      
        );
      } else {
        return (
          <View style={StylesAll.alertMsg}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./Image/opps.png')}
              resizeMode="cover"
            />
            <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
               No new voucher at this time!
            </Text>
          </View>
        );
      }
    };

    
    return (

      
         <View style={{backgroundColor:COLORS.app_bgtheme,flex:1}}>
           
            <FlatList  
            contentContainerStyle={{padding:30}}
   
            showsVerticalScrollIndicator={false}

            data= {favourite}
 
            renderItem={renderItem}
            
            ListEmptyComponent={EmptyListMessage}
            
            keyExtractor={(item,index)=> index.toString()}
            />
            
        </View>
  
    );

  }
        export default HomeScreen;