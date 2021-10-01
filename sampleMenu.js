 
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList
} from 'react-native';

const SampleMenu = (navigation) => {

  const [scrollToIndex, setScrollToIndex] = useState(0);
 
  const [ref, setRef] = useState(null);
  const  [selectFlateList ,setSelectFlateList] =  useState(0);
  const [CategoryProduct , setCategoryProduct] = useState([])


  const [selectedId, setSelectedId] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCords, setDataSourceCords] = useState([]);
 // useEffect(() => {

    useEffect(() => {
 
       
          let abort = new AbortController();
      
          var form = new FormData();
           form.append('cateid',3);
      
          fetch(
            'http://sos.shiftlogics.com/api/product/betaproduct',
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
    
                console.log('data.datadata.datadata.datadata.datadata.data',data.data);
                setCategoryProduct(data.data);
                setDataSource(data.data);
                 
              } else {
                
              }
            })
            .catch((e) => console.log(e));
          return () => {
            abort.abort();
          };
         
        }, [ ]);



//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson);
//         setDataSource(responseJson);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      return (
        <Item
          item={item.cateName}
          onPress={() => setSelectedId(item.cateName)}
          style={{ backgroundColor }}

        />
      );
    };

  const scrollHandler = (index) => {

    console.log('indexindexindex',index);

    console.log(dataSourceCords.length, index);
    if (dataSourceCords.length > index) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[index - 1],
        animated: true,
      });
    }else if (dataSourceCords.length == index){
        ref.scrollTo({
            x: 0,
            y: dataSourceCords[index - 1],
            animated: true,
          });
    } else {
      alert('Out of Max Index');
    }
  };

  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          console.log(dataSourceCords);
          console.log('height:', layout.height);
          console.log('width:', layout.width);
          console.log('x:', layout.x);
          console.log('y:', layout.y);
        }}>
       <TouchableOpacity onPress={() => scrollHandler(key + 1)}>
       <View style={styles.itemStyle} >
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      <View>
      <Text style={{ textAlign: 'center'}}>{item.subName}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
 
{item.product.map((eee)=>{
    return (
        <View style={styles.carsection}>
        {eee.image.map((ee) =>{
     return(
          <Image 
            source={{ uri:`https://shiftlogics.com/Tokyo/${ee.image}` }}
                      resizeMode= 'center'
                     
                      style={{width: 100,height: 100,borderRadius: 20}}
             />
          ) 
       })
   }  


  <View style={{ height: 90, flex:2,padding:10,flexDirection : 'column',justifyContent: 'space-between'}}>
 
  <Text style={{}} numberOfLines= {1} ellipsizeMode= "tail">{eee.productName}</Text>

  <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>

  <Text>RM {eee.sellingPrice}</Text>
 
  </View>

  </View>

  </View>
)
})}
 
        </View>
          
         </TouchableOpacity>

        <ItemSeparatorView />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (

         <SafeAreaView style={{ flex: 1 }}>
         <View style={{flex:1,flexDirection:'row',backgroundColor: 'white'}}>

         <View style={{flex:0.40}}>
         <FlatList
         data={CategoryProduct}
         keyExtractor={(item) => item.id}
         renderItem={({ item, index }) => 
        <TouchableOpacity onPress={() =>{
        setSelectFlateList(item.id);
         scrollHandler(index + 1)
        console.log('id value',item.id);
         console.log("current index is " + index)
         }}>
        <View style={{position:'relative',height: 60,justifyContent:'center'}}>
        <Text style={{padding:10,textAlign:'center'}}>{item.subName}</Text>\
        {selectFlateList === item.id ? 
         <View style={{position:'absolute',width:5,height:'100%',backgroundColor:'red'}}></View> : <View/>
         }
        </View>
        </TouchableOpacity>
        }
        extraData={selectedId}
        />
        </View>

        <View style={styles.container}>
        <ScrollView 
        style={{backgroundColor: 'red',flex:1}}
          ref={(ref) => {
            setRef(ref);
          }}>
          {dataSource.map(ItemView)}
        </ScrollView>
         </View>

        </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1
  },
  itemStyle: {
    padding: 10, 
    flexDirection:"column"
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
  },
  
});

export default SampleMenu;
