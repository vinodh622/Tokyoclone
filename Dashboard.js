import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  Modal
} from 'react-native';
import {date} from 'yup/lib/locale';
import {} from './';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import {COLORS} from './Styles/colors';
import moment from 'moment';

import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Fourth Item',
  },
];

const Dashboard = ({navigation}) => {
  //Declaration

  const [userData, setUserData] = useState({});

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [favourite, setFavourite] = useState([]);

  const[modalVisible,setModalVisible] = useState(false);


  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const CarouselCardItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Voucherdetail', {
            dataValue: item,
            isVoucher: true,
          });
        }}>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <View
            key={index}
            style={[{borderRadius: 17}, styles.shadowLayout]}></View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (loginData === null) { 
       setIsLoadingList(false);
        } else {
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

              setFavourite(data.data);
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

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (loginData !== null) {
  //       let abort = new AbortController();
  //       var form = new FormData();
  //       form.append('api_token', loginData.token);

  //       fetch(
  //         'http://tokyo.shiftlogics.com/api/favourite/viewFavourite',
  //         {
  //           method: 'POST',
  //           headers: new Headers({
  //             Accept: 'application/json',
  //             'Content-Type': 'multipart/form-data',
  //           }),
  //           body: form,
  //         },
  //         {signal: abort.signal},
  //       )
  //         .then((response) => response.json())

  //         .then((data) => {
  //           if (data.status === 'success') {
  //             setFavourite(data.data);
  //           } else {
  //           }
  //         })
  //         .catch((e) => console.log(e));

  //       return () => {
  //         abort.abort();
  //       };
  //     } else {
  //       // loginAlertWithTwoButton();
  //     }
  //   });
  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (loginData != null) {
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
            //  body: form,
          },
          {signal: abort.signal},
        )
          .then((response) => response.json())

          .then((data) => {
            if (data.status === 'success') {

             

              setUserData(data.data);

              Object.entries(data.data).forEach(([key, value]) => {});

              setIsLoadingList(false);
            } else {
              setIsLoadingList(false);
            }
          })
          .catch((e) => console.log(e));
        return () => {
          abort.abort();
        };
      } else {
        setIsLoadingList(false);
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

             
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity  onPress={() => {
        navigation.navigate('Voucherdetail',{dataValue : item,isVoucher:true});
        }}>
      <View
        style={[
          StylesAll.rewardLists,
          {marginRight: 15, width:ITEM_WIDTH},
        ]}>
        <View style={{width: '100%' ,
                height: undefined,
                aspectRatio: 800 / 450,}}>
          <Image
            source={{uri: `http://sos.shiftlogics.com/${item.photo}`}}
            style={[
              StylesAll.imageStyle,
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: COLORS.app_brownlightheme,
              },
            ]}
            resizeMode="cover"
          />
        </View>
        <View style={{flexDirection: 'row', padding: 15, alignItems: 'center',justifyContent:'space-between'}}>
          <View style={{flexDirection: 'column', paddingRight: 10}}>
            <Text
              style={[StylesAll.md_Title11],{marginBottom:5}}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {item.title}
            </Text>

            <Text numberOfLines={1} style={[StylesAll.md_Title12,]}>{item.sub_title}</Text>
          </View>
          <View>
            <View style={StylesAll.sm_Button}>
              <Text
                style={[StylesAll.btnText, {textAlign: 'center'}]}
                numberOfLines={1}>
                {(item.redeem_value === null || item.redeem_value === "0") ? 'Free' :  item.redeem_value.length <= 5 ? item.redeem_value.length   + ' pts' : item.redeem_value.substring(0, 5)   + ' pts'} 
              </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = ({}) => {
    return (
      <View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </View>
    );
  };

  const LoginEmpty = () => {
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
  };

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

      {loginData === null ? (
        <LoginEmpty />
      ) : (
        <SafeAreaView
          style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF'}}>
          <View style={StylesAll.headWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={[StylesAll.commonHeader]}>
                <Image
                  source={require('./Image/back.png')}
                  style={StylesAll.headArrow}
                  resizeMode="contain"
                />
                <Text style={[StylesAll.headTitle]}>MEMBER</Text>
              </View>
            </TouchableOpacity>
          </View>

            <View style={StylesAll.Wallet_layer1}>
            <Text style={{paddingVertical:5,  fontFamily: 'SFCompactDisplay-Light',
              fontSize : 15}}>Wallet Balance</Text>
            <Text style={StylesAll.wl_ammount}>
              RM {(Math.round(userData.wallet * 100) / 100).toFixed(2)}{' '}
            </Text>
          </View>

          <View style={StylesAll.commonWrapper}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <View
                style={{
 
                  flexDirection: 'row',
                  flex:1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  
                  paddingTop : 10,
                  paddingBottom : 25,
                }}>
                <TouchableOpacity style={{flex:1}}
                 activeOpacity={1.0}
                  onPress={() => {
                    navigation.navigate('Payment', {
                      memberData: userData,
                      isPayment: true,
                    });
                  }}>
                  <View style={StylesAll.listButton}>
                    <Image
                      source={require('./Image/pay.png')}
                      style={StylesAll.btnIcons}
                    />

                    <Text style={StylesAll.btnText}>Pay</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:1}}
                 activeOpacity={1.0}
                  onPress={() => {
                    // navigation.navigate('Payment', {
                    //   memberData: userData,
                    //   isPayment: false,
                    // });

                    setModalVisible(true);
                    
                  }}>
                  <View style={[StylesAll.listButton,{marginLeft :10}]}>
                    <Image
                      source={require('./Image/topup.png')}
                      style={StylesAll.btnIcons}
                    />

                    <Text style={StylesAll.btnText}>Top Up</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:1}}
                activeOpacity={1.0}
                  onPress={() => {
                    navigation.navigate('History');
                  }}>
                  <View style={[StylesAll.listButton,{marginLeft :10}]}>
                    <Image
                      source={require('./Image/history.png')}
                      style={StylesAll.btnIcons}
                    />

                    <Text style={StylesAll.btnText}>History</Text>
                  </View>
                </TouchableOpacity>
              </View>

           
              <View style={StylesAll.shadowLayout}>
                <ImageBackground
                  imageStyle={{borderRadius: 15}}
                  source={require('./Image/member_card.png')}
                  style={[{width: '100%' ,
                  height: 200}]}>
                  <View style={{paddingVertical: 20, position: 'relative'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={StylesAll.memberStatus}>
                        <Text
                          style={[
                            global.whitecolor,
                            {fontSize: 18, textAlign: 'right'},
                          ]}>
                          {' '}
                          <Text
                            style={{
                              fontFamily: 'SFCompactDisplay-Bold',
                              color: '#fff',
                              textTransform: 'uppercase',
                            }}>
                            {userData.user_type}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'SFCompactDisplay-Medium',
                              color: '#fff',
                            }}>
                            {' '}
                            MEMBER
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingHorizontal: 20,
                      }}>
                      <View> 
                        <Text
                          style={[
                            StylesAll.whitecolor,
                            StylesAll.boldFont,
                            {fontSize: 15, marginBottom: 10},
                          ]}>
                          {userData.name}
                        </Text>

                        <Text
                          style={[
                            StylesAll.whitecolor,
                            {fontSize: 12, paddingBottom: 5},
                          ]}>
                          ID:{userData.referral_code}
                        </Text>

                        <Text style={[StylesAll.whitecolor, {fontSize: 12}]}>
                          Member Since :{' '}
                          {moment(userData.created_at).format('DD/MM/yyyy')}{' '}
                        </Text>
                        <Text></Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center',marginTop: 0}}>
                          <Text style={[StylesAll.whitecolor, {fontSize: 12}]}>
                            Your Points:{' '}
                          </Text>
                          <Text
                            style={[
                              StylesAll.whitecolor,
                              StylesAll.boldFont,
                              {fontSize: 18},
                            ]}>
                            {userData.point} Points
                          </Text>
                        </View>
                      </View>

                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Payment', {
                              memberData: userData,
                              isPayment: true,
                            });
                          }}>
                          <Image source={require('./Image/order.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              <View style={{marginTop: 15}}>
                {favourite.length == 0 ? null : (
                  <Text
                    style={[
                       
                      {paddingTop: 20, paddingBottom: 15,fontFamily:'SFCompactDisplay-Medium',fontSize:20},
                    ]}>
                    Voucher
                  </Text>
                )}

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={favourite}
                  //ListEmptyComponent={EmptyListMessage}
                  keyExtractor={(item) => item.id}
                  //keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  ItemSeparatorComponent={ItemSeparatorView}
                  contentContainerStyle={{paddingHorizontal: 5,paddingVertical: 10}}
                />
              </View>

              {/* <FlatList  
           
            showsHorizontalScrollIndicator={false}
            
            data= {favourite}
 
            renderItem={renderItem}/> */}
            </ScrollView>
          </View>

           <Modal animationType="none" transparent={true} visible={modalVisible}>
           <SafeAreaView style={StylesAll.flexWtrapper}>
           
           <TouchableOpacity style={[StylesAll.common_Modal, {justifyContent: 'center'}]} onPress={() => setModalVisible(false)}>
             <View style={StylesAll.modalBox}>

             <View style={{marginTop: 5,marginBottom:5,justifyContent:'center',alignItems:'center'}}>
                <Text style={[StylesAll.boldFont,{color:'#343434',fontSize:20,textAlign:'center'}]}>
                 Top Up
                </Text>
              </View>

              <View style={{marginTop: 20}}>
             
                <Text style={[StylesAll.lightFont,{color:'#444444' ,textAlign:"center"}]}>
                  {''} Select a way to top up your wallet
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  
                    navigation.navigate('Payment', {
                      memberData: userData,
                      isPayment: false,
                    });

                  }}
                  style={{flex: 1}}>
                  <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', fontSize: 15, padding: 8},
                      ]}>
                      CASHIER
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false)
                    navigation.navigate('OnlineTopup') 
                  
                  }}
                  style={{flex: 1}}>
                  <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', fontSize: 15, padding: 8},
                      ]}>
                      ONLINE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> 
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>


          <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
        </SafeAreaView>
      )}
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  navBar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: 30,
  },

  body: {
    flex: 3,
    display: 'flex',
  },

  carsection: {
    backgroundColor: '#EECA39',
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },

  carbackground: {
    flex: 1,
  },
});
