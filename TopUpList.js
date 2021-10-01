
import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";
import HistoryCardItem from './HistoryCardItem';
import {useDispatch, useSelector} from 'react-redux';

const TopUpList = ({navigation}) => {

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

    const [isLoadingList,setIsLoadingList] = useState(true)
    const [transactionHistory , setTransactionHistory] = useState([]);
 
    const EmptyListMessgae =({item}) => {
      return(
        <View style={StylesAll.alertMsg}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./Image/opps.png')}
          resizeMode="cover"
        />
        <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
         No Data Found!
        </Text>
      </View>

    );
    };

    useEffect(() => {
 
      const unsubscribe = navigation.addListener('focus', () => {
    
        let abort = new AbortController();
        var form = new FormData();
        form.append('api_token',loginData.token);
        form.append('type','topup');

        fetch(
          'http://sos.shiftlogics.com/api/user/transactionhistory',
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

            setIsLoadingList(false)
            if (data.status === 'success') {
                setTransactionHistory(data.data);
               setIsLoadingList(false)
            } else {
                setIsLoadingList(false)
            }
          })
          .catch((e) => console.log(e));
    
        return () => {
          abort.abort();
        };


      
    });
 
    return () => {
      unsubscribe;
    };



      }, [navigation]);


   
 
    // const renderItem= ({item}) => {
    //   return(

    //     <View>
    //       <View style={StylesAll.historyLists}>
    //       <View style={StylesAll.hs_row_wrapper}>
    //         <Text style={StylesAll.commom_color}>02 Feb 2021 ,9:30 pm</Text>

    //         <View style={StylesAll.common_successBtn}>
    //           <Text style={{color: '#967421', fontFamily: 'Roboto-Bold'}}>
    //             Success
    //           </Text>
    //         </View>
    //       </View>

    //       <View style={StylesAll.hs_row_wrapper}>
    //         <Text style={StylesAll.payId}>Payment ID:PM1000001022</Text>

    //         <Text style={StylesAll.hs_Amount}> - RM 10.00</Text>
    //       </View>
    //     </View>

    //     <View style={StylesAll.historyLists}>
    //       <View style={StylesAll.hs_row_wrapper}>
    //         <Text style={StylesAll.commom_color}>02 Feb 2021 ,9:30 pm</Text>

    //         <View style={StylesAll.common_successBtn}>
    //           <Text style={{color: '#967421', fontFamily: 'Roboto-Bold'}}>
    //             Success
    //           </Text>
    //         </View>
    //       </View>

    //       <View style={StylesAll.hs_row_wrapper}>
    //         <Text style={StylesAll.payId}>Payment ID:PM1000001022</Text>

    //         <Text style={StylesAll.hs_Amount}> - RM 10.00</Text>
    //       </View>
    //     </View>
         
    //     </View>

    //   );
    // };
    return(
            // <View style={{flex:1,flexDirection: 'column',backgroundColor: COLORS.app_bgtheme,margin:10}}>

            //         <View style={{backgroundColor: COLORS.app_bgtheme,flex: 0.25,borderBottomRightRadius: 25,borderBottomLeftRadius: 25,flexDirection:'column',justifyContent: 'flex-end',alignItems: 'center',position:'relative'}}>
 
            //         <View style={{marginLeft:5,marginRight: 5,position: 'absolute',width:'85%',height:60,bottom:-30,flexDirection:'row',alignContent:'center',justifyContent: 'space-between'}}>
                   
            //         <TouchableOpacity style={{backgroundColor:COLORS.white,flex:1,borderRadius:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
            //          onPress={()=>{
            //             setIsLoadingList(true)
            //             setTransactionHistory([]);
            //             transactionAPI('payment');
            //          }}
            //         >  
            //           <Image  source={require('./Image/coin.png')}
            //                   style={{height: 25,width:25,resizeMode:'cover'}}
            //           />

            //           <Text style={{paddingLeft:10,color:COLORS.black}}>Payment</Text>

            //           </TouchableOpacity>
                     
            //           <TouchableOpacity style={{backgroundColor:COLORS.appBrown,flex:1,marginLeft: 15,borderRadius:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() =>{
            //               setIsLoadingList(true)
            //               setTransactionHistory([]);
            //               transactionAPI('topup');
            //           }}>
        
            //           <Image  source={require('./Image/topup.jpeg')}
            //                   style={{height: 25,width:25,resizeMode:'cover'}}
            //           />

            //           <Text style={{paddingLeft:10,color:COLORS.white}} >Top-up</Text>

            //         </TouchableOpacity>

            //         </View>

            //         </View>

            <View style={[StylesAll.commonWrapper,{paddingTop:40}]}>
                <FlatList
                
                 showsVerticalScrollIndicator={false}
                 data= {transactionHistory}
                 //data = {DATA}
                 keyExtractor={item => item.id.toString()}
                 renderItem= {HistoryCardItem}
                 ListEmptyComponent={EmptyListMessgae}
                 />
 
            </View>

    );

};

export default TopUpList;

