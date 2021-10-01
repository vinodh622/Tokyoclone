import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ActivityIndi from './ActivityIndi';
import DepartmentSection from './DepartmentSection';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';


const menuDashboard = ({navigation}) => {
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [CategoryProduct, setCategoryProduct] = useState([]);

  useEffect(() => {
    let abort = new AbortController();
    var form = new FormData();
 
    fetch(
      'http://sos.shiftlogics.com/api/beta/betacategoryAPP',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        //body: form,
      },
      {signal: abort.signal},
    )
      .then((response) => response.json())
      .then((data) => {


        if (data.status === 'success') {
         
          setCategoryProduct(data.data);
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


  const EmptyListMessage = () => {
    
      return (
        <View style={StylesAll.alertMsg}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./Image/opps.png')}
          resizeMode="cover"
        />
        <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
        No Menu List at this time!
        </Text>
      </View>
      );
  
  };


  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'column'}}>
    <View style={{marginBottom : 30}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader]}>
<Image source={require('./Image/back.png')}  resizeMode="contain"   style={StylesAll.headArrow}/>
<Text style={[StylesAll.headTitle ]}>MENU</Text>
</View>
</TouchableOpacity>

</View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={CategoryProduct}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={EmptyListMessage}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => { item.allow_subcategory == 1 ? 
                navigation.navigate('Menusubcategory', {productId: item,isSub : true}) : navigation.navigate('Menu', {productId: item,isSub : false}) 
              }}>
              <View style={StylesAll.listBox}>
                <Image
                  source={{
                    uri: `http://sos.shiftlogics.com/${item.image}`,
                  }}
                  style={{width: '100%',
                  height: undefined,
                  aspectRatio: 862 / 447
                 }}
                  resizeMode="cover"
                />
                <View style={StylesAll.listBoxlayer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingTop: 80,
                    }}>
                    <Text style={StylesAll.btnText}>{item.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

export default menuDashboard;
