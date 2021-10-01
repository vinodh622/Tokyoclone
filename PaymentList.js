

import React,{useEffect,useState} from 'react';
import {Text,Dimensions,StatusBar,View,StyleSheet,Image,ScrollView,ImageBackground,FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import  {COLORS} from './Styles/colors'
import ActivityIndi from "./ActivityIndi";
import { StylesAll } from "./commanStyle/objectStyle";
import HistoryCardItem from './HistoryCardItem';
import {useDispatch, useSelector} from 'react-redux';


const PaymentList = ({navigation}) => {
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
        form.append('type','payment');

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
    
            
    });
 
    return () => {
      unsubscribe;
      //abort.abort();
    };

     }, [navigation]);
 
    return(
           
<View style={[StylesAll.commonWrapper, {paddingTop:40}]}>
     
        
              
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

export default PaymentList;



