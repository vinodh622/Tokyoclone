import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
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
  SectionList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ActivityIndi from './ActivityIndi';
import {COLORS} from './Styles/colors';
import DepartmentSection from './DepartmentSection';
import {StylesAll} from './commanStyle/objectStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Menu = ({navigation, route}) => {
  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const [isLoadingList, setIsLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(false);
  const [selectFlateList, setSelectFlateList] = useState(0);
  const [ref, setRef] = useState(null);

  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCords, setDataSourceCords] = useState([]);



  useEffect(() => {
    let abort = new AbortController();

    var form = new FormData();
    form.append(
      'cateid',
      route.params?.isSub === true
        ? route.params?.subCat
        : route.params?.productId.id,
    );
    form.append(
      'subcateid',
      route.params?.isSub === true ? route.params?.productId.id : '',
    );
 
    fetch(
      'http://sos.shiftlogics.com/api/product/betaproductbyid',
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
          setDataSource(data.data);
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

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        item={item.cateName}
        onPress={() => setSelectedId(item.cateName)}
        style={{backgroundColor}}
      />
    );
  };

  const scrollHandler = (index) => {
    if (dataSourceCords.length > index) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[index - 1],
        animated: true,
      });
    } else if (dataSourceCords.length == index) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[index - 1],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };

  const EmptyListMessage = () => {
    return (
      <View style={StylesAll.alertMsg}>
        <Image
          style={{width: 40, height: 40}}
          source={require('./Image/opps.png')}
          resizeMode="cover"
        />
        <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
          No Product List It this Category!
        </Text>
      </View>
    );
  };

  const ItemView = (item, key) => {
    return (
      <View key={key}>
        <View>
          <View style={StylesAll.productLists}>
            <View
              style={{
                flex: 1,
                justifyContent:'center',
               
              }}>
              {item.image.map((ee) => {

               
                
                return (
                  <Image
                    source={{
                      uri: `http://sos.shiftlogics.com/${ee.image}`,
                    }}
                    style={{width: "100%", height: "100%" ,aspectRatio:1/1}}
                    resizeMode= "cover"
                  />

                );
              })}
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
              <View>
                <Text
                  numberOfLines={3}
                  style={[StylesAll.md_Title, {fontSize: 12}]}>
                  {item.productName}
                </Text>

                <Text numberOfLines={3}>{item.sku}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={[
                    StylesAll.mediamFont,
                    {color: COLORS.app_browntheme},
                  ]}>
                  RM {(Math.round(item.sellingPrice * 100) / 100).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <View style={[StylesAll.commonWrapper, {paddingTop: 0}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={[StylesAll.commonHeader, {paddingBottom: 10}]}>
              <Image
                source={require('./Image/back.png')}
                resizeMode="contain"
                style={StylesAll.headArrow}
              />
              <Text style={[StylesAll.headTitle, {textTransform: 'uppercase'}]}>
                {route.params?.isSub === true
                  ? route.params?.productId.subcatename
                  : route.params?.productId.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {dataSource.length === 0 ? (
          <View style={StylesAll.alertMsg}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./Image/opps.png')}
              resizeMode="cover"
            />
            <Text style={[{marginTop: 5}, StylesAll.boldFont]}>
              No Product List It this Category!
            </Text>
          </View>
        ) : (
          <ScrollView
            ref={(ref) => {
              setRef(ref);
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 6, paddingTop: 30}}>
            {dataSource.map(ItemView)}
          </ScrollView>
        )}
      </SafeAreaView>
      <View>{isLoadingList ? <ActivityIndi /> : <View></View>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
  },
  title: {
    fontSize: 12,
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
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    margin: 5,
  },
  carsection2: {
    flex: 1,
    backgroundColor: 'red',
  },

  carsection1: {
    flex: 1,
    height: 100,
    flexDirection: 'column',
    backgroundColor: 'red',
    margin: 10,
  },

  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});

export default Menu;
