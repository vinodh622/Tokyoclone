import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from "react-native"
import { StylesAll } from './commanStyle/objectStyle'

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.84)

 

const CarouselCardItem = ({ item, index,navigation }) => {
  return (

    <TouchableOpacity  onPress={() => {
      navigation.navigate('Voucherdetail',{dataValue : item,isVoucher:true});
      }}>
    <View style={{marginLeft : 10,marginRight : 10}}>
     
   <View     key={index} style={[
    {borderRadius:17 },
    styles.shadowLayout
  ]}>
   
            <Image
              source={{uri: `https://shiftlogics.com/Tokyo/${item.photo}`}}
              resizeMode= 'cover'
              style={[styles.imageStyle ,{borderRadius:17} ]}
               key={index}
            />
     </View>
     
  
    </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  container: {

    width: ITEM_WIDTH,

    
   
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  
  },


  shadowLayout:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5, 
  }
})

export default CarouselCardItem