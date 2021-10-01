import React,{useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {StylesAll} from './commanStyle/objectStyle';
import { COLORS } from './Styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndi from './ActivityIndi';

const OnlineTopup = ({navigation}) => {
    const [getAmt, setAmt] = useState(0);
    const LoginStatus = useSelector((state) => state.loginDetails);

    const {loginData} = LoginStatus;
    const [isLoadingList, setIsLoadingList] = useState(false);


    const topupAction = () => {
        let abort = new AbortController();
        var form = new FormData();
        form.append('api_token', loginData.token);
        form.append('amount',getAmt);
     
        fetch(
          'http://sos.shiftlogics.com/api/user/topup',
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
            setIsLoadingList(false);
            if (data.status === 'success')  {

              console.log('https://www.tokyo.shiftlogics.com/payment/online/${data.data.pay_token}',data.data.pay_token)
              navigation.navigate('MyWeb', {
                  urlString:`https://www.tokyo.shiftlogics.com/payment/online/${data.data.pay_token}`,title : 'Payment',payToken : data.data.pay_token
                });
             }

          // Alert.alert(
          //   data.msg,
          //   "",
          //   [
          //     { text: "OK", onPress: () => {
          //   if (data.status === 'success')  {
             
      
          //       navigation.navigate('MyWeb', {
          //           urlString:`https://www.tokyo.shiftlogics.com/payment/online/${data.data.pay_token}`,title : 'Payment',payToken : data.data.pay_token
          //         });
          //      }
          //     }}
          //   ],
          //   { cancelable: false }
          //    );
          })
          .catch((e) => console.log(e));
        return () => {
          abort.abort();
        };
      };


  return (
   
      <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>

          <View style={{flexDirection:'column',flex:1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[StylesAll.commonHeader1]}>
            <Image
              source={require('./Image/back.png')}
              style={StylesAll.headArrow}
              resizeMode="contain"
            />
            <Text style={[StylesAll.headTitle]}>ONLINE TOP UP</Text>

          
          </View>
        </TouchableOpacity>

        <View style={{flexDirection:'column',margin:20,height:100}}>
        <View style={{flexDirection:'row',flex:1,justifyContent:'space-evenly',margin:5}}>
           
   
            <TouchableOpacity onPress={() =>{
                setAmt(10);

                
            }} style={[getAmt === 10 ? StylesAll.amountSelect : StylesAll.amountUnSelect]}>
                    <Text style={StylesAll.numberTitle}>10</Text>
            </TouchableOpacity>
          
            
            <TouchableOpacity  onPress={() =>{
                setAmt(20)
            }} style={ [getAmt === 20 ? StylesAll.amountSelect : StylesAll.amountUnSelect,{marginHorizontal:5}]}>
                    <Text style={StylesAll.numberTitle}>20</Text>
            </TouchableOpacity>
           

             <TouchableOpacity   onPress={() =>{
                setAmt(30)
            }}  style={[getAmt === 30 ? StylesAll.amountSelect : StylesAll.amountUnSelect]}>
                    <Text style={StylesAll.numberTitle}>30</Text>
            </TouchableOpacity>
            
         


       </View>
       <View style={{flexDirection:'row',flex:1,justifyContent:'space-evenly',marginBottom:5,marginHorizontal:5}}>
           
            <TouchableOpacity   onPress={() =>{
                setAmt(50)
            }} style={[getAmt === 50 ? StylesAll.amountSelect : StylesAll.amountUnSelect]}>
                   <Text style={StylesAll.numberTitle}>50</Text>
           </TouchableOpacity>
            <TouchableOpacity   onPress={() =>{
                setAmt(100)
            }}  style={[getAmt === 100 ? StylesAll.amountSelect : StylesAll.amountUnSelect,{marginHorizontal:5}]}>
                   <Text style={StylesAll.numberTitle}>100</Text>
           </TouchableOpacity>
            <TouchableOpacity   onPress={() =>{
                setAmt(200)
            }}  style={[getAmt === 200 ? StylesAll.amountSelect : StylesAll.amountUnSelect]}>
                   <Text style={StylesAll.numberTitle}>200</Text>
           </TouchableOpacity>
          

      </View>

       </View>

    <View style={{marginHorizontal:20,borderBottomWidth: 2,borderBottomColor:  COLORS.app_browntheme,flexDirection:'row',justifyContent:'space-between'}}>

    <View style={{justifyContent:'center',alignItems:'center',width: 40,}}>
    <Text style={StylesAll.numberTitle}>RM</Text>
    </View>
      <TextInput style={{ flex:1,fontSize:18,color:'#313131' ,fontFamily: 'SFCompactDisplay-Bold'}}
      editable={false}
          placeholder="0.00"
          onChangeText={(text) => setAmt(text)}              
          keyboardType='numeric'
          maxLength={12}
          placeholderTextColor="#ADADAD"
          value={getAmt.toFixed(2)}
     
      ></TextInput>

    </View>

    <View style={{alignItems: 'center',justifyContent:'flex-end',flex:1}}>
            <TouchableOpacity
            disabled={ getAmt !== 0 ? false : true} 
              style={{width: '100%', margin: 10}}
              onPress={() => {
                setIsLoadingList(true);
                topupAction();
              }}>
              <View
                style={[
                    getAmt !== 0 ? {
                    width: '100%',
                    backgroundColor: COLORS.app_browntheme,
                    justifyContent: 'center',
                    padding: 15,
                    borderRadius: 50,
                    alignItems: 'center',
                  } :
                  {
                    width: '100%',
                    backgroundColor: '#D3C5A0',
                    justifyContent: 'center',
                    padding: 15,
                    borderRadius: 50,
                    alignItems: 'center',
                  } ,
                ]}>
                <Text style={[{color: 'white', fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 16}]}>
                  SUBMIT
                </Text>
              </View>
            </TouchableOpacity>
          </View>

            </View>

            <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default OnlineTopup;
