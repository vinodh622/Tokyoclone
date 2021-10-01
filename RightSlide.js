import React ,{useState,useEffect}from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Touchable, StyleSheet,
  Image
} from 'react-native';
 import {StylesAll} from './commanStyle/objectStyle';
 import VoucherData from './VoucherData';
 import Dashboard  from './Dashboard'

 import Rewards  from './Rewards'

 import Detail  from './Detail'


export default function Drawer({navigation}) {

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(5)





  // const updateTime=()=> {
  //   if (minutes == 0 && seconds == 0) {
  //     //reset
  //     setSeconds(0);
  //     setMinutes(5);
  //   }
  //   else {
  //     if (seconds == 0) {
  //       setMinutes(minutes => minutes - 1);
  //       setSeconds(59);
  //     } else {
  //       setSeconds(seconds => seconds - 1);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // use set timeout and be confident because updateTime will cause rerender
  //   // rerender mean re call this effect => then it will be similar to how setinterval works
  //   // but with easy to understand logic
  //   const token = setTimeout(updateTime, 1000)

  //   // return function cleanUp() {
  //   //   clearTimeout(token);
  //   // }
  // })

  return (
    <View style={StylesAll.commonWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>


      <SafeAreaView style={[StylesAll.flexWtrapper]}>
 
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
      <TouchableOpacity  onPress={() => navigation.goBack()}>
       <View style={{padding:20}}>
        <Image
        style={{width:30,height:30}}
        source={require('./Image/mainmenu.png')}
        >
        </Image>

        </View>
        </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>

          <TouchableOpacity   onPress={()=>navigation.navigate('VoucherData')} >
            <View style={styles.drawerMenu}>
              <Text style={[styles.drawerMenutext,global.mediumfont,global.commom_color]}>Vouchers</Text>
              <View style={styles.menuSeprator}></ View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
          <View style={styles.drawerMenu}>
          <Text style={[styles.drawerMenutext,global.mediumfont,global.commom_color]}>Member</Text>
          <View style={styles.menuSeprator}></ View>
           </View>
          </TouchableOpacity>
 
          <TouchableOpacity  onPress={()=>navigation.navigate('Rewards')}>
          <View style={styles.drawerMenu}>
          <Text style={[styles.drawerMenutext,global.mediumfont,global.commom_color]}>Rewards</Text>
          <View style={styles.menuSeprator}></ View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Detail')}>
          <View style={styles.drawerMenu}>
          <Text style={[styles.drawerMenutext,global.mediumfont,global.commom_color]}>Profile</Text>
          <View style={styles.menuSeprator}></ View>
          </View>
          </TouchableOpacity>

          
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
   
    drawerMenu:{
    marginBottom:30,flexDirection:"column" ,alignItems:"center" ,justifyContent:"center" 
    },

    drawerMenutext:{fontSize:16  ,paddingBottom:10 , },


    menuSeprator:{borderBottomWidth:1 ,borderBottomColor:"#9A7527" ,width:30}
    
  });