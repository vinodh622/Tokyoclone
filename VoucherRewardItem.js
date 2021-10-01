import React from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';

const VoucherRewardItem = ({ item, index }) => {
  return (
    <View style={StylesAll.rewardLists}>
        <View style={{height: 200}}>
          <Image
            source={{uri: `http://shiftlogics.com/Tokyo/${item.photo}`}}
            
            style={[
              StylesAll.imageStyle,
              {borderTopLeftRadius: 10, borderTopRightRadius: 10},
            ]}
            resizeMode="cover"
          />
        </View>

        <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
          <View style={{flexDirection: 'column', flex: 1, paddingRight: 10}}>
            <Text style={StylesAll.md_Title} numberOfLines={3}>
              {item.title}
            </Text>
            <Text></Text>
            <Text numberOfLines={2}>{item.description}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <View style={StylesAll.sm_Button}>
                <Text style={StylesAll.btnText}>Redeem</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};


export default VoucherRewardItem