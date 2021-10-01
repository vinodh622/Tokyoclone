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
  PermissionsAndroid,
  Linking,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FlatListItemSeparator from './FlateListSeparatro';
import {showLocation} from 'react-native-map-link';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomView from './BottomView';

import ActivityIndi from './ActivityIndi';
import {StylesAll} from './commanStyle/objectStyle';
import {COLORS} from './Styles/colors';
import {loginAction} from './actions/loginActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Outlet = ({navigation}) => {
  
  const refRBSheet = useRef();

  const mapRef = React.createRef();

  const [outlet, setOutlet] = useState([]);

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [showUserLocation, setShowUserLocation] = useState(true);

  const [currentItem, setCurrentItem] = useState({});

   const[sourceLongitude,setSourceLongitude] = useState('')
  

  const [position, setPosition] = useState({
    latitude: 10.0,
    longitude: 10.0,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;

      setSourceLongitude(crd.longitude);

      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      (error) => Alert.alert('Error', JSON.stringify(error));
    }).catch(
      (err) => {
        requestPermissions();
        Alert.alert('Error', JSON.stringify(error));
        //console.log(err);
      },
      Platform.OS === 'android'
        ? {}
        : {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );

    let abort = new AbortController();

    fetch(
      'http://sos.shiftlogics.com/api/outlet/viewOutlet',
      {
        method: 'POST',
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
         
          setOutlet(data.data);
          setIsLoadingList(false);
        } else {
          setIsLoadingList(false);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      abort.abort();
    };
  }, []);

  const onPress2 = () => {};
  



  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
 
  const showIOSDevice = (itemId) => {
    let myData = currentItem.split(',');
  
    //'googleMaps://app?saddr=6.931970+79.857750&daddr=6.909877+79.848521'
    if (itemId === 1) {
      Linking.openURL(
        `https://maps.apple.com/maps?daddr=${myData[0]},${myData[1]}`,
      );
    } else if (itemId === 2) {

      showLocation({
        latitude: myData[0],
        longitude: myData[1],
 
        googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        googlePlaceId: 'AIzaSyB4aoN6mTSjWrnSIpBMLSyEv29GahbKeMs',  // optionally specify the google-place-id
        alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        
    })


      //Linking.openURL(`googleMaps://app?saddr=${myData[0]}&daddr=${myData[1]}`);
    } else {
      Linking.openURL(
        `https://waze.com/ul?q=${myData[0]},${myData[1]}"&navigate=yes&zoom=17`,
      );
    }
  };

  const gh = (cor) => {
    setCurrentItem(cor);
    let myData = cor.split(',');
    console.log('first Data', Number(myData[0]));
    console.log('first Data', Number(myData[1]));

    //let myData = route.params?.dataValue.coordinates.split(',');

    //'googleMaps://app?saddr=6.931970+79.857750&daddr=6.909877+79.848521'

    if (Platform.OS == 'ios') {
      console.log('ios device......');

      showLocation({
        latitude: myData[0],
        longitude: myData[1],
        sourceLongitude: sourceLongitude,
         googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
         googlePlaceId: 'AIzaSyB4aoN6mTSjWrnSIpBMLSyEv29GahbKeMs',  // optionally specify the google-place-id
        alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        
    })


      //refRBSheet.current.open();
      //   showLocation({
      //     latitude: myData[0],
      //     longitude: myData[1],

      //     sourceLongitude: sourceLongitude,  // not optional if sourceLatitude is specified
      //     title: 'The White House',  // optional
      //     googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
      //     googlePlaceId: 'AIzaSyB4aoN6mTSjWrnSIpBMLSyEv29GahbKeMs',  // optionally specify the google-place-id
      //     alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      //     dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
      //     dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
      //     cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
      //     appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      //     naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
      //     // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
      //     // app: 'uber'  // optionally specify specific app to use
      // })
    } else {
      Linking.openURL(
        `google.navigation:q=${myData.length > 0 ? Number(myData[0]) : ''}+${
          myData.length > 0 ? Number(myData[1]) : ''
        }`,
      );
    }

    // Linking.openURL(
    //   `google.navigation:q=${myData[0]}+${myData[1]}`,
    // )

    // {cor.split(',').map((step)=> {
    //   console.log('stepstepstep',step);
    // })}

    // if (showUserLocation == true){
    //       setShowUserLocation(false);
    //     }else{
    //       setShowUserLocation(true);
    //   }

    // setPosition({
    //   latitude : parseFloat(myData[0]) ,
    //   longitude: parseFloat(myData[1]),
    //   latitudeDelta : 0.5,
    //   longitudeDelta : 0.5
    // });
  };

  const EmptyListMessage = () => {
    
      return (
     
        <View style={[{justifyContent:'center',alignItems:'center',flex:1,paddingTop:80}]}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
            resizeMode="cover"
          />
          <Text style={[StylesAll.boldFont]}>
          No new Outlets at this time!
          </Text>
        </View>
        
      );
 
  }
  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafbfb'}}>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View style={StylesAll.headWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader, {paddingBottom: 15}]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle]}>OUTLETS</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1.5}}>
          <MapView
            ref={mapRef}
            style={{flex: 1.5}}
            mapType="standard"
            showsUserLocation={setShowUserLocation}
            followsUserLocation={true}
            showsCompass={true}
            showsPointOfInterest={false}
            //region={this.state.region}
            //onRegionChange={this.onRegionChange}
            region={position}
            //coordinates={position}
            initialRegion={position}>
          

          {outlet.map((eee) => {
            let myData = eee.coordinates.split(',');
            return(
            <MapView.Marker coordinate={{ latitude: Number(myData[0]), longitude: Number(myData[1]) }} />
            );
          })
        }

          </MapView>
          <View style={styles.outletData}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatListItemSeparator}
              data={outlet}
              keyExtractor={(item, index) => item.id}
              ListEmptyComponent={EmptyListMessage}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => gh(item.coordinates)}>
                  <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 0.8,
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 30,
                        }}>
                        <View style={{width: 100, height: 100}}>
                          <Image
                            source={{
                              uri: `http://sos.shiftlogics.com/${item.out_image}`,
                            }}
                            resizeMode="cover"
                            style={{width: '100%', height: '100%'}}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          flexDirection: 'column',
                          paddingHorizontal: 9,
                        }}>
                          
                        <Text numberOfLines={2} style={[{fontSize: 18,fontFamily:'SFCompactDisplay-Medium',color:'#333333'}]}>
                          {item.outlet_name}
                        </Text>
                        <Text
                          numberOfLines={3}
                          style={[
                            { color : '#343434',marginTop: 5,fontFamily: 'SFCompactDisplay-Light',
                            fontSize : 12,},
                            
                          ]}>
                          {item.address}
                        </Text>
                        <Text
                            style={[
                              { color : '#343434',marginTop: 5,fontFamily: 'SFCompactDisplay-Light',
                            fontSize : 12,},
                            ]}>
                            {item.work_hour}
                          </Text>

                          <Text
                            style={[
                              { color : '#343434',marginTop: 5,fontFamily: 'SFCompactDisplay-Light',
                            fontSize : 12,},
                            ]}>
                            {item.phone}
                          </Text> 
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={300}
          backgroundColor={COLORS.redTheme}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#fafbfb',
            }}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingBottom: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    showIOSDevice(2);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      paddingVertical: 20,
                      backgroundColor: COLORS.app_browntheme,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Google</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    showIOSDevice(1);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      paddingVertical: 20,
                      backgroundColor: COLORS.app_browntheme,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Apple</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    showIOSDevice(3);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      paddingVertical: 20,
                      backgroundColor: COLORS.app_browntheme,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Waze</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </RBSheet>
        <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
      </SafeAreaView>
    </View>
  );
};

export default Outlet;

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
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 90,
    margin: 10,
    borderRadius: 20,
  },

  carsection2: {
    flex: 1,
    backgroundColor: 'red',
  },

  carsection1: {
    height: 90,
    flexDirection: 'column',
    margin: 10,
  },

  outletData: {
    flex: 1,
    marginBottom: 0,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow:'hidden',  
    position: 'relative',
    backgroundColor: COLORS.app_bgtheme,
    top: -10,
  },
});
