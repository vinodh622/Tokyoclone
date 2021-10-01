import React, { Component } from "react";
import { AppRegistry, StyleSheet, SectionList, Text, View,Constants,Button } from "react-native";
import ActivityIndi from './ActivityIndi';
 
 

// import { StylesAll } from "./commanStyle/objectStyle";
// export default class DepartmentSection extends Component {


  
// constructor(props) {
//     super(props)

//     this.state = {
//         categoryProduct:[],
//         isLoadingList : true,

//         data : [
//           {
//             title: "Main dishes",
//             data: ["Pizza", "Burger", "Risotto"]
//           },
//           {
//             title: "Sides",
//             data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//           },
//           {
//             title: "Drinks",
//             data: ["Water", "Coke", "Beer"]
//           },
//           {
//             title: "Desserts",
//             data: ["Cheese Cake", "Ice Cream"]
//           }
//         ]
//     }
// }

//     componentDidMount(){
 
//       let abort = new AbortController();
  
//       var form = new FormData();
//        form.append('cateid','2');
  
//       fetch(
//         'http://tokyo.shiftlogics.com/api/product/betaproduct',
//         {
//           method: 'POST',
//           headers: new Headers({
//              Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//           }),
//           body: form,
//         },
//         {signal: abort.signal},
//       )
//         .then((response) => response.json())
  
//         .then((data) => {
//           if (data.status === 'success') { 
//             this.setState({categoryProduct:data.data});

//             this.setState({isLoadingList:false})

//     // this.state.categoryProduct.map((eee)=>{

       
//     //     this.state.data.push({
//     //         title:   eee.cateName,
//     //         [data]: eee.product,
//     //     });

//     // })
//          console.log('mathan',this.state.categoryProduct);



//           } else {
            
//           }
//         })
//         .catch((e) => console.log(e));
//       return () => {
//         abort.abort();
//       };

 
//     }


// gh=()=>{

// this.setState({gud:tr})

// }


// render() {
// return (
// <View style={styles.containerStle}>
// <SectionList
// sections={this.state.data}
// renderItem={({ item }) => (
// <Text style={styles.itemStyle}>{item}</Text>
// )}
// renderSectionHeader={({ section }) => (
// <Text style={styles.sectionHeaderStyle}>{section.title}</Text>
// )}
// keyExtractor={(employee, position) => position}
// />
// <View>{this.state.isLoadingList ? <ActivityIndi/>:<View></View> }</View>
// </View>
// );
// }
// }
// const styles = StyleSheet.create({
// containerStyle: {
// backgroundColor: "green",
// flex: 1
// },
// sectionHeaderStyle: {
// paddingTop: 2,
// paddingLeft: 10,
// paddingRight: 10,
// paddingBottom: 2,
// fontSize: 22,
 
// color: "#fff",
// backgroundColor: "#8fb1aa"
// },
// itemStyle: {
// padding: 10,
// fontSize: 18,
// height: 44
// }
// });
// registering our department class and if we are using create react then we should skip this step
//AppRegistry.registerComponent("AwesomeProject", () => DepartmentSection);




const ITEM_HEIGHT = 100;
const SECTIONS = [];

//   {title1:'section 1', data: [{title: 'row 1'}, {title: 'row 2'}]},
//   {title1:'section 2', data: [{title: 'row 1'}, {title: 'row 2'}]},
//   {title1:'section 3', data: [{title: 'row 1'}, {title: 'row 2'}]},
//   {title1:'section 4', data: [{title: 'row 1'}, {title: 'row 2'}]},
   
// ];
  
export default class DepartmentSection extends Component {

constructor(props) {
  super(props)

  this.state = {
    SECTIONS:{}
  }
}







  
  scrollToSection = (index) => {
     
    console.log('scrollToSectionscrollToSection')
    this.sectionListRef.scrollToLocation({
      animated: true,
      sectionIndex: index - 1,
      itemIndex: 0,
      viewPosition: 0
    });
  };
  
  componentDidMount() {
    console.log('component mounted');
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
      
            
            
             data.data.map((eeee) => {
              console.log('eeeeeeeeeeeeeeeea',eeee);

              var dict1 = {};
              var dict2 = {};
              dict1["data"] =  
              dict2["title"] = "1";
              const arrV = [dict1,dict2]
              
              var dict = {};
              dict['data'] =  eeee.product
              dict['title'] = eeee.subName
              
              console.log('eeee.product eeee.product eeee.product',eeee.product)
 
              this.setState(()=>{
                SECTIONS.push(dict)
                console.log('SECTIONSSECTIONS',SECTIONS);
              }

             

               )
             })
             
               
          } 
          
          else {
           
          }
        })
        .catch((e) => console.log(e));
      return () => {
        abort.abort();
      };

}


  // getItemLayout = (data, index) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  // });
  
  
  render() {
    return (
      <View style={styles.container}>
        <Button 
          onPress={()=>this.scrollToSection(3)} 
          title="scroll" 
        />
        <SectionList
          style={styles.sectionList}
          sections={SECTIONS}
           ref={ref => (this.sectionListRef = ref)}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          //getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
  
  renderSectionHeader = ({section}) => (
    <View style={styles.header}>
      <Text>{section.title}</Text>
    </View>
  );
  
  renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:  40,
  },
  sectionList: {
    flex: 1,
    padding: 10
  },
  header: {
    height: ITEM_HEIGHT,
  },
  item: {
    height: ITEM_HEIGHT,
  },
});

