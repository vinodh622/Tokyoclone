import React, {useState, useEffect,useRef} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing

} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ActivityIndi from './ActivityIndi';
import DepartmentSection from './DepartmentSection';
import {COLORS} from './Styles/colors';
import {StylesAll} from './commanStyle/objectStyle';


const Menusubcategory = ({navigation ,route}) => {

const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [CategoryProduct, setCategoryProduct] = useState([]);
 

  let globalCatid = route.params?.productId.id







  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true, 
      delay:1
    }).start();

    let abort = new AbortController();
    var form = new FormData();


    form.append('cateid', route.params?.productId.id);


    fetch(
      'http://sos.shiftlogics.com/api/beta/betasubcategory',
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

  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'column'}}>
    <View style={{marginBottom : 30}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader]}>
<Image source={require('./Image/back.png')}  resizeMode="contain"   style={StylesAll.headArrow}/>
  <Text style={[StylesAll.headTitle ,{textTransform:"uppercase"}]}>{route.params?.productId.name}</Text>
</View>
</TouchableOpacity>

</View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={CategoryProduct}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (

            <Animated.View
            style={[
             
              {
                opacity: fadeAnim // Bind opacity to animated value
              }
            ]}
          >
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu', {productId: item  , subCat : route.params?.productId.id,isSub : true});

              }}>
              <View style={StylesAll.listBox}>
                <Image
                  source={{
                    uri: `http://sos.shiftlogics.com/${item.image}`,
                  }}
                  style={{  width: '100%',
                  height: undefined,
                  aspectRatio: 862 / 447}}
                  resizeMode="cover"
                />
                <View style={StylesAll.listBoxlayer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingTop: 80,
                    }}>
                    <Text style={StylesAll.btnText}>{item.subcatename}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
            
          
          )}
        />
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

export default Menusubcategory;
