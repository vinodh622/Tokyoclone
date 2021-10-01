import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
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
  import {COLORS} from './Styles/colors';
  import {StylesAll} from './commanStyle/objectStyle';
  import {useDispatch, useSelector} from 'react-redux';
  import ActivityIndi from './ActivityIndi';
const LottieViewScreen = ({ navigation, route }) => {
    const LoginStatus = useSelector((state) => state.loginDetails);
    const {loginData} = LoginStatus;
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isSuccess,setIsSuccess] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          if (loginData === null) {
            setIsLoadingList(false);
            
          } else {
            
                    var form = new FormData();
                    form.append('api_token', loginData.token);
                    form.append('payment_token',route.params?.payToken)

                    console.log('form formformform form',form);

                    fetch('http://sos.shiftlogics.com/api/user/paymentstatus', {
                      method: 'POST',
                      headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                      }),
                      body: form,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log('datadata value',data);
            
                      
                        if (data.status === 'success') {
                          
                            setIsSuccess(1)
                          setIsLoadingList(false);
            
                   
                } else {
                    setIsSuccess(2)
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

    
    return( 
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
            <View style={[StylesAll.commonHeader,{paddingBottom :20}]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}></Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
            {isSuccess === 1 ? <LottieView source={require('./payment_success.json')} autoPlay loop /> :
            isSuccess === 2 ? <LottieView source={require('./payment_failed.json')} autoPlay loop /> : null
            }
        <LottieView source={require('./payment_success.json')} autoPlay loop /> 
        </View>
</SafeAreaView>
<View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
</View>
    );
};

export default LottieViewScreen;
