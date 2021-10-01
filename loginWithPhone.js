import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  Constants,
  View,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal
} from 'react-native';
import Moment from 'moment';
import {StylesAll} from './commanStyle/objectStyle';
import {Formik} from 'formik';
import * as yup from 'yup';
import ActivityIndi from './ActivityIndi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import {COLORS} from './Styles/colors';


const phoneSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Kindly Enter Phone Number')
});

const loginWithPhone = ({navigation,route}) => {
  
  const dispatch = useDispatch();
  const [value, onChangeText] = React.useState('+60');
  let code = value.slice(1);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(false);


  const [errorCheck, seterrorCheck] = useState(false);

  const [errorMsg, setErrormsg] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const [referralBtnText, setReferralBtnText ] = useState('I have a referral code');
  

  setTimeout(()=>{
    if(errorCheck===true){
      seterrorCheck(false)
    }
    },2000)

    const createAlertWithTwoButton1 = (itemValue) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',

          style: 'cancel',
        },
        {text: 'ok', onPress: () => {}},
      ],
      {cancelable: false},
    );


  const applyRefercode = () => {
    setIsLoadingList(true);
    if (referralCode === '') {
      seterrorCheck(true);
      setErrormsg('Kindly enter your referral code')
     // createAlertWithTwoButton1('Kindly enter your referral code');
    } else {
      let abort = new AbortController();
      var form = new FormData();
      form.append('api_token', route?.params.loginData.token);
      form.append('referral_code',referralCode);
console.log('formformform',form)

      fetch(
        'http://sos.shiftlogics.com/api/user/referral',
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

          if (data.status === 'success') {

            setReferralBtnText(referralCode);
            
            console.log('datadatadatadata success',data);

            setCurrentOTP('');
            //createAlertWithTwoButton1(data.data);
            createAlertWithTwoButton1(data.status);
          } else {
                     seterrorCheck(true);
                     setErrormsg(data.data)

            console.log('datadatadatadata fall',data);
            //createAlertWithTwoButton1(data.data);
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };
    }
  };

  const createAlertWithTwoButton = (itemValue, phoneNumber, login) =>
    Alert.alert(
      itemValue,
      '',
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            if (itemValue == 'Otp send successfully!') {
              navigation.navigate('ResentOtp', {
                phoneNumberData: phoneNumber,
                loginData: login,
                loginfrom: 'Social',
              });
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
    
    useEffect(() => {
      console.log('route?.params.loginData.tokenroute?.params.loginData.token',route?.params.loginData.token);

      
    }, [])

  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafbfb'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      {errorCheck ? (
          <View style={StylesAll.errorSnackbar}>
            <Image
              resizeMode="cover"
              style={{width: 30, height: 30, tintColor: '#fff'}}
              source={require('./Image/opps.png')}
            />

            <View style={{flexDirection: 'column', paddingLeft: 13}}>
              <Text style={StylesAll.whitecolor}>Tokyo Secret</Text>
              <Text style={[StylesAll.mediamFont, StylesAll.whitecolor]}>
                {errorMsg}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{marginBottom: 10, marginHorizontal: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader1]}>
              <Image
                source={require('./Image/back.png')}
                style={StylesAll.headArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{
            phoneNumber: '',
          }}
          validationSchema={phoneSchema}
          onSubmit={async (values) => {
            setIsLoadingList(true);

        
            let abort = new AbortController();
            var form = new FormData();
               form.append('phone', value.replace('+','') + values.phoneNumber);
              form.append('api_token', route?.params.loginData.token),
             
              console.log('foofofooffofofo',form)

              
            fetch(
              'http://sos.shiftlogics.com/api/user/sendotp',
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

                if (data.status === 'success') {
                  Alert.alert(
                    data.data,
                    '',
                    [
                      {
                        text: 'ok',
                        onPress: () => {
                         
                            navigation.navigate('ResentOtp', {
                              phoneNumberData:  value.replace('+','') + values.phoneNumber,
                              loginData: route?.params.loginData,
                              loginfrom: 'Social',
                            });
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }else{
                  seterrorCheck(true);
                  setErrormsg(data.data)
               }
               
              })
              .catch((e) => {
                console.log(e);
                
              });
            return () => {
              abort.abort();
            };
          }}>
          {(props) => (
            <View style={{flex: 1, padding: 30}}>
              <Text style={StylesAll.main_Title}>
                Enter your number
              </Text>
 
              <Text style={StylesAll.commom_color}>
                your're just one step away from chef-made food.{' '}
              </Text>

              <Text></Text>
              <Text></Text>
              
              <View style={{flex: 1, padding: 5}}>
                <View style={StylesAll.inputFieldBox}>
                  <TextInput
                  style={{fontFamily:'SFCompactDisplay-Medium'}}
                    defaultValue={'+60'}
                    style={{flex: 0.15}}
                    onChangeText={(text) => onChangeText(text)}
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
                      borderColor: '#000',
                    }}></View>

                  <TextInput
                    style={StylesAll.inputwrap2}
                    //onChangeText={(text) => onChangeText1(text)}
                    onChangeText={props.handleChange('phoneNumber')}
                    value={props.values.phoneNumber}
                    placeholder="Mobile Number*"
                    keyboardType="number-pad"
                    returnKeyType="done"
                  />
                </View>

                <Text style={{color: 'red'}}>
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
              </View>

              <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{padding: 20, textAlign: 'center',fontFamily:'SFCompactDisplay-Medium',color: '#9C9C9C'}}>
             {referralBtnText}
            </Text>
          </TouchableOpacity>
                <View>
                  <TouchableOpacity onPress={props.handleSubmit} disabled={props.values.phoneNumber.length >= 9  ? false : true}>
                    <View
                      style={[{
                        justifyContent: 'center',
                        height: 50,
                        backgroundColor: COLORS.app_browntheme,
                        alignItems: 'center',
                        marginBottom: 20,
                        borderRadius: 50,
                      }, props.values.phoneNumber.length >= 9 ? StylesAll.commonButton
                      : StylesAll.commonButtondisabled,]}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily:'SFCompactDisplay-Bold',
                          fontWeight: 'bold',
                          color: '#fff',
                        }}>
                        {' '}
                        NEXT
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>


        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <View style={[StylesAll.common_Modal, {justifyContent: 'center'}]}>
            <View style={StylesAll.modalBox}>
              <Text style={[StylesAll.main_Title]}>Referral Code</Text>

              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: COLORS.grey_line,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginTop: 10,
                  height: 45,
                }}
                onChangeText={(text) => setReferralCode(text)}
                placeholder={'Enter referral code'}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{flex: 1}}>
                  <View style={[StylesAll.cancelBtn, StylesAll.mediumBtn1,]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      CLOSE
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => applyRefercode()}
                  style={{flex: 1}}>
                  <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                    <Text
                      style={[
                        StylesAll.whitecolor,
                        StylesAll.boldFont,
                        {textAlign: 'center', padding: 10},
                      ]}>
                      SUBMIT
                    </Text>
                  </View>
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

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
  },

  phoneCode: {
    width: 50,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'black',
  },

  mainViewCreateAccount: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },

  bottomView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
  },

  phoneCodeText: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingLeft: 10,
  },
});
export default loginWithPhone;
