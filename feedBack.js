import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import ActivityIndi from './ActivityIndi';
import {Formik} from 'formik';
import * as yup from 'yup';
import {StylesAll} from './commanStyle/objectStyle';

import {
  Ltout,
  loginAction,
  loginPhoneAction,
  loginSocialAction,
  loginSocialGoogleAction,
  loginSocialAppleAction,
} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';


const FeedBackData = yup.object({
  email: yup
    .string()
   ,
  subject: yup.string(),
  description: yup.string(),
});

const feedBack = ({navigation}) => {

  const [isLoadingList, setIsLoadingList] = useState(Boolean);

  const [errorCheck, seterrorCheck] = useState(false);

  const [errorMsg, setErrormsg] = useState('');


  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;
  const {status} = LoginStatus;


  const createAlertWithTwoButton = (itemValue) =>
    Alert.alert(
      itemValue,
      ' ',
      [
        {
          text: 'cancel',
          style: 'cancel',
        },
        {text: 'ok', onPress: () => navigation.goBack()},
      ],
      {cancelable: false},
    );

  return (
   
    <View style={StylesAll.flexScreen}>
    

      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
      <SafeAreaView style={StylesAll.flexScreen}>

      

      {errorCheck ? (
              <View style={styles.errorSnackbar}>
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

<View style={StylesAll.headWrapper}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={StylesAll.commonHeader}>
<Image source={require('./Image/back.png')} resizeMode="contain" style={StylesAll.headArrow}/>
<Text style={[StylesAll.headTitle]}>FEEDBACK</Text>
</View>
</TouchableOpacity>
</View>



        <Formik
          initialValues={{
            email: '',
            subject: '',
            description: '',
          }}
          validationSchema={FeedBackData}
          onSubmit={async (values) => {
            setIsLoadingList(true);
            seterrorCheck(false);

            let abort = new AbortController();
            var form = new FormData();
            form.append('user_id',loginData.id);
            form.append('title', values.subject);
            form.append('email', values.email);
            form.append('description', values.description);

            console.log('form',form)
            fetch(
              'http://sos.shiftlogics.com/api/feedback/addFeedback',
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

                console.log('datadata feedback',data)

                if (data.status === 'success') {
                 
                  createAlertWithTwoButton(data.Msg);
                  seterrorCheck(false)
                  setErrormsg('')

                  setIsLoadingList(false);
                } else if (data.status==="failure") {

                 seterrorCheck(true)
                  setErrormsg(data.Msg)
                  setIsLoadingList(false);


                }
              })
              .catch((e) => console.log(e));
            return () => {
              abort.abort();
            };
          }}>
          {(props) => (
            <View style={StylesAll.innerWrapper}>
               <Image
                source={require('./Image/MainLogo.png')}
                style={{width:160 ,height:100}}   resizeMode="contain"
                />

                <View style={[StylesAll.flexWtrapper, {paddingTop: 20}]}>
                <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={[StylesAll.main_Title, {fontSize:22}]}>
                  Your feedback matters
                </Text>
                <Text style={StylesAll.commom_color}>How was your experience with us ?</Text>
                <Text></Text>
               
                <TextInput style={StylesAll.inputBox} 
                      onChangeText = {props.handleChange('email')}
                      placeholder="Email*"
                     values =  {props.values.email}
                />

                
                <TextInput style={StylesAll.inputBox}
                      onChangeText = {props.handleChange('subject')}
                      placeholder="Subject" 
                       values =  {props.values.subject}
                />

               <View style={[
                    {
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      borderRadius: 11,
                      paddingHorizontal: 15,
                      
                       minHeight:120
                    },{paddingVertical: Platform.OS === 'ios' ?  15 : 0}
                    
                  ]} >

                <TextInput
                  multiline={true}
                  placeholder="Describe your feedback*"
                  onChangeText = {props.handleChange('description')}
                  values =  {props.values.description}
                />
                </View>
                </ScrollView>
              </View>

                 
              <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
                <TouchableOpacity   disabled={
                  props.values.email != '' &&
                  props.values.subject != '' &&
                  props.values.description != ''
                    ? false
                    : true
                }
                    onPress={props.handleSubmit}    disabled={ !props.dirty}
                
              
                
                >
                  <View style={props.values.email != '' &&
                      props.values.description != '' &&
                      props.values.subject != ''
                        ? StylesAll.commonButton
                        : StylesAll.commonButtondisabled} >
                    <Text style={StylesAll.btnText}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            
          )}
        </Formik>

      
      </SafeAreaView>
      </TouchableWithoutFeedback>
      <View>{isLoadingList ? <ActivityIndi/>:<View></View> }</View>
     
    </View>

    
  );
};

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,

    margin: 5,
  },

  group: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 10,
  },
  submit: {
    padding: 10,
    margin: 5,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#C7451F',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red',
  },
  textInput: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
  },
  textInput1: {
    padding: 10,
    margin: 5,
    backgroundColor: 'lightgray',
  },
  errorSnackbar: {
    backgroundColor: '#C02925',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
});

export default feedBack;