import React,{useEffect,useState} from 'react'
import  {View,Text,Button,Image,TouchableOpacity,StyleSheet,Share,Dimensions,Linking,StatusBar,SafeAreaView,FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
 import {StylesAll} from './commanStyle/objectStyle';
 import {COLORS} from './Styles/colors';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Ltout,loginAction,loginPhoneAction} from './actions/loginActions'
import { useDispatch,useSelector } from "react-redux";
import { purgeStoredState } from "redux-persist";
 

const MyInvites = ({navigation}) => {
 

  const [userData,setUserData] = useState({});
  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const{token} = LoginStatus
  const{loginData} = LoginStatus
  const [referralList , setReferralList] = useState([])

  const EmptyListMessage = ({item}) => {

    if (loginData === null) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop: 20}}>
          <Image
            resizeMode="cover"
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
          />
          <Text style={[{marginTop: 5,color:COLORS.grey}, StylesAll.boldFontLight2]}>
            Oops, login is required!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop: 50}}>
           
          <Text style={[{marginTop: 5,color:COLORS.grey}, StylesAll.boldFontLight2]}>
            Invite your friends and get rewarded!
          </Text>
        </View>
      );
    }
  };

  useEffect(() => {

    

    if (loginData != null){
   
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token',loginData.token);
    fetch(
      'http://sos.shiftlogics.com/api/user/referrallist',
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
          setReferralList(data.data)
          
        } else {
         
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };

  }
     
  }, [])
 
  useEffect(() => {

    if (loginData != null){

      

    let abort = new AbortController();
    var form = new FormData();
  
    fetch(
      
      `http://sos.shiftlogics.com/api/user/data?api_token=${loginData.token}`,
      {
        method: 'GET',
        headers: new Headers({
        Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
         // body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {

       

        if (data.status === 'success') {
          setUserData(data.data);
        } else {
          
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };

  }else{
   
  }
     
  }, [])

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Get free vouchers off for SOS!. Signup and use my code ${userData.referral_code} and get discount on your orders. Download SOS at http://onelink.to/vwzfbt`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };


  const renderItem = ({ item }) => {
    return(
     <View style={{flex:1,padding: 20}}>
 
     <View style={{flexDirection:'column'}}>
      
      <Text>{item.name} </Text>
  
      <Text>{item.email} </Text>

      </View>
   </View>
    );
  
     
    };


    return(
      
            <View style={StylesAll.flexScreen}>
            <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>

            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <View style={[StylesAll.commonHeader1,{paddingHorizontal:25 ,paddingBottom:30 } ]}>
            <Image source={require('./Image/back.png')} style={StylesAll.headArrow} resizeMode="contain"/>
            <Text style={[StylesAll.headTitle]}>INVITE</Text>
             </View>
        
             </TouchableOpacity>
             

            
            <View style={{flexDirection: 'column',alignItems: 'center',backgroundColor:'#F7F7F7'}}>
              <View style={{paddingHorizontal: 40}}>
            <Image source={require('./Image/girls.jpeg')} 
              style= {{maxWidth: '100%',height: windowHeight/3.5}} resizeMode= 'stretch'
             >
               
             </Image>
             </View>
            <View style={{marginLeft:20,marginRight:20,paddingHorizontal:15,borderRadius: 30,justifyContent: 'space-between',flexDirection: 'row',borderColor:COLORS.app_browntheme,borderWidth:2}}>

            <TextInput style={{width :'75%',height:45,color:COLORS.app_browntheme}}>{userData.referral_code}</TextInput>

            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={() =>{
               onShare()      
            }}> 
            <Text style={[{color: COLORS.app_browntheme,paddingLeft: 20,paddingRight: 10, fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 17,}]}>SHARE</Text>
            </TouchableOpacity>

            </View>
            <View>

            </View>
            <View style={{flexDirection : 'row',justifyContent: 'center',alignItems: 'center',alignContent: 'center',paddingTop:20,paddingBottom:20}}>
            
            <TouchableOpacity onPress={() =>{
              Linking.openURL(`whatsapp://send?text=Get free vouchers off for SOS!. Signup and use my code ${userData.referral_code} and get discount on your orders. Download SOS at http://onelink.to/vwzfbt`)
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_wasp.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_instagram.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>
            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_fb.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
                onShare()      
            }}>

            <View style={{width: 50, height : 50,margin : 10,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
            <Image source ={require('./Image/share_messanger.png')} resizeMode= 'contain' style={{width: 40,height: 40}}>
            </Image>
            </View>
            </TouchableOpacity>
            
            </View>
            </View>

            <View style={{backgroundColor: COLORS.profile_list_bg,flex:1,flexDirection: 'column',padding:20}}>
             <Text style={[{color: 'black',margin: 0,paddingBottom:15, fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 17,}]}>My invites</Text>
             <TouchableOpacity   onPress={()=>{
                 navigation.navigate('ContactsData',{code: userData.referral_code});
             }}>
             <View style={{flexDirection: 'row',width:'50%',justifyContent:'center',alignItems:'center',backgroundColor:COLORS.app_browntheme,borderRadius:50,paddingVertical:9}}>
            
             <Image source ={require('./Image/conList.png')} resizeMode= 'contain' style={{width: 20,height: 20,marginRight: 10}}>
             </Image>
             <Text style={{color: 'white'}}>Invite contacts</Text>
           
            </View>
            </TouchableOpacity>

          <View style={{flex:1}}>
      <FlatList
         data={referralList}
        showsVerticalScrollIndicator={false}
        //ListHeaderComponent={renderHeader}
         renderItem={renderItem}
        //stickyHeaderIndices={[0]}
        ListEmptyComponent={EmptyListMessage}
        keyExtractor={item => item.id}
      />
      </View>

            </View>
            </SafeAreaView>
        </View>
);
}
export default MyInvites;



