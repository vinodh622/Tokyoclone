import React,{useRef,useState,useEffect} from 'react';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';
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
    ActivityIndicator,
    Platform,
    TouchableHighlight,
    Button,
    Alert,
    SafeAreaView,
    BackHandler,
    Modal
  } from 'react-native';
  import {COLORS} from './Styles/colors';
  import {StylesAll} from './commanStyle/objectStyle';
  import {useDispatch, useSelector} from 'react-redux';
  import ActivityIndi from './ActivityIndi';
  import User from './User';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  let inc = 0 ;


  const MyWeb = ({ navigation, route }) => {

    const[totalURL,setTotalURL] = useState(0)

    const[myData,setMyData] = useState({})

    const LoginStatus = useSelector((state) => state.loginDetails);
    const {loginData} = LoginStatus;
    const [isLoadingList, setIsLoadingList] = useState(true);
    const webviewRef = useRef(null);
    const [isSuccess,setIsSuccess] = useState(0);
    const[modalVisible,setModalVisible] = useState(false);

    

    useEffect(() => {

      console.log('route.params?.urlString',route.params?.urlString);

      
      return () => {
   
      }
    }, [])
  const handleWebViewNavigationStateChange = (newNavState) => {

    console.log("newNavState ", newNavState);

  
    // {"canGoBack": true, "canGoForward": false, "loading": false, "target": 935, "title": "https://www.tokyo.shiftlogics.com/payment/indirect", "url": "https://www.tokyo.shiftlogics.com/payment/indirect"}


    if (newNavState.canGoBack === true){
  console.log('process...')
    }
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;

    console.log('url mathan',url);

   setTotalURL(totalURL + 20)

    console.log('inc',inc);

    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('payment/indirect')) {
     
     
      setTotalURL(windowWidth)
        checkingPaymentStatus();
        console.log('mathann success');
        
    //   const newURL = 'https://reactnative.dev/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   webview.injectJavaScript(redirectTo);
    }
  };


  const checkingPaymentStatus= () =>{
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

        setMyData(data)
        console.log('datadata value',data);
      
        if (data.data.pay_status === 1) {          
            setModalVisible(true);
            setIsSuccess(1)
            setIsLoadingList(false);
          } else if (data.data.pay_status === 0)  {
            setModalVisible(true);
            setIsSuccess(2)
            setIsLoadingList(false);
          }else{
            setIsSuccess(0)
          }
})
          .catch((e) => console.log(e));
  }
  const renderLoadingView = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };


  const redirectTo=()=>{
    navigation.navigation('LottieViewScreen',{payToken : route.params?.payToken})
  }
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
          <View style={[StylesAll.commonHeader,{paddingBottom :20}]}>
            <Image
              source={require('./Image/back.png')}
              resizeMode="contain"
              style={StylesAll.headArrow}
            />
            
            <Text style={[StylesAll.headTitle,{marginBottom:5}]}>{route.params?.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
                  style={{
                    backgroundColor: 'lightgray',
                    height: 10,
                    width: '100%',
                   
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      backgroundColor: COLORS.app_browntheme,
                      height: 10,
                      width: totalURL,
                      
                    }}></Text>
                </View>
      <WebView
      ref={(ref) => (webview = ref)}
      source={{
        uri: route.params?.urlString
      }}
        
      renderLoading={renderLoadingView}
       
      ref={webviewRef}
      onError={() => {
        console.log('error')
      }}
      startInLoadingState={true}
       onNavigationStateChange={handleWebViewNavigationStateChange}
    />   

          <Modal animationType="none" transparent={true} visible={modalVisible}>
           <SafeAreaView style={StylesAll.flexWtrapper}>
           <StatusBar
               barStyle="dark-content"
                  backgroundColor={COLORS.app_bgtheme}></StatusBar>
           <View style={Platform.OS === 'ios' ? [StylesAll.common_Modal,{justifyContent:'center'}] : {flex:1 ,flexDirection:"column" ,backgroundColor:"#fff" ,padding:15}} >
           
           {Platform.OS === 'ios' ?  null :
           <View style={[StylesAll.headWrapper]}>
           <TouchableOpacity onPress={() => {
           navigation.navigate('Dashboard');
             setModalVisible(false)
           }}>
           <View style={[StylesAll.commonHeader,{paddingBottom :20}]}>
           <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
           <Text style={[StylesAll.headTitle]}>Go Back</Text>
           </View>
           </TouchableOpacity>
           </View>
             }
             
           {Platform.OS === 'ios' ? 

                      <View style={[StylesAll.modalBox,{height : 180 }]}>
                    
                      <View>


                   {isSuccess === 1 ?  <Text style={[{fontFamily: 'SFCompactDisplay-Bold',
                            fontSize: 20,marginTop:20,color:'#000',textAlign:'center'}]}>
                          {''} Payment Added Successfully
                        </Text> : isSuccess === 2 ? 
                        <Text style={[{fontFamily: 'SFCompactDisplay-Bold',
                        fontSize: 20,marginTop:20,color:'red',textAlign:'center'}]}>
                        {''} Payment Failed
                      </Text> : null
                    }
            
                      </View>
                      <View
                        style={{
                          flex:1,
                          alignItems: 'center',
                          alignContent: 'center',
                          marginTop: 30,
                        }}>
                      
                        <TouchableOpacity
                          onPress={() => {
                           
                            navigation.navigate('Dashboard');
                            setModalVisible(false)
                          }}
                          style={{flex: 1}}>
                          <View style={[StylesAll.viewBtn, StylesAll.mediumBtn1]}>
                            <Text
                              style={[
                                StylesAll.whitecolor,
                                StylesAll.boldFont,
                                {textAlign: 'center', fontSize: 15, padding: 8},
                              ]}>
                              Go Back
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      </View> 
            : 
            <View style={{flex:1}}>
            {isSuccess === 1 ? <LottieView source={require('./payment_success.json')} autoPlay loop /> :
             isSuccess === 2 ?  <LottieView source={require('./payment_failed.json')} autoPlay loop />  : null
            }
            
           </View>
           }

  
        
           </View>
          </SafeAreaView>
         </Modal>

         </SafeAreaView>
       
</View>


    );
  }

  
 

export default MyWeb;
