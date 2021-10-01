import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
 
export function Drawercontent(props) {
 
  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF5CE'}}>
      <DrawerContentScrollView {...props}>
        {/* <View>
          <View style={styles.drawerMenuSec}>
            <View style={styles.drwawerLogobox}>
              <Image
                source={require('../../images/Drawerlogo.png')}
                style={{width: 107, height: 43}}
                resizeMode="cover"
              />
            </View>

            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawerIcon1.png')}
                style={styles.drawrIcons}
              />

              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('Profile')}>
                Profile
              </Text>
            </View>

            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawericon2.png')}
                style={styles.drawrIcons}
              />
              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('Menu')}>
                Menu
              </Text>
            </View>

            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawericon3.png')}
                style={styles.drawrIcons}
              />

              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('TransactionHistory')}>
                Payment History
              </Text>
            </View>

          
          
          </View>
        </View> */}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
 
});