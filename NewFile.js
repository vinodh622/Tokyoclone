import React , { useRef } from 'react';
import { Text,Dimensions,StatusBar, View, StyleSheet, Image, ScrollView, ImageBackground, FlatList,TouchableOpacity ,Platform,TouchableHighlight,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import RBSheet from "react-native-raw-bottom-sheet";
 import BottomView from "./BottomView";


const NewFile = ({navigation}) => {
    const refRBSheet = useRef();

    function onPress2(){
         console.log('Hi mathan');
      }
      
return(
<View style={{flex: 1,backgroundColor: '#FFF5CE'}}>
 <View style={{borderRadius: 20,width: 130,backgroundColor: 'red',margin: 10,marginTop: 40,alignItems: 'center'}}> 
  <Text style={{color:'white',padding: 10}}>Promotions</Text>
 </View>

<View style={{flex: 8}}>

<RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={windowHeight/1.5}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <BottomView />
      </RBSheet>

<FlatList 
 
backgroundColor= '#FFF5CE'
showsHorizontalScrollIndicator={false}
numColumns={2}
data= {[
  {
    "id" : 1,
  "name" : 'one',
  "image" : require('./Image/listImage.png')
  },
   {
    "id" : 2,
  "name" : 'two',
  "image" : require('./Image/listImage.png')
  },
    {
    "id" : 3,
  "name" : 'three',
  "image" : require('./Image/listImage.png')
  },
  {
    "id" : 1,
  "name" : 'one',
  "image" : require('./Image/listImage.png')
  },
   {
    "id" : 2,
  "name" : 'two',
  "image" : require('./Image/listImage.png')
  },
    {
    "id" : 3,
  "name" : 'three',
  "image" : require('./Image/listImage.png')
  },

]}

keyExtractor={(item) => item.id}
renderItem={({item}) =>  
  
<TouchableOpacity  onPress={() => refRBSheet.current.open()} >
          <View style={styles.carsection1}>
               <ImageBackground
                source={require('./Image/sample.jpg')}
                resizeMode='cover'
                imageStyle={{ borderRadius: 10}}
                style={{flex:1,width: '100%',height: '100%' }}
               >
                   <View style={{flex:1,flexDirection:'column',justifyContent: 'flex-end',margin: 10}}>
                   <Text style={{color: 'white'}}>{item.name} </Text>
                    <View style={{height: 1,backgroundColor: 'white',marginTop: 10}}>
                    </View>
                    </View>
                </ImageBackground>
            </View>
          </TouchableOpacity>
       }/>
      </View>
</View>

);

}
export default NewFile;
 

const styles = StyleSheet.create({
  carsection1: {
   borderRadius: 10,
   height: 300,
    backgroundColor: 'red',
    marginLeft : 10,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth/2.2,
   alignItems : 'center',
   justifyContent: 'center'
  },
});