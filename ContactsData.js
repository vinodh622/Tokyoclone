import React,{useEffect,useState} from "react";
import {View,StyleSheet,TouchableOpacity,FlatList,backgroundColor,Text,Platform,PermissionsAndroid,SafeAreaView, StatusBar,TextInput,Share,Linking,Image} from "react-native";
import Contacts from 'react-native-contacts';
import { StylesAll } from "./commanStyle/objectStyle";

import { COLORS } from "./Styles/colors";
  
 
const  ContactsData = ({navigation,route}) => {

  const [searchPlaceholder,setSearchPlaceholder] = ("Search")

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
 
  const [searchData,setSearchData]  = useState('')
  const [query, setQuery] = useState('');
  const [contactData,setContactData] = useState([]);
  const [data, setData] = useState([]);
  /*
    let text = e.toLowerCase();
      let trucks =   mainContactData;
  
      // search by food truck name
      let filteredName = trucks.filter((truck) => {
        return truck.givenName.toLowerCase().match(text); 
      });

      if (e.count == 0){
        console.log('count zero');
      }else{
        console.log('count one');
      }
      setContactData(filteredName);
      console.log('filteredNamefilteredNamefilteredName',filteredName);
      */

  
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    let trucks =   contactData;
    const filteredData = trucks.filter(user => {
      return  user.givenName?.toLowerCase().match(formattedQuery); 
    });
    setData(filteredData);
    setQuery(text);
  };

  function renderHeader() {
    return (

    <View style={{backgroundColor:COLORS.app_bgtheme,flex:1}}>

      <View
        style={{
          backgroundColor: 'lightgray',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={[{ backgroundColor: 'lightgray', paddingHorizontal: 20 },StylesAll.boldFont]}
        />
      </View>
        <Text style={[{paddingTop: 10,paddingBottom: 5},StylesAll.boldFont]}>All Contacts</Text>
       </View>
    );
  }

  const searchText = (e) => {
 
      let text = e.toLowerCase();
      let trucks =   mainContactData;
  
      // search by food truck name
      let filteredName = trucks.filter((truck) => {
        return truck.givenName.toLowerCase().match(text); 
      });

      if (e.count == 0){
        console.log('count zero');
      }else{
        console.log('count one');
      }
      setContactData(filteredName);
      console.log('filteredNamefilteredNamefilteredName',filteredName);
  }

  const loadContacts= () =>{
    Contacts.getAll()
      .then(contacts => {
        setData(contacts)
        setContactData(contacts);
        console.log('contactscontactscontacts',contacts);

        //this.setState({ contacts, loading: false });
      })
      .catch(e => {
        //this.setState({ loading: false });
      });

    Contacts.getCount().then(count => {
      //this.setState({ searchPlaceholder: `Search ${count} contacts` });
    });

    Contacts.checkPermission();
  }

 

  useEffect(() => {
 
    if (Platform.OS == 'ios') {
  
      loadContacts();
    
      }else if (Platform.OS == 'android'){
        console.log('android');
  
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: "Contacts",
          message: "This app would like to view your contacts.",
          buttonPositive: 'Please accept bare mortal'
        }).then(() => {
          
          loadContacts();
        });
   
      }
   }, [])

  

  const renderItem = ({ item }) => {
    return(
     <View style={styles.item}>
 
     <View style={{flexDirection:'column'}}>
     <Text style={[styles.title,{paddingBottom: 10,fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 14}]}>{item.givenName+ " " +item.familyName }</Text>
            {item.phoneNumbers.map(phone => (
         <Text style={styles.phones,StylesAll.boldFontLight,COLORS.grey_200}>{phone.number}</Text>
               ))}
      </View>
      
     <View style={{backgroundColor:COLORS.app_browntheme,borderRadius:50,paddingHorizontal:10}}>
     <TouchableOpacity onPress={() =>{
              
             console.log('item.phoneNumbersitem.phoneNumbers',item.phoneNumbers);

             Linking.openURL(
              `sms:${(item.phoneNumbers.length == 0)  ? '' : item.phoneNumbers[0].number }${
                Platform.OS === 'ios' ? '&' : '?'
              }body=${`Get free vouchers off for Tokyo Secret!. Signup and use my code ${route?.params.code} and get discount on your orders. Download Tokyo Secret at http://onelink.to/vwzfbt`}`,
            )
      

     }}>
     <Text style={[{padding:6,color:'white',fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 14}]}> Invite</Text>
     </TouchableOpacity>
 
     </View>
      
   </View>
    );
  
     
    };

 
  return (

    <View style={{flex: 1, flexDirection: 'column',padding: 30,backgroundColor:'#fafbfb'}}>
    <StatusBar barStyle="dark-content" backgroundColor="#fafbfb"></StatusBar>
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>

    <View style={{marginBottom:44}}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<View style={[StylesAll.commonHeader ,{paddingHorizontal:0 ,paddingTop:0}]}>
<Image source={require('./Image/back.png')}  resizeMode="contain"  style={StylesAll.headArrow}/>
 
</View>
</TouchableOpacity>

</View>


    <Text style={[{marginBottom:10, fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 20,color:'#333333'}]}>Search for contacts</Text>
    <View style={{backgroundColor:COLORS.app_bgtheme,marginBottom:10}}>
 
  <TextInput
    autoCapitalize="none"
    autoCorrect={false}
    clearButtonMode="always"
    value={query}
    onChangeText={queryText => handleSearch(queryText)}
    placeholder="Enter Name"
    style={[{ backgroundColor: COLORS.profile_list_bg, paddingHorizontal: 20,height:45 ,borderRadius: 30,marginVertical:20,fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 15},]}
  />
 
  <Text style={[{paddingTop: 10,paddingBottom: 5,fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 18}]}>All Contacts</Text>

 </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        //ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        //stickyHeaderIndices={[0]}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() =>{
        onShare()
      }}>
      <View style={{backgroundColor: COLORS.app_browntheme,margin:20,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
      <Text style={[{paddingHorizontal:20,paddingVertical:10,color:'#fff',fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 17}]}> SUBMIT </Text>
      </View>
      </TouchableOpacity>
     
    </SafeAreaView>
    </View>
  );
 

};
export default ContactsData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
 
    marginVertical: 10,
 
  },
  title: {
    fontSize: 15,
  },
});

