import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  Constants,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {onChange, Value} from 'react-native-reanimated';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {date} from 'yup/lib/locale';
import Moment from 'moment';
import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from './Styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateAccountData = yup.object({
  name: yup.string().required('Kindly enter your name'),
  email: yup.string().required('Kindly enter your email id'),
  phoneNumber: yup.string().required('Kindly enter your phoneNumber'),
});

const CreateAccount = ({navigation, route}) => {
  
  const [dt, setDt] = useState(new Date().toLocaleString());

  const [isLoadingList, setIsLoadingList] = useState(false);

  const [value, onChangeText] = React.useState('+60');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate, setSelectedDate] = useState('Date of Birth*');

  const [errorCheck, seterrorCheck] = useState(false);

  const [errorMsg, setErrormsg] = useState('');

 let ui= setTimeout(() => {
    if (errorCheck === true) {
      seterrorCheck(false);
    }
  }, 2000);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);
    return () =>{
      clearInterval(ui);
      clearInterval(secTimer);

    } 
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate('1234');
    hideDatePicker();
  };

  const createAlertWithTwoButton = (itemValue, phoneNumber, dataValue) =>
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
          onPress: () =>
            itemValue == 'success'
              ? navigation.navigate('ResentOtp', {
                  phoneNumberData: phoneNumber,
                  loginData: dataValue,
                  loginfrom: 'Create',
                })
              : {},
        },
      ],
      {cancelable: false},
    );

  const [value1, onChangeText1] = React.useState('');

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
              <Text style={StylesAll.whitecolor}>SOS</Text>
              <Text style={[StylesAll.mediamFont, StylesAll.whitecolor]}>
                {errorMsg}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{marginBottom: 30, marginHorizontal: 20}}>
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
            name: '',
            email: '',
            phoneNumber: route.params?.phone,
          }}
          validationSchema={CreateAccountData}
          onSubmit={async (values) => {
            setIsLoadingList(true);

            let abort = new AbortController();
            var form = new FormData();
            form.append('name', values.name);
            form.append('email', values.email);
            form.append('phone', value.replace('+','') + values.phoneNumber);
            form.append('password', '00000000');
            form.append('app_secret', 'tokenhere');
            form.append(
              'dob',
              selectedDate != 'Date of Birth*' ? selectedDate : '',
            );

            console.log('formmmmmm', form);

            fetch(
              'http://sos.shiftlogics.com/api/user/register',
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
                  console.log('datadata', data);

                  createAlertWithTwoButton(
                    data.status,
                     value.replace('+','') + values.phoneNumber,
                    data.data,
                  );
                } else {
                  console.log('datadata', data);

                  if (data.data.email?.length > 0) {
                    let myData = data.data.email;

                    seterrorCheck(true);
                    setErrormsg(myData[0]);
                  } else {
                    console.log('kavi');
                  }
//phone
                  if (data.data.phone?.length > 0) {
                    let myData = data.data.phone;
                    console.log('ph' ,myData)

                    seterrorCheck(true);
                    setErrormsg(myData[0]);

                  } else {
                    console.log('kavi');
                  }
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
            <View style={[StylesAll.flexWtrapper, {flexDirection: 'column'}]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 30}}>
            <View style={{justifyContent:"center" ,alignItems:"center" ,marginBottom:10}}>
<Image
              source={require('./Image/sosLogo.png')}
              style={{width: 160, height: 100}}
              resizeMode="contain"
            />

</View>
                <View style={{flex: 1}}>
                  <Text style={StylesAll.main_Title}>Create Account</Text>
                  <Text style={StylesAll.commom_color}>You are just one step away from chef-made food</Text>
                  <Text></Text>
                  <Text></Text>

                  <TextInput
                    style={StylesAll.inputBox1}
                    placeholder="Your Name*"
                    onChangeText={props.handleChange('name')}
                    value={props.values.name}></TextInput>
                  <Text></Text>

                  <TextInput
                    style={StylesAll.inputBox1}
                    placeholder="Email*"
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}></TextInput>

                  <Text></Text>
                  <View style={StylesAll.inputFieldBox}>
                    <TextInput
                      defaultValue={'+60'}
                      style={[{flex: 0.15,fontFamily:'SFCompactDisplay-Medium'}]}
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                      keyboardType="number-pad"
                      returnKeyType="done"
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
                      //onChangeText={(text) => onChangeText1(text)}
                      onChangeText={props.handleChange('phoneNumber')}
                      value={props.values.phoneNumber}
                      placeholder="Mobile Number*"
                      keyboardType="number-pad"
                    />
                  </View>

                  <Text></Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View
                      style={[
                        StylesAll.inputFieldBox,
                        {alignItems: 'center', marginTop: 5, flex: 1},
                      ]}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={[
                            {padding: 5, flex: 1,fontFamily:'SFCompactDisplay-Medium'},
                            selectedDate != 'Date of Birth*'
                              ? {color: COLORS.black}
                              : {color: COLORS.grey_100},
                          ]}>
                          {selectedDate}{' '}
                        </Text>

                        <Image
                          source={require('./Image/calendar.png')}
                          style={{
                            width: 25,
                            height: 25,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      setSelectedDate(Moment(date).format('yyy-MM-DD'));
                      hideDatePicker();
                    }}
                    onCancel={hideDatePicker}
                  />
                </View>
              </ScrollView>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 30,
                  paddingBottom: 5,
                  height: 70,
                }}>
                <TouchableOpacity
                  disabled={
                    props.values.name != '' &&
                    props.values.email != '' &&
                    props.values.phoneNumber != ''
                      ? false
                      : true
                  }
                  onPress={props.handleSubmit}
                  >
                  <View
                    style={[
                      {
                        width: windowWidth - 40,
                        height: 50,
                        backgroundColor: COLORS.app_browntheme,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                      },
                      props.values.name != '' &&
                      props.values.email != '' &&
                      props.values.phoneNumber.length >= 9
                        ? StylesAll.commonButton
                        : StylesAll.commonButtondisabled,
                    ]}>
                    <Text style={StylesAll.btnText}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default CreateAccount;
