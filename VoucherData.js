import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

import {NavigationContainer, NavigationEvents} from '@react-navigation/native';
import {COLORS} from './Styles/colors';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import VoucherRewardItem from './VoucherRewardItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import RBSheet from 'react-native-raw-bottom-sheet';
import BottomView from './BottomView';

const VoucherData = ({navigation}) => {
  const [voucherData, setVoucherData] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [checkToken, setChecktoken] = useState(false);

  const [voucherDataValue, setVoucherDataVaue] = useState(voucherData);

  const [voucherTitle, setVoucheTitle] = useState('');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [voucherPhoto, setVoucherPhoto] = useState('');
  const [voucherId, setVoucherId] = useState('');

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {token} = LoginStatus;
  const {loginData} = LoginStatus;

  const refRBSheet = useRef();

  const createAlertWithOneButton = (itemValue) =>
    Alert.alert('Alert', itemValue, [
      {
        text: 'OK',
        onPress: () => {
          console.log('ok'), refRBSheet.current.close();
        },
      },
    ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (loginData === null) {
        setIsLoadingList(false);
        setChecktoken(true);
      } else {
        setChecktoken(false);

        var form = new FormData();
        form.append('api_token', loginData.token);
 
        fetch('http://sos.shiftlogics.com/api/voucher/viewVoucherAPP', {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        })
          .then((response) => response.json())
          .then((data) => {
           

           
            if (data.status === 'success') {
              
              setIsLoadingList(false);

              setVoucherData(data.data);
            } else {
              setIsLoadingList(false);
            }
          })
          .catch((e) => console.log(e));
      }
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const addVoucherAPI = (voucherId) => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', loginData.token);
    form.append('voucherID', voucherId);

    fetch(
      'http://sos.shiftlogics.com/api/favourite/addFavourite',
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
          createAlertWithOneButton(data.Msg);
        } else {
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const EmptyListMessage = ({item}) => {
    if (checkToken === true) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
          <View style={StylesAll.alertMsg}>
            <Image
              resizeMode="cover"
              style={{width: 40, height: 40}}
              source={require('./Image/opps.png')}
            />
            <Text style={[{marginVertical: 10}, StylesAll.boldFont]}>
              Oops, login is required!
            </Text>
            <Text>You need to login to access this feature</Text>
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

  const commafy=( num ) =>{
    num.toString().replace( /\B(?=(?:\d{3})+)$/g, "," );
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Voucherdetail', {
            dataValue: item,
            isVoucher: true,
          });
        }}>
        <View style={StylesAll.rewardLists}>
          <View>
            <Image
              source={{uri: `http://sos.shiftlogics.com/${item.photo}`}}
              style={[
                StylesAll.imageStyle,
                {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  width: '100%',
                  height: undefined,
                  aspectRatio: 800 / 450,
                },
              ]}
              resizeMode="cover"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingTop: 5,
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
              <Text
                style={[StylesAll.md_Title11, {marginBottom: 5}]}
                numberOfLines={1}>
                {item.title}
              </Text>
 
              <Text numberOfLines={1} style={StylesAll.md_Title12}>{item.sub_title}</Text>
            </View>
            <View>
              <View style={StylesAll.sm_Button}>
                <Text style={StylesAll.btnText} numberOfLines={1} >
                  {' '}
                  {(item.redeem_value === null || item.redeem_value === "0") ? 'Free' :  item.redeem_value.length <= 5 ?  parseInt( item.redeem_value ).toLocaleString()   + ' pts' :  parseInt(item.redeem_value.substring(0, 5)).toLocaleString()   + ' pts'} 
                  {' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.app_bgtheme,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.app_bgtheme}></StatusBar>
      <SafeAreaView style={{flex: 1}}>
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader,{paddingBottom: 10}]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}>VOUCHER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={voucherData}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{padding: 25}}
        />
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

export default VoucherData;

const styles = StyleSheet.create({
  carsection1: {
    flex: 1,
    borderRadius: 10,
    height: 300,
    backgroundColor: COLORS.redTheme,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    width: windowWidth / 2.2,
    flexDirection: 'column',
  },
  emptyListStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
  headerText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height / 2.5,
  },
});
