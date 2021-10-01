import React, {useState, useEffect,useRef} from 'react';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Formik} from 'formik';
import * as yup from 'yup';
import ActivityIndi from './ActivityIndi';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';
import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import FlatListItemSeparator from './FlateListSeparatro';

import {
  StatusBar,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  CheckBoxProps,
  Touchable,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReservationSchema = yup.object({
  reserName: yup.string().required('empty'),
  reserPhone: yup.string().required('empty'),
  reserDescription: yup.string().required('empty'),
  agreeToReservation: yup.bool().required('empty'),
});

const Reservation = ({navigation}) => {

  const refRBSheet = useRef();

   const isFocused = useIsFocused();

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const ReservationAgree = () => {
    Alert.alert('Alert', 'Please Select agree to the reservation terms', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const AdultAlertWithTwoButton = () => {
    Alert.alert('Alert', 'Adult must have Greater than 0', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          
        },
      },
    ]);
  };

  const loginAlertWithTwoButton = () => {
    Alert.alert('Alert', 'Please Login to Reservation', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Detail');
        },
      },
    ]);
  };

  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert('Cancel Reservation', 'Are you sure you want to cancel?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel pressed'), setSelectedFlateList(false);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('ok'), removeReservationAPI(itemValue);
        },
      },
    ]);

  const [viewReservation, setViewReservation] = useState([]);
  var today = new Date();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);

  const [selectedDate, setSelectedDate] = useState('Date');
  const [selectedTime, setSelectedTime] = useState('Time');

  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);

  const [paxName, setPaxName] = useState('Pax');

  const [outlet, setOutlet] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [modelVisible, setModalVisible] = useState(false);
  const [modelVisible1, setModalVisible1] = useState(false);
  const [case1, setCase1] = useState(true);
  const [case2, setCase2] = useState(false);
  const [case3, setCase3] = useState(false);
  const [case4, setCase4] = useState(false);

  const [reserveTermsmodel, setReserveTermsmodel] = useState(false);




  const [currentSelectedOutLet, setCurrentSelectedOutlet] = useState({});

  const [currentId, setCurrentId] = useState('');

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [ouletView, setOutletView] = useState(false);
  const [selectedFlateList, setSelectedFlateList] = useState(null);

  const [currentMyReservation, setCurrentMyReservation] = useState(null);

  const [markedDates, setMarkedDates] = useState({});

  const [value, onChangeText] = React.useState('+60');

  const [errorCheck, seterrorCheck] = useState(false);
  const [errorMsg, setErrormsg] = useState('');

 

  setTimeout(()=>{
    if(errorCheck===true){
    
      seterrorCheck(false)
    
    }
  
    },1000)

  const markDate = (dateString) => {
    setMarkedDates(
      (markedDates[dateString] = {
        customStyles: {
          container: {
            backgroundColor: 'black',
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      }),
    );
  };

  const renderMyReservationItem = ({item}) => (
    <TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '120', height: '100%'}}></View>
        <View style={{flex: 1, backgroundColor: 'red'}}></View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (loginData != null) {
      setIsLoadingList(true);
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', loginData.token);
      fetch(
        'http://sos.shiftlogics.com/api/reservation/viewReservation',
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
            setViewReservation(data.data);
            setIsLoadingList(false);
          } else {
            setIsLoadingList(false);
          }
        getOutlet();
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    } else {
      setIsLoadingList(false);
      setViewReservation([]);
    }
  //}, []);
   }, [isFocused]);

   const getOutlet = () =>{

 
     
    let abort = new AbortController();
    fetch(
      'http://sos.shiftlogics.com/api/outlet/viewOutlet',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())

      .then((data) => {


        if (data.status === 'success') {
          setOutlet(data.data);
           
        } else {
          
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
   }
  const removeReservationAPI = (itemValue) => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('id', itemValue);

    fetch(
      'http://sos.shiftlogics.com/api/reservation/cancelReservation',
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
          viewReservationAPI();
          setSelectedFlateList(false);
        } else {
          setSelectedFlateList(false);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const viewReservationAPI = () => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', loginData.token);
    fetch(
      'http://sos.shiftlogics.com/api/reservation/viewReservation',
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
          setIsLoadingList(false);
          setViewReservation(data.data);
      
        } else {
          setIsLoadingList(false);
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  const onChange = (event, selectedDate) => {
 
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
    setSelectedTime(Moment(selectedDate).format('hh:mm:ss'));
  };

  const myDateFuncation = (date) => {
  
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const increment = () => {
    setAdult((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (adult == 0) {
    } else {
      setAdult((prevCount) => prevCount - 1);
    }
  };

  const incrementChildren = () => {

    setChildren((prevCount) => prevCount + 1);
  };

  const decrementChildren = () => {
    if (children == 0) {
      
    } else {
      setChildren((prevCount) => prevCount - 1);
      
    }
  };

  const newReservation = () =>{
    getOutlet();
    setModalVisible(true);
  }

  const step0 = () => {
    setSelectedDate('Date');
    setSelectedTime('Time');
    setAdult(0);
    setChildren(0);
    setCase1(true);
    setCase2(false);
    setCase3(false);
    setCase4(false);
  };

  const step1 = () => {
    if (selectedDate == 'Date') {
      setSelectedDate(
        today.getFullYear() +
          '-' +
          parseInt(today.getMonth() + 1) +
          '-' +
          today.getDate(),
      );
    }
    setCase1(false);
    setCase2(true);
    setShow(true);
  };

  const step2 = () => {
    if (selectedTime == 'Time') {
      setSelectedTime(Moment(today.getDay()).format('hh:mm:ss'));
    } else {
    }
    setCase3(true);
    setCase2(false);
  };

  const step3 = () => {
    if (adult != 0) {
      setCase4(true);
      setCase3(false);
      setCase2(false);
    } else {
      AdultAlertWithTwoButton();
    }
  };

  const openModel1 = () => {
    setModalVisible(true);
    setModalVisible1(false);
  };

  const openModel2 = (id) => {
    setCurrentId(id);
 

    setModalVisible(false);
    setModalVisible1(true);
  };

  const closeModel1Model2 = () => {
    setModalVisible(false);
    setModalVisible1(false);
  };

  const ListHeader = () => {
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={StylesAll.boldFont2}>Select Outlet</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: '100%', tintColor: 'black'}}
              source={require('./Image/close.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const FlatListItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         marginLeft: 10,
  //         marginRight: 10,
  //         backgroundColor: 'lightgray',
  //       }}
  //     />
  //   );
  // };

  const EmptyListMessage = ({item}) => {
    if (loginData === null) {
      return (
        <TouchableOpacity onPress={() =>{
          navigation.navigate('Loginscreen')
        }}> 
        <View style={StylesAll.alertMsg}>
          <Image
            resizeMode="cover"
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
          />
          <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
            Oops, login is required!
          </Text>
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
            No new Reservation at this time!
          </Text>
        </View>
      );
    }
  };


  const EmptyListMessage1 = ({item}) => {
 
      return (
        <View style={StylesAll.alertMsg1}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
            resizeMode="cover"
          />
          <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
             No Data Available at this time!
          </Text>
        </View>
      ); 
  };
 
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#fafbfb',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
     
          <TouchableOpacity onPress={()=>navigation.goBack()}>


<View style={[StylesAll.commonHeader1 ]}>
<Image source={require('./Image/back.png')} style={StylesAll.headArrow} resizeMode="contain"/>
<Text style={[StylesAll.headTitle]}>MY RESERVATION</Text>
</View>

        </TouchableOpacity>
        <View style={{flex: 1, paddingTop: 20}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={viewReservation}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={EmptyListMessage}
            style={{flex: 1}}
            renderItem={({item}) => (
              <View style={{padding: 10, flex: 1, position: 'relative'}}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFlateList(item.id);
                  
                    setOutletView(true);
                    setCurrentMyReservation(item);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}>
                    <View style={{flex: 1}}>
                      <Image
                        source={{
                          uri: `http://sos.shiftlogics.com/${item.out_image}`,
                        }}
                        resizeMode="cover"
                        style={{
                          height: '100%',
                          width: '100%',
                          borderBottomLeftRadius: 20,
                          borderTopLeftRadius: 20,
                          backgroundColor: 'gray',
                          
                        }}
                      />
                    </View>

                    <View
                      style={{flexDirection: 'column', margin: 12, flex: 1.5}}>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'SFCompactDisplay-Medium',
                            fontSize: 14,
                          }}>
                          {item.outlet_name}
                        </Text>
                       
                      </View>
              
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flex: 1.5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}>
                          <Image
                            source={require('./Image/calNew.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: COLORS.app_browntheme,
                            }}
                            resizeMode="cover"
                          />
                          <Text
                            style={[{marginLeft: 3}, StylesAll.boldFontNew]}
                            numberOfLines={1}>
                            {item.date}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: 3,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent:  'flex-start',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('./Image/timeNew.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: COLORS.app_browntheme,
                            }}
                            resizeMode="cover"
                          />
                          <Text
                            style={[
                              {color: 'black', marginLeft: 2},
                              StylesAll.boldFontNew,
                            ]}
                            numberOfLines={1}>
                            {item.time}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: 3,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('./Image/userNew.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: COLORS.app_browntheme,
                            }}
                            resizeMode="cover"
                          />
                          <Text
                            style={[
                              {color: 'black', marginLeft: 2},
                              StylesAll.boldFontNew,
                            ]}>
                            {item.pax1}-{item.pax2}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: 'lightgray',
                          }}
                        />
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1.5, flexDirection: 'column'}}>
                          <Text
                            style={[{color: 'gray'}, StylesAll.boldFontNew1]}>
                            Submitted
                          </Text>
                          <Text
                            style={[
                              {color: 'black'},
                              StylesAll.boldFontLight1,
                            ]}>
                            {Moment(item.created_at).format(
                              'yyy-MM-DD, hh:mm a',
                            )}
                          </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                          <Text
                            style={[{color: 'gray'}, StylesAll.boldFontNew1]}>
                            Status
                          </Text>

                          {item.status == '1' ? (
                            <Text
                              style={[
                                {color: COLORS.appBrown},
                                StylesAll.boldFontNew11,
                              ]}>
                              Pending
                            </Text>
                          ) : item.status == '2' ? (
                            <Text
                              style={[
                                {color: COLORS.app_browntheme},
                                StylesAll.boldFontNew11,
                              ]}>
                              Accepted
                            </Text>
                          ) : item.status == '3' ? (
                            <Text
                              style={[
                                {color: COLORS.appBrown},
                                StylesAll.boldFontNew11,
                              ]}>
                              Cancelled
                            </Text>
                          ) : (
                            <Text
                              style={[
                                {color: COLORS.appBrown},
                                StylesAll.boldFontNew11,
                              ]}>
                              Completed
                            </Text>
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          marginTop: 5,
                        }}>
                        <Text style={[{color: 'gray'}, StylesAll.boldFontNew1]}>
                          Remarks
                        </Text>
                        <Text
                          style={[{color: 'black'}, StylesAll.boldFontLight1]}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {selectedFlateList === item.id ? (
                  <View
                    style={{
                      position: 'absolute',
                      flex: 1,
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 20,
                      margin: 10,
                      backgroundColor: '#00000070',
                      color: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 30,
                        height: 30,
                      }}
                      onPress={() => {
                        setSelectedFlateList(false);
                      }}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 5,
                          width: 35,
                          height: 35,
                        }}
                        onPress={() => {
                          setSelectedFlateList(false);
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{width: '100%', height: '100%'}}
                          source={require('./Image/close.png')}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column', margin: 10}}>
                      <TouchableOpacity
                        onPress={() => {
                        
                          createAlertWithTwoButton(item.id);
                        }}>
                        <View
                          style={{
                            backgroundColor: COLORS.app_redtheme,
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            marginBottom: 10,
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{width: 15, height: 15}}
                            source={require('./Image/iicon.png')}
                          />
                          <Text
                            style={{
                              color: 'white',
                              marginLeft: 5,
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: 12,
                            }}>
                            Cancel Reservation
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                      

                          navigation.navigate('ReservationOutlet', {
                            dataValue: currentMyReservation,
                          });
                        }}>
                        <View
                          style={{
                            backgroundColor: COLORS.appBrown,
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{width: 15, height: 15, tintColor: 'white'}}
                            source={require('./Image/opps.png')}
                          />
                          <Text
                            style={{
                              color: 'white',
                              marginLeft: 5,
                              fontFamily: 'SFCompactDisplay-Medium',
                              fontSize: 12,
                            }}>
                            View More
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            )}
          />

          <Modal
            animationType="none"
            transparent={true}
            visible={modelVisible1}
            onRequestClose={() => {
              Alert.alert('Model has been closed');
            }}>
            <View
              style={{
                flex: 1,
              
                backgroundColor: '#00000061',
             
              }}>
{errorCheck ? (
          <View style={StylesAll.errorSnackbar}>
            <Image
              resizeMode="cover"
              style={{width: 30, height: 30, tintColor: '#fff'}}
              source={require('./Image/opps.png')}
            />

            <View style={{flexDirection: 'column', paddingLeft: 13}}>
              <Text style={StylesAll.whitecolor}>SOS</Text>
              <Text style={[StylesAll.mediamFont, StylesAll.whitecolor]}>
                {errorMsg}
              </Text>
            </View>
          </View>
        ) : null}

              <View
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 25,
                  marginTop: 50,
                  
                  justifyContent:'flex-end'
                }}>
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 10,

                      flexDirection: 'column',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          openModel1();
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <View
                          style={{
                            paddingTop: 5,
                            paddingRight: 5,
                            width: 40,
                            height: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: '100%',
                              height: '100%',
                              tintColor: 'black',
                            }}
                            source={require('./Image/close.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: 'white'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{height: 100, width: 100}}>
                          <Image
                            source={{
                              uri: `http://sos.shiftlogics.com/${currentSelectedOutLet.out_image}`,
                            }}
                            resizeMode="cover"
                            style={{height: '100%', width: '100%'}}></Image>
                        </View>

                        <View
                          style={{
                            flex: 2,
                            flexDirection: 'column',
                            marginLeft: 15,
                            marginRight: 10,
                            marginBottom: 20,
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            alignContent: 'center',
                          }}>
                          <Text style={{fontFamily: 'SFCompactDisplay-Medium',fontSize : 16}}>
                            {currentSelectedOutLet.outlet_name}
                          </Text>
                          <Text
                            style={[
                              {color: 'gray', paddingTop: 10},
                              StylesAll.boldFontLight,
                            ]}>
                            {currentSelectedOutLet.address}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{backgroundColor: COLORS.app_browntheme}}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          margin: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            step0();
                          }}
                          style={{flex: 1}}>
                          <View
                            style={{
                              backgroundColor: COLORS.app_browntheme,
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('./Image/callWNew.png')}
                              style={{height: 15, width: 15}}
                              resizeMode="cover"
                            />

                            <Text
                              style={[
                                {color: 'white', marginLeft: 5},
                                StylesAll.boldFontLight,
                              ]}>
                              {selectedDate}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            step1();
                          }}
                          style={{flex: 1}}>
                          <View
                            style={{
                              backgroundColor: COLORS.app_browntheme,
                              marginLeft: 0.5,
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('./Image/timeWNew.png')}
                              style={{height: 15, width: 15}}
                              resizeMode="cover"
                            />
                            <Text
                              style={[
                                {color: 'white', marginLeft: 5},
                                StylesAll.boldFontLight,
                              ]}>
                              {selectedTime}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            step2();
                          }}
                          style={{flex: 1}}>
                          <View
                            style={{
                              backgroundColor: COLORS.app_browntheme,
                              marginLeft: 0.5,
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('./Image/userWNew.png')}
                              style={{height: 15, width: 15}}
                              resizeMode="cover"
                            />
                            <Text
                              style={[
                                {color: 'white', marginLeft: 5},
                                StylesAll.boldFontLight,
                              ]}>
                              {adult === 0 && children === 0
                                ? paxName
                                : adult + '+' + children}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                      {case1 ? (
                        <View style={{padding: 10}}>
                          <View style={{flexDirection: 'column', flex: 1}}>
                            <Text
                              style={[
                                {padding: 10, color: '#2C2C2C',fontFamily: 'SFCompactDisplay-Medium',
                                fontSize : 16,},
                            
                              ]}>
                              Select Visit Date
                            </Text>

                            <View style={{height: 350}}>
                              
                              <Calendar
                                // Initially visible month. Default = Date()
                                //current={'2021-01-01'}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={new Date()}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={'2030-05-30'}
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => {
                              
                                  setSelectedDate(day.dateString);
                                  // markDate(day.dateString);
                                }}
                                monthFormat={'yyyy MM'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => {
                                 
                                }}
                                // Hide month navigation arrows. Default = false
                                hideArrows={false}
                                // Do not show days of other months in month page. Default = false
                                hideExtraDays={true}
                                // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                disableMonthChange={true}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                firstDay={1}
                                // markedDates={{
                                //   [Date()]: { selected: true, selectedColor: 'red' },
                                //   }}
                                //   style={{

                                //     height : 200
                                // }}

                                markedDates={{
                                  [selectedDate]: { selected: true ,marked: true},
                                 }}

                                 
                                  markingType={'period'}
                                theme={{
                                  arrowColor: COLORS.app_browntheme,
                                   selected: 'black',
                                   todayTextColor: 'red',
                                   calendarBackground: '#fff',
                                   selectedDayBackgroundColor: 'white',
                                   selectedDayTextColor: 'red',
                                   dotColor: COLORS.app_browntheme,
                                }}
                              />
                            </View>
                          </View>
                          <View style={{justifyContent: 'flex-start', flex: 1}}>
                            <TouchableOpacity onPress={() => step1()}>
                              <View
                                style={{
                                  padding: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: COLORS.app_browntheme,
                                  borderRadius: 50,
                                  marginVertical: 10,
                                }}>
                                <Text
                                  style={[
                                    StylesAll.boldFont,
                                    {color: 'white'},
                                  ]}>
                                  NEXT
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View>
                          {case2 ? (
                            <View style={{padding: 10}}>
                              <View
                                style={{backgroundColor: 'white', height: 350}}>
                                <Text
                                  style={[{padding: 10, color: '#2C2C2C',fontFamily: 'SFCompactDisplay-Medium',
                                  fontSize : 16,}]}>
                                  Select Visit Time
                                </Text>
                                {show && (
                                  <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                  />
                                )}
                              </View>

                              <TouchableOpacity onPress={() => step2()}>
                                <View
                                  style={{
                                    backgroundColor: COLORS.white,
                                    padding: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.app_browntheme,
                                    borderRadius: 50,
                                    marginVertical: 10,
                                  }}>
                                  <Text
                                    style={[
                                      StylesAll.boldFont,
                                      {color: 'white'},
                                    ]}>
                                    NEXT
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View>
                              {case3 ? (
                                <View style={{padding: 10, flex: 1}}>
                                  <View style={{height: 350}}>
                                    <View style={{flexDirection: 'column'}}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          backgroundColor: 'White',
                                          marginLeft: 10,
                                          marginRight: 10,
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          marginTop: 10,
                                          marginBottom: 10,
                                        }}>
                                        <Text
                                          style={[
                                            {padding: 20, color: '#2C2C2C',fontFamily: 'SFCompactDisplay-Medium',
                                            fontSize : 15,},
              
                                          ]}>
                                          Pax (Adult)
                                        </Text>
                                        <View
                                          style={{
                                            backgroundColor: 'white',
                                            
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <TouchableOpacity onPress={decrement}>
                                            <View
                                              style={
                                                adult == 0
                                                  ? {
                                                      backgroundColor:
                                                        COLORS.disable_btn,
                                                      borderRadius: 30 / 2,
                                                      width: 30,
                                                      height: 30,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }
                                                  : {
                                                      backgroundColor:
                                                        COLORS.app_browntheme,
                                                      borderRadius: 30 / 2,
                                                      width: 30,
                                                      height: 30,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }
                                              }>
                                              <Text style={{color: 'white'}}>
                                                -
                                              </Text>
                                            </View>
                                          </TouchableOpacity>

                                          <Text
                                            style={[
                                              {
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                              },
                                              StylesAll.boldFont11,
                                            ]}>
                                            {adult}
                                          </Text>

                                          <TouchableOpacity onPress={increment}>
                                            <View
                                              style={{
                                                backgroundColor:
                                                  COLORS.app_browntheme,
                                                borderRadius: 30 / 2,
                                                width: 30,
                                                height: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                              }}>
                                              <Text style={{color: 'white'}}>
                                                +
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      </View>

                                      <View
                                        style={{
                                          height: 1,
                                          backgroundColor: COLORS.grey_line,
                                        }}
                                      />

                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          backgroundColor: 'White',
                                          marginLeft: 10,
                                          marginRight: 10,
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          marginTop: 0,
                                          marginBottom: 10,
                                        }}>
                                        <Text
                                          style={[
                                            {padding: 20, color: '#2C2C2C',fontFamily: 'SFCompactDisplay-Medium',
                                            fontSize : 15,},
                                            
                                          ]}>
                                          Pax (Children)
                                        </Text>
                                        <View
                                          style={{
                                            backgroundColor: 'white',
                                             
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <TouchableOpacity
                                            onPress={decrementChildren}>
                                            <View
                                              style={
                                                children === 0
                                                  ? {
                                                      backgroundColor:
                                                        COLORS.disable_btn,
                                                      borderRadius: 30 / 2,
                                                      width: 30,
                                                      height: 30,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }
                                                  : {
                                                      backgroundColor:
                                                        COLORS.app_browntheme,
                                                      borderRadius: 30 / 2,
                                                      width: 30,
                                                      height: 30,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }
                                              }>
                                              <Text style={{color: 'white'}}>
                                                -
                                              </Text>
                                            </View>
                                          </TouchableOpacity>

                                          <Text
                                            style={[
                                              {
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                              },
                                              StylesAll.boldFont11,
                                            ]}>
                                            {children}
                                          </Text>

                                          <TouchableOpacity
                                            onPress={incrementChildren}>
                                            <View
                                              style={{
                                                backgroundColor:
                                                  COLORS.app_browntheme,
                                                borderRadius: 30 / 2,
                                                width: 30,
                                                height: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                              }}>
                                              <Text style={{color: 'white'}}>
                                                +
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          height: 1,
                                          backgroundColor: COLORS.grey_line,
                                        }}
                                      />
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      justifyContent: 'flex-end',
                                      flex: 1,
                                    }}>
                                    <TouchableOpacity onPress={() => step3()}>
                                      <View
                                        style={{
                                          backgroundColor:
                                            COLORS.app_browntheme,
                                          padding: 10,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          borderRadius: 50,
                                          paddingVertical: 10,
                                        }}>
                                        <Text
                                          style={[
                                            StylesAll.boldFont,
                                            {color: 'white'},
                                          ]}>
                                          NEXT
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ) : (
                                <View>
                                  <Formik
                                    initialValues={{
                                      reserName: '',
                                      reserPhone: '',
                                      reserDescription: '',
                                      agreeToReservation: false,
                                    }}
                                    validationSchema={ReservationSchema}
                                    onSubmit={async (Value) => {
                                      setIsLoading(true);

                                     

                                      if (toggleCheckBox1 == true) {
                                        let abort = new AbortController();
                                        var form = new FormData();
                                        form.append(
                                          'api_token',
                                          loginData.token,
                                        );
                                        form.append('outID', currentId);
                                        form.append('date', selectedDate);
                                        form.append('time', selectedTime);
                                        form.append('pax1', adult);
                                        form.append('pax2', children);
                                        form.append('name', Value.reserName);
                                        form.append('phone', Value.reserPhone);
                                        form.append(
                                          'description',
                                          Value.reserDescription,
                                        );
                                        form.append(
                                          'out_area',
                                          toggleCheckBox == true ? 'yes' : 'no',
                                        );

                                     

                                        fetch(
                                          'http://sos.shiftlogics.com/api/reservation/addReservation',
                                          {
                                            method: 'POST',
                                            headers: new Headers({
                                              Accept: 'application/json',
                                              'Content-Type':
                                                'multipart/form-data',
                                            }),
                                            body: form,
                                          },
                                          {signal: abort.signal},
                                        )
                                          .then((response) => response.json())

                                          .then((data) => {
                                            if (data.status === 'success') {
                                              setIsLoading(false);
                                              
                                              closeModel1Model2();

                                              viewReservationAPI();
                                           
                                            } else {
                                              setIsLoading(false);

                                              seterrorCheck(true);

                                              
                                               setErrormsg(data.data);

                                              
                                          
                                            }
                                          })
                                          .catch((e) => console.log(e));

                                        return () => {
                                          abort.abort();
                                        };
                                      } else {
                                        setIsLoading(false);
                                        ReservationAgree();
                                      }

                                     
                                    }}>
                                    {(props) => (
                                      <View style={{flexDirection: 'column'}}>
                                        <ScrollView>
                                          <View
                                            style={{
                                              backgroundColor: 'white',
                                              paddingHorizontal: 15,
                                              paddingVertical: 10,
                                              flexDirection: 'column',
                                              height: 350,
                                            }}>
                                            <TextInput
                                              style={{
                                                backgroundColor:
                                                  COLORS.textbox_bg1,
                                                borderWidth: 1,
                                                borderColor: COLORS.grey_line,
                                                paddingHorizontal: 10,
                                                borderRadius: 50,
                                                marginTop: 10,
                                                height: 45,
                                              }}
                                              onChangeText={props.handleChange(
                                                'reserName',
                                              )}
                                              value={props.values.reserName}
                                              placeholder={'Your Name*'}
                                            />
                                            <Text
                                              style={{color: COLORS.redTheme}}>
                                              {props.touched.reserName &&
                                                props.errors.reserName}
                                            </Text>

                                            {/* <TextInput
                                          style={{
                                            backgroundColor: COLORS.textbox_bg,
                                            borderWidth: 1,
                                            borderColor: COLORS.grey_line,
                                            paddingHorizontal:15,
                                            borderRadius: 30,
                                            marginBottom: 5,
                                            height:45,
                                          }}
                                          onChangeText={props.handleChange(
                                            'reserPhone',
                                          )}
                                          value={props.values.reserPhone}
                                          placeholder={
                                            'Phone Number'
                                          }></TextInput>
                                        <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserPhone &&
                                            props.errors.reserPhone}
                                        </Text> */}

                                            <View
                                              style={{
                                                backgroundColor:
                                                  COLORS.textbox_bg1,
                                                height: 45,
                                                borderColor: COLORS.grey_line,
                                                borderWidth: 1,
                                                borderRadius: 50,
                                                flexDirection: 'row',
                                                paddingHorizontal: 10,
                                              }}>
                                              <TextInput
                                                defaultValue={'+60'}
                                                style={{flex: 0.15}}
                                                onChangeText={(text) =>
                                                  onChangeText(text)
                                                }
                                                value={value}
                                                keyboardType="number-pad"
                                              />
                                              <View
                                                style={{
                                                  width: 1,
                                                  height: 15,
                                                  borderWidth: 1,
                                                  position: 'relative',
                                                  top: 13,
                                                  borderColor: 'black',
                                                }}></View>

                                              <TextInput
                                                style={StylesAll.inputwrap2}
                                                onChangeText={props.handleChange(
                                                  'reserPhone',
                                                )}
                                                value={props.values.reserPhone}
                                                placeholder={'Mobile Number*'}
                                                keyboardType="number-pad"
                                                returnKeyType="done"
                                              /> 
                                            </View>
                                            {/* <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserPhone &&
                                            props.errors.reserPhone}
                                        </Text> */}

                                          <Text></Text>

                                            <TextInput
                                              style={{
                                                backgroundColor:
                                                  COLORS.textbox_bg1,
                                                borderWidth: 1,
                                                borderColor: COLORS.grey_line,
                                                paddingHorizontal: 10,
                                                borderRadius: 30,
                                                height: 45,
                                              }}
                                              onChangeText={props.handleChange(
                                                'reserDescription',
                                              )}
                                              value={
                                                props.values.reserDescription
                                              }
                                              placeholder={
                                                'Notes*'
                                              }></TextInput>
                                            {/* <Text style={{color: COLORS.redTheme}}>
                                          {props.touched.reserDescription &&
                                            props.errors.reserDescription}
                                        </Text> */}

                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                alignContent: 'flex-start',
                                                borderRadius: 5,
                                                padding: 10,
                                              }}>
                                              <CheckBox
                                                tintColor={COLORS.grey_line}
                                                onTintColor={
                                                  COLORS.app_browntheme
                                                }
                                                onCheckColor={
                                                  COLORS.app_browntheme
                                                }
                                                boxType="square"
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onValueChange={(newValue) =>
                                                  setToggleCheckBox(newValue)
                                                }
                                              />
                                              <Text style={{paddingLeft: 10}}>
                                                Outdoor Area
                                              </Text>
                                            </View>

                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                alignContent: 'flex-start',
                                                borderRadius: 5,
                                                paddingHorizontal: 10,
                                                marginBottom: 10,
                                              }}>
                                              <CheckBox
                                                tintColor={COLORS.grey_line}
                                                onTintColor={
                                                  COLORS.app_browntheme
                                                }
                                                onCheckColor={
                                                  COLORS.app_browntheme
                                                }
                                                boxType="square"
                                                disabled={false}
                                                value={toggleCheckBox1}
                                                onValueChange={(newValue) =>
                                                  setToggleCheckBox1(newValue)
                                                }
                                              />

                                              <Text style={{paddingLeft: 10}}>

                                                I agree to the  </Text>
                                                
                                              <TouchableOpacity onPress={()=>setReserveTermsmodel(true)}>
                                                
                                              <Text style={{color:"#9A7527"}}>reservation terms</Text> 
                                                </TouchableOpacity>  
                                                
                                             


                                            </View>
                                          </View>
                                        </ScrollView>
                                        <TouchableOpacity
                                          disabled= {(props.values.reserDescription != '' &&  props.values.reserName != '' &&  props.values.reserPhone != '') ? false : true}
                                          onPress={props.handleSubmit}>
                                          <View
                                            style={[
                                              {
                                                backgroundColor: 'red',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor:
                                                  COLORS.app_browntheme,
                                                flexDirection: 'row',
                                                borderRadius: 50,
                                                margin: 10,
                                                paddingVertical: 10,
                                                marginTop: 20,
                                              },
                                              (props.values.reserDescription != '' &&  props.values.reserName != '' &&  props.values.reserPhone != '')
                                                ? StylesAll.commonButton
                                                : StylesAll.commonButtondisabled,
                                            ]}>
                                            <Text
                                              style={[
                                                {
                                                  color: 'white',
                                                  textAlign: 'center',
                                                },
                                                StylesAll.boldFont,
                                              ]}>
                                              SUBMIT
                                            </Text>
                                            {isLoading ? (
                                              <ActivityIndicator
                                                size="small"
                                                color="white"
                                              />
                                            ) : (
                                              <Text></Text>
                                            )}
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    )}
                                  </Formik>
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="none"
            transparent={true}
            visible={modelVisible}
           >
            <View
              style={{
                flex: 1,
                paddingHorizontal: 25,
                backgroundColor: '#00000061',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingVertical: 40,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent:'flex-end',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 50,
                }}>
                <FlatList
                  backgroundColor="white"
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={ListHeader}
                  ItemSeparatorComponent={FlatListItemSeparator}
                  data={outlet}
                  ListEmptyComponent={EmptyListMessage1}
                  //keyExtractor={(item) => item.id}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentSelectedOutlet(item);
                        openModel2(item.id);
                        step0();
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          padding: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 1.3}}>
                          <Image
                            source={{
                              uri: `http://sos.shiftlogics.com/${item.out_image}`,
                            }}
                            resizeMode="cover"
                            style={{height: 110, width: '100%'}}></Image>
                        </View>

                        <View
                          style={{
                            flex: 2,
                            flexDirection: 'column',
                            marginLeft: 15,
                            marginRight: 10,
                            marginBottom: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            alignContent: 'center',
                          }}>
                          <Text style={{fontFamily:'SFCompactDisplay-Medium',fontSize:16}}>
                            {item.outlet_name}
                          </Text>

                          <Text
                            style={[
                              {color: 'gray', paddingTop: 5},
                              StylesAll.boldFontLight,
                            ]}>
                            {item.address}
                          </Text>

                          <Text
                            style={[
                              {color: 'gray', paddingTop: 5},
                              StylesAll.boldFontLight,
                            ]}>
                            {item.work_hour}
                          </Text>

                          <Text
                            style={[
                              {color: 'gray', paddingTop: 5},
                              StylesAll.boldFontLight,
                            ]}>
                            {item.phone}
                          </Text>


                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>

        {loginData === null ? (
          <View></View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: '100%', margin: 10}}
              onPress={() => {
                getOutlet();
                setModalVisible(true);
              }}>
              <View
                style={[
                  {
                    width: '100%',
                    backgroundColor: COLORS.app_browntheme,
                    justifyContent: 'center',
                    padding: 15,
                    borderRadius: 50,
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[{color: 'white', fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 16}]}>
                  NEW RESERVATION{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        


<Modal  animationType="none"
        transparent={true}
        visible={reserveTermsmodel}
       >

<View  style={StylesAll.modelBG}>

<View  style={{backgroundColor:"#fff" ,flex:1  ,padding:25 ,borderRadius:6 ,position:"relative"}}>






<Text></Text>
<Text></Text>

<Text style={StylesAll.headTitle}>Terms & Conditions:
</Text>

<Text></Text>


<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>1.</Text></View>
<Text>Not allowed to bring outside food and drink and all food and drink MUST order from restaurant including CAKE</Text>
</View>



<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>2.</Text></View>

<Text>Deposit RM100 per reservation
</Text>
</View>

<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>3.</Text></View>

<Text>All payment must be settle before the deposit is returned</Text>

</View>

<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>4.</Text></View>

<Text>Deposit will be return within 24 hours
</Text>


</View>


<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>5.</Text></View>



<Text>PIC must make sure that place is clean and desk chairs are rearranged as before </Text>
  
</View>


<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>6.</Text></View>

<Text>Reservation can do from Monday to Sunday but approval depend on outlets</Text>

  
  

</View>
 
<View style={StylesAll.roundedPtsec}>
<View style={StylesAll.boldround}><Text>7.</Text></View>

<Text>Time for reservation is 12 p.m to 8 p.m only</Text>


</View>





<View style={{flexDirection:"row" ,justifyContent:"flex-end" ,position:"absolute" ,top:0  ,right:0}}>

  <TouchableOpacity onPress={()=>setReserveTermsmodel(false)}>




<Image
                             resizeMode="contain"
                            style={{
                              width: 40,
                              height: 40,
                              tintColor: 'black',
                            }}
                            source={require('./Image/close.png')}
                          />


</TouchableOpacity>
</View>

</View>








</View>








</Modal>









        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  list: {
    width: 30,
    height: 30,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  m: {tintColor: 'red'},
});
