import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {COLORS} from './Styles/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {StylesAll} from './commanStyle/objectStyle';

import {useDispatch, useSelector} from 'react-redux';

import SampleData from './SampleData';
import {useIsFocused} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

// import { DrawerActions } from '@react-navigation/native';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();

  const [voucherData, setVoucherData] = useState([]);

  const LoginStatus = useSelector((state) => state.loginDetails);

  const {loginData} = LoginStatus;

  const isCarousel = React.useRef(null);

  const [isLoadingList, setIsLoadingList] = useState(true);

  const [viewPostData, setViewPostData] = useState([]);

  const [splash,setSplash] = useState(true);



  const renderItemCarouselCardItem = ({item,index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Voucherdetail', {
            dataValue: item,
            isVoucher: true,
          });
        }}>
        
          <View key={index} style={[{borderRadius: 17}, styles.shadowLayout]}>
            <Image
              source={{uri: `http://sos.shiftlogics.com/${item.photo}`}}
              resizeMode="cover"
              style={{
                width: (windowWidth)-(windowWidth/5.0), //Raja edited
                height: '100%',
                aspectRatio:  1 / 0.56, //Raja edited
                borderRadius: 17,
              }}
              key={index}
            />
          </View>
       
      </TouchableOpacity>
    );
  };

  const EmptyListMessage = () => {
    if (loginData === null) {
      return (
        <TouchableOpacity  onPress={() =>{
          navigation.navigate('Loginscreen')
        }}> 
        <View style={[{aspectRatio:  1 / 0.56,width:windowWidth - 60,justifyContent:'center',alignItems:'center'}]}>
          <Image
            resizeMode= "contain"
            style={{width: 30, height: 30}}
            source={require('./Image/opps.png')}
          />
          <Text style={[ StylesAll.boldFont,{fontSize:12}]}>
            Oops, login is required!
          </Text>
        </View>
        </TouchableOpacity>
        
      );
    } else {
      return (
        
        <View style={[{aspectRatio:  1 / 0.56,width:windowWidth - 60,justifyContent:'center',alignItems:'center'}]}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./Image/opps.png')}
            resizeMode="cover"
          />
          <Text style={[StylesAll.boldFont]}>
          No new voucher at this time!
          </Text>
        </View>
        
      );
    }
  };


  // const CarouselCardItem = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.navigate('Voucherdetail', {
  //           dataValue: item,
  //           isVoucher: true,
  //         });
  //       }}>
        
  //         <View key={index}>
  //           <Image
  //             source={{uri: `http://sos.shiftlogics.com/${item.photo}`}}
  //             resizeMode="cover"
  //             style={[  { width: ITEM_WIDTH,borderColor: '#999',
  //             borderWidth: 0.5,
  //               height: undefined,
  //               aspectRatio: 800 / 450,
  //               borderRadius: 17, elevation: 5, backgroundColor: '#FFF',overflow: 'hidden',}]}
  //             key={index}
  //           />
  //         </View>
       
  //     </TouchableOpacity>
  //   );
  // };

  // useEffect(() => {

  //   const unsubscribe = navigation.addListener('focus', () => {

  //     if (loginData === null) {

  //       console.log('login data null')

  //       setIsLoadingList(false);
  //       setVoucherData([]);

  //     } else {
  //       console.log('loginData not null');

  //       var form = new FormData();
  //       form.append('api_token', loginData.token);
  //       fetch(
  //         'http://sos.shiftlogics.com/api/voucher/viewVoucherAPP',
  //         {
  //           method: 'POST',
  //           headers: new Headers({
  //             Accept: 'application/json',
  //             'Content-Type': 'multipart/form-data',
  //           }),
  //           body: form,
  //         },

  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log('datadatadata',data)
  //           console.log(data)
  //           if (data.status === 'success') {
  //             setIsLoadingList(false);
  //             console.log('data voucher ',data);
  //             setVoucherData(data.data);
  //           } else {
  //             setIsLoadingList(false);
  //           }
  //         })
  //         .catch((e) => console.log(e));

  //     }
  //   });

  //   return () => {
  //     unsubscribe;
  //   };
  // }, [isFocused,navigate]);

  useEffect(() => {

    let abort = new AbortController();
    var form = new FormData();

    fetch(
      'http://sos.shiftlogics.com/api/newpost/viewNewpost',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        // body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {
     
        if (loginData === null) {
          setIsLoadingList(false);
          setVoucherData([]);
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
                
                setVoucherData(data.data);
              } else {
                setIsLoadingList(false);
              }
            })
            .catch((e) => console.log(e));
        }

        if (data.status === 'success') {
          setViewPostData(data.data);
          setIsLoadingList(false);
        } else {
          setIsLoadingList(false);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      abort.abort();
    };
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <View>
        {item.postImage.map((ee) => {
          return (
            <View style={[{borderRadius: 17}, styles.shadowLayout]}>
              <Image
                source={{uri: `http://sos.shiftlogics.com/${ee.pImage}`}}
                style={{
                  width: (windowWidth)-(windowWidth/2.34), //Raja edited
                  height: '100%',
                  aspectRatio: 1 / 1.42, //Raja edited
                  borderRadius: 17,
                }}
                resizeMode="cover"></Image>
            </View>
          );
        })}
      </View>
    );
  };

  const ItemSeparator = () => {
    return <View style={{width: 20}}></View>;
  };
 
  useEffect(() => {

    if (Platform.OS === 'ios'){
      setSplash(false);
    }else{
      setTimeout(() => {
        setSplash(false);
      }, 2000);
  
      return () => {
        //test
        clearInterval(() => {
          setSplash(true);
        });
      };
    }
   
  }, [  ]);


  const returnView=() =>{

    <View style={StylesAll.flexScreen}>
    <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
    <SafeAreaView style={StylesAll.flexScreen}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 20
        }}>
        <View style={{paddingHorizontal: 20}}>
          <Image
            source={require('./Image/MainLogo.png')}
            style={{width: 100, height: 80}}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 30,
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('./Image/mainmenu.png')}></Image>
          </View>
        </TouchableOpacity>
      </View>

    
      <View style={{flex:1,justifyContent:'flex-end',flexDirection:'column'}}>   
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      

      {loginData == null ? null : (
        <Text
          style={[
            {paddingTop: 10, paddingHorizontal: 30, paddingBottom: 10,color:'#313131', fontFamily: 'SFCompactDisplay-Light',
            fontSize : 15,},
             
          ]}>
          Hi, {loginData.name}
        </Text>
      )}

      <View style={{flex : 1.3, paddingBottom: 10}}>
        <Text
          style={[
            {paddingTop: 10, paddingLeft: 30, paddingBottom: 10,color:'#343434'}, 
            StylesAll.boldFont3,
          ]}>
          Latest Vouchers
        </Text>


        <FlatList
          contentContainerStyle={{paddingHorizontal: 30,paddingVertical: 10}}
          horizontal
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          data={voucherData}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item) => item.id}
          //keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemCarouselCardItem}
        />

      </View>

      <View style={{flex: 2.5, paddingBottom: 10,justifyContent:'flex-end'}}>
        <Text
          style={[
            {paddingTop: 5, paddingLeft: 30, paddingBottom: 10,color:'#343434'},
            StylesAll.boldFont3,
          ]}>
          Popular
        </Text>

        <FlatList
          contentContainerStyle={{paddingHorizontal: 30,paddingVertical: 10}}
          horizontal
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          data={viewPostData}
          ItemSeparatorComponent={ItemSeparator}
          //ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item) => item.id}
          //keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

          </View>
          </ScrollView>
          </View>
         
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 5,
        
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('menuDashboard');
            }}>
            <View style={[styles.labelBox,{paddingHorizontal:20}]}>
              <Image
                source={require('./Image/menuNew.png')}
                style={styles.labelIcons}
              />
              <Text style={StylesAll.btm_Menu}>Menu</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScanQr');
            }}>
            <View style={[styles.labelBox,{paddingHorizontal:20}]}>
              <Image
                source={require('./Image/orderNew.png')}
                style={styles.labelIcons}
              />
              <Text style={StylesAll.btm_Menu}>Order</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Reserve');
            }}>
            <View style={[styles.labelBox,{paddingHorizontal:20}]}>
              <Image
                source={require('./Image/reserveNew.png')}
                style={styles.labelIcons}
              />

              <Text style={[StylesAll.btm_Menu]}>Reserve</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Outlet');
            }}>
            <View style={[styles.labelBox,{paddingHorizontal:20}]}>
              <Image
                source={require('./Image/outletNew.png')}
                style={styles.labelIcons}
              />
              <Text style={StylesAll.btm_Menu}>Outlets</Text>
            </View>
          </TouchableOpacity>
        </View>
     
    </SafeAreaView>
  </View>
  }
  
  return (

   splash ? (
      <View style={{flex:1 ,flexDirection:"column"}}>
      
       <StatusBar barStyle="dark-content" backgroundColor="#FFE36E"></StatusBar>   

<View style={{backgroundColor:"#FFE36E",flex:1 ,justifyContent:"center",alignItems:"center"} }>

               <Image
                source={require('./Image/sosLogo.png')}
                resizeMode="contain"
                style={{width: 90, height: 90}}
              />




</View>
       {/* <ImageBackground source={require('./Image/appInvite.png')} style={{width:"100%" ,height:"100%"}}> </ImageBackground>*/}

 
        
 
    </View>
    ) : (

  
      <View style={StylesAll.flexScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={StylesAll.flexScreen}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <View style={{paddingHorizontal: 20}}>
          <View style={{justifyContent:"center" ,alignItems:"center"}}>
<Image
              source={require('./Image/sosLogo.png')}
              style={{width: 80, height: 80}}
              resizeMode="contain"
            />

</View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>

        
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 30,
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./Image/mainmenu.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>

      
          <View style={{flex:1,justifyContent:'flex-end',flexDirection:'column'}}>   
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
        

        {loginData == null ? null : (
          <Text
            style={[
              {paddingTop: 10, paddingHorizontal: 30, paddingBottom: 10},
              COLORS.dashboard_name,
              StylesAll.mediamFont,
            ]}>
            Hi, {loginData.name}
          </Text>
        )}

        <View style={{flex : 1.3, paddingBottom: 10}}>
          <Text
            style={[
              {paddingTop: 10, paddingLeft: 30, paddingBottom: 10}, 
              StylesAll.boldFont2,
            ]}>
            Latest Vouchers
          </Text>

          <FlatList
            contentContainerStyle={{paddingHorizontal: 30,paddingVertical: 10}}
            horizontal
            numColumns={1}
            showsHorizontalScrollIndicator={false}
            data={voucherData}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyListMessage}
            keyExtractor={(item) => item.id}
            //keyExtractor={(item, index) => index.toString()}
            renderItem={renderItemCarouselCardItem}
          />
 
        </View>

        <View style={{flex: 2.5, paddingBottom: 10,justifyContent:'flex-end'}}>
          <Text
            style={[
              {paddingTop: 5, paddingLeft: 30, paddingBottom: 10},
              StylesAll.boldFont2,
            ]}>
            Popular
          </Text>

          <FlatList
            contentContainerStyle={{paddingHorizontal: 30,paddingVertical: 10}}
            horizontal
            numColumns={1}
            showsHorizontalScrollIndicator={false}
            data={viewPostData}
            ItemSeparatorComponent={ItemSeparator}
            //ListEmptyComponent={EmptyListMessage}
            keyExtractor={(item) => item.id}
            //keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />

            </View>
            </ScrollView>
            </View>
           
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 5,
          
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('menuDashboard');
              }}>
              <View style={[styles.labelBox,{paddingHorizontal:20}]}>
                <Image
                  source={require('./Image/menuNew.png')}
                  style={styles.labelIcons}
                />
                <Text style={StylesAll.btm_Menu}>Menu</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ScanQr');
              }}>
              <View style={[styles.labelBox,{paddingHorizontal:20}]}>
                <Image
                  source={require('./Image/orderNew.png')}
                  style={styles.labelIcons}
                />
                <Text style={StylesAll.btm_Menu}>Order</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Reserve');
              }}>
              <View style={[styles.labelBox,{paddingHorizontal:20}]}>
                <Image
                  source={require('./Image/reserveNew.png')}
                  style={styles.labelIcons}
                />

                <Text style={[StylesAll.btm_Menu]}>Reserve</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Outlet');
              }}>
              <View style={[styles.labelBox,{paddingHorizontal:20}]}>
                <Image
                  source={require('./Image/outletNew.png')}
                  style={styles.labelIcons}
                />
                <Text style={StylesAll.btm_Menu}>Outlets</Text>
              </View>
            </TouchableOpacity>
          </View>
       
      </SafeAreaView>
    </View>
    )

   
  );
};
export default Home;
const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

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
    color: 'white',
    borderBottomWidth: 4,
    borderColor: 'white',
    paddingBottom: 10,
    width: 75,
    textAlign: 'center',
  },
  end: {
    flexDirection: 'row',
    backgroundColor: '#191919',
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
  loginView: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
    padding: 0,
  },
  listView: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 0,
  },
  list: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  loginHeaderView: {
    backgroundColor: '#00000012',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  logintextView: {
    marginLeft: 0,
  },
  logintext1: {
    color: 'black',
    paddingLeft: 3,
    fontFamily: 'SFMono-Bold',
    fontSize: 15,
  },
  logintext2: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: 15,
    paddingLeft: 10,
  },
  search: {
    width: 70,
    height: 70,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  androidios: {
    backgroundColor: '#EFCB38',
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'SFMono-Bold',
    fontSize: 20,
  },
  labelIcons: {width: 25, height: 25, marginBottom: 10},

  labelBox: {alignItems: 'center'},

  shadowLayout: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
