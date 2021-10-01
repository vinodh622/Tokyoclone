import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Ltout, loginAction, loginPhoneAction} from './actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {purgeStoredState} from 'redux-persist';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

const Detail = ({navigation}) => {

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {loginData} = LoginStatus;
  const {status} = LoginStatus;
  const createLogoutAlert = () => {
    Alert.alert(`Hi, ${loginData.name}`, 'Are you sure want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(Ltout(purgeStoredState));
          logOutAPI();
        },
      },
    ]);
  };

  const logOutAPI = () => {
    let abort = new AbortController();
    var form = new FormData();
    form.append('api_token', loginData.token);
    form.append('login_type', 'user');
    fetch(
      'http://sos.shiftlogics.com/api/user/logout',
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
        console.log('mathan mathan mathan',data)
        if (data.status === 'success') {
          
          console.log('mathan mathan mathan',data)
        } else {
          
        }
      })
      .catch((e) => console.log(e));
    return () => {
      abort.abort();
    };
  };

  useEffect(() => {
    if (status === 'failure') {
      dispatch(Ltout(purgeStoredState));
    }
  }, []);

  const onPressHeader = () => {
    navigation.navigate('Loginscreen');
  };

  const onPress1 = () => {
    navigation.navigate('WebViewComman', {
      urlString: 'https://www.facebook.com/tokyosecretmalaysia',title : 'FACEBOOK'
    });
  };

  const onPress2 = () => {
    navigation.navigate('feedBack');
  };

  const onPress3 = () => {
    navigation.navigate('WebViewComman', {
      urlString: 'https://www.instagram.com/tokyosecretmy/?hl=en',title : 'INSTAGRAM'
    });
  };

  const onPress4 = () => {
    navigation.navigate('TermsandConditions');

    //  navigation.navigate('WebViewComman',{urlString : 'https://tokyosecret.com/index.php?route=information/information&information_id=5'})
  };

  const onPress5 = () => {
    navigation.navigate('PrivacyPolicy');

    // navigation.navigate('WebViewComman',{urlString : 'https://tokyosecret.com/index.php?route=information/information&information_id=5'})
  };

  const onPress6 = () => {
    createLogoutAlert();
  };

  return (
    <View style={StylesAll.flexScreen}>
         <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
        <SafeAreaView style={StylesAll.flexScreen}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[StylesAll.commonHeader, {paddingHorizontal: 25}]}>
            <Image
              source={require('./Image/back.png')}
              resizeMode="contain"
              style={StylesAll.headArrow}
            />
            <Text style={[StylesAll.headTitle]}>PROFILE</Text>
          </View>
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <View style={styles.loginHeaderView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.search}
                source={require('./Image/user.png')}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={onPressHeader}
                disabled={loginData != null ? true : false}>
                <View style={styles.logintextView}>
                  <Text
                    style={
                      ([styles.logintext2],
                      {fontFamily: 'SFCompactDisplay-Medium', fontSize: 15})
                    }>
                    {loginData === null ? 'Login / Register' : loginData.name}
                  </Text>
                  <Text
                    style={
                      ([styles.logintext2],
                      {fontFamily: 'SFCompactDisplay-Medium', fontSize: 12})
                    }>
                    {loginData === null ? 'User' : loginData.email}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listView}>

          {loginData === null ? (
              <View />) :(
            <TouchableOpacity onPress={onPress2}>
              <View style={styles.ListHeaderView}>
                <Image
                  style={styles.list}
                  source={require('./Image/feedback1.png')}
                />
                <Text style={styles.logintext1}>Feedback</Text>
              </View>
              
            </TouchableOpacity>
              )
          }

            <TouchableOpacity onPress={onPress1}>
              <View style={styles.ListHeaderView}>
                <Image
                  style={styles.list}
                  source={require('./Image/facebook.png')}
                />
                <Text style={styles.logintext1}>Join Us on Facebook</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress3}>
              <View style={styles.ListHeaderView}>
                <Image
                  style={styles.list}
                  source={require('./Image/instagram.png')}
                />
                <Text style={styles.logintext1}>Join Us on Instagram</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress4}>
              <View style={styles.ListHeaderView}>
                <Image
                  style={styles.list}
                  source={require('./Image/terms_of_use.png')}
                />
                <Text style={styles.logintext1}>Terms Of Use</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress5}>
              <View style={styles.ListHeaderView}>
                <Image
                  style={styles.list}
                  source={require('./Image/privacy_policy.png')}
                />
                <Text style={styles.logintext1}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>

            {loginData === null ? (
              <View />
               ) : (
              <TouchableOpacity onPress={onPress6}>
                <View style={styles.ListHeaderView}>
                  <Image
                    style={[
                      styles.list,
                      {width: 20, height: 20, position: 'relative', right: -4},
                    ]}
                    source={require('./Image/logout.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.logintext1}>Logout</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#424242',
  },
  section1: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#2AFD89',
  },
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#00D35F',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
  },
  group: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  section1word: {
    backgroundColor: '#2AFD89',
  },
  sec1wordinside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#2AFD89',
  },
  text1: {
    fontWeight: 'bold',
  },
  text2: {
    fontWeight: 'bold',
    color: COLORS.app_light_theme,
    borderBottomWidth: 4,
    borderColor: 'white',
    paddingBottom: 10,
    width: 75,
    textAlign: 'center',
  },
  end: {
    flexDirection: 'row',
    backgroundColor: COLORS.app_light_theme,
    padding: 10,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  picture: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  endtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10,
  },

  listView: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  list: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  loginHeaderView: {
    backgroundColor: COLORS.app_bgtheme,
    flexDirection: 'row',

    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  ListHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logintextView: {
    marginLeft: 0,
  },

  logintext2: {
    color: COLORS.profile_list_title,

    paddingLeft: 10,
  },

  logintext1: {
    color: COLORS.profile_list_title,
    fontSize: 16,
    paddingLeft: 16,
    color: '#000',
  },
  logintext2: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: 15,
    paddingLeft: 10,
  },
  search: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
});
