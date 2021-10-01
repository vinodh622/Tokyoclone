import React ,{useState} from 'react';
import {ActivityIndicator,StyleSheet,Text,View,Modal} from "react-native";
import {COLORS} from './Styles/colors';

const ActivityIndi = () => {

    const[modalActivityVisible,setActivityModalVisible] = useState(true);

    return(
        <View>
        <Modal
         animationType='none'
         transparent={true}
         visible={modalActivityVisible}
        >
        <View style={{flex:1 ,justifyContent:'center',backgroundColor: 'transparent' }}>
            <ActivityIndicator size='large'
            color={COLORS.black_100}/>
        </View>
        </Modal>
        </View>

    );
};

export  default ActivityIndi;
