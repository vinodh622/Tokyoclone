import React, {useState, useEffect} from 'react';
import HTML from 'react-native-render-html';
import {
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';

export default function PrivacyPolicy({navigation}) {
  const [getData, setData] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch('http://sos.shiftlogics.com/api/setting/viewPrivacyPolicy', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
      })
        .then((response) => response.json())

        .then((data) => {
          if (data.status === 'success') {
           console.log('datadatadatadatadata Privacy policy',data);

            setData(data.data);
            setError(false);
          } else {
            setError(true);
          }
        })
        .catch((e) => console.log(e));
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[StylesAll.commonHeader ,{paddingBottom:20}]}>
            <Image
              source={require('./Image/back.png')}
              resizeMode="contain"
              style={StylesAll.headArrow}
            />
            <Text style={[StylesAll.headTitle]}>PRIVACY POLICY</Text>
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>

<View >

{error ? 
<View style={{flex:1 ,justifyContent:"center" ,alignContent:"center"}}>
<Text style={{textAlign:"center",marginTop:30}}>No  Details Found</Text>
</View>
          : <View>
          {getData.map((e) => {
                      return (
                        <View key={e.id}>
                          <ScrollView>
                            <HTML source={{html: e.fDesc}} />
                          </ScrollView>
                        </View>
                      );
                    })} 
                    
          </View> }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
