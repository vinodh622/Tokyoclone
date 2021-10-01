
import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import {COLORS} from '../Styles/colors';

 export const StylesAll = StyleSheet.create({  


  errorSnackbar: {
    backgroundColor: '#C02925',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

    main_Title: {
        fontFamily: 'SFCompactDisplay-Bold',
        color: '#343434',
        fontSize: 25,
        letterSpacing: 1,
        marginBottom: 10,
      },

      commonHeader:{
                    flexDirection:"row",
                    alignItems:"center",
                    paddingTop:20
                    },

                    commonHeader1:{paddingHorizontal:10,
                      flexDirection:"row",
                      alignItems:"center",
                      paddingTop:20
                      },

      commonWrapper: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: '#fafbfb',
        flex: 1,
        flexDirection: 'column',
      },
      headTitle:{fontSize:22,color:'#313131' ,fontFamily: 'SFCompactDisplay-Bold' , marginLeft:10 ,letterSpacing:0.9},
      numberTitle:{fontSize:18,color:'#313131' ,fontFamily: 'SFCompactDisplay-Bold'},
      amountUnSelect:{flex:1,justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:COLORS.grey_line},
      amountSelect:{flex:1,justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:COLORS.app_browntheme},

      headArrow:{width:25 ,height:25},
      headWrapper:{
        paddingHorizontal: 3,
        flexDirection:"row" ,
        alignContent:"center",
      },
    
      field_Box: {
        marginTop: 40,
        paddingHorizontal: 30,
        flexDirection: 'column',
      },
    
      inputFieldBox: {
        height: 45,
        borderColor:"#cccccc",
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
      },


       
      inputwrap1: {flex: 0.1},
    
      inputwrap2: {flex: 1,paddingHorizontal:10,fontFamily:'SFCompactDisplay-Medium'},
    
      commonButton: {
        backgroundColor: '#9A7527',
        borderRadius: 20,
       paddingHorizontal:40,
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:13
      },
      commonButton1: {
        backgroundColor: '#9A7527',
        borderRadius: 50,
        paddingHorizontal:40,
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:13
      },

      commonButtondisabled:{
        backgroundColor: '#D3C5A0',
        borderRadius: 20,
        paddingHorizontal:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:13
      },
      btnText: {color: '#fff', fontFamily: 'SFCompactDisplay-Medium',fontSize:16},
    
      btnText1: {color: '#fff', fontFamily: 'SFCompactDisplay-Bold',},
    

      ltguestWrapper: {
        flexDirection: 'column',
        marginTop: 20,
      },
    
      fbButton: {
        backgroundColor: '#2874f0',
        paddingHorizontal: 10, 
        paddingVertical: 11,
        borderRadius: 50, flexDirection:"row" ,justifyContent:"center" ,alignItems:"center",
      },
      googleButton: {
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
       
        borderColor: '#2874f0',
        paddingVertical: 11,
        marginHorizontal: 5,flexDirection:"row" ,justifyContent:"center" ,alignItems:"center"
      },

      appleButton: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: '100%',
        borderRadius: 50,
        marginTop: 20, 
        width: '100%', flexDirection:"row" ,justifyContent:"center" ,alignItems:"center"
        },
    
      line1: {borderWidth: 1  , borderColor: '#F3F4F4', width: '45%', height: 1},
    
      qrBox: {
        backgroundColor: '#fff',
        padding: 40, 
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
    
      qrbottomBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#9A7527',
        padding: 20, paddingHorizontal:33,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
      },
    
      listBox: {
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
      },
    
      listBoxlayer: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#000000a1',
        width: '100%',
        height: '100%',
        right: 0,
        left: 0,
      },
      productLists: {
        flexDirection: 'row',
        width: '100%',
        height: 145,
        backgroundColor: '#fff',
        paddingVertical: 20,paddingHorizontal:13,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    
      md_Title: {color: '#333333', fontFamily: 'SFCompactDisplay-Medium',fontSize : 18  },
      md_Title12: {color: '#5A5A5A', fontFamily: 'SFCompactDisplay-Medium',fontSize : 12 },
      md_Title11: {color: '#333333', fontFamily: 'SFCompactDisplay-Medium',fontSize : 14 },
      md_Title1: {color: '#000', fontFamily: 'SFCompactDisplay-Medium' ,fontSize : 20},
    
      rewardLists: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
       
    
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
      },
    
      imageStyle: {width: '100%', height: '100%'},
    
      sm_Button: {
        backgroundColor: COLORS.app_browntheme,
        paddingHorizontal: 12,
        borderRadius: 20,
        paddingVertical: 8,
      },

      sm_Button1: {
        backgroundColor: COLORS.grey_200,
        paddingHorizontal: 12,
        borderRadius: 20,
        paddingVertical: 8,
      },
    
      historyLists: {
        flexDirection: 'column',
        borderBottomWidth: 3,
        marginBottom: 25,
        borderBottomColor: '#F3F4F4',
      },
    
      hs_row_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
      },
    
      hs_Amount: {fontFamily: 'SFCompactDisplay-Bold', fontSize: 14},
    
      payId: {fontFamily: 'SFCompactDisplay-Bold', color: '#9C9C9C', fontSize: 14},
    
      commom_color: {color: '#333333', fontFamily: 'SFCompactDisplay-Light',fontSize: 15},
    
      common_successBtn: {
        backgroundColor: '#333333',
        paddingHorizontal: 19,
        paddingVertical: 6,
        borderRadius: 20,
      },
    
      Wallet_layer1:{backgroundColor:"#fff" ,paddingVertical:30 ,paddingHorizontal:25,
      borderBottomWidth:3 ,   borderBottomColor: '#F3F4F4',},
    
      wl_ammount:{fontFamily: 'SFCompactDisplay-Medium',
      fontSize : 22,color:"#9A7527"},


      listButton: {
        flex: 1,
        backgroundColor: '#9A7527',
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
      },
    
      btnIcons: {
        width: 15,
        height: 15,
        marginRight: 10,
      },
    
      memberStatus: {
        backgroundColor: '#9A7527',
        padding: 7,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        position: 'relative', paddingLeft:60
       
      },
    
      flexWtrapper: {flex: 1},
      whitecolor: {
        color: '#fff',
      },
      boldFont: {
        fontFamily: 'SFCompactDisplay-Bold',
      },

       flexScreen:{flex:1 ,
       flexDirection:"column",
       backgroundColor:"#fafbfb"
       },
      
        innerWrapper:{paddingHorizontal:30 ,
        paddingVertical:20 ,
        flex:1 ,
        flexDirection:"column"},

        common_Modal:{flex:1 ,flexDirection:"column" ,backgroundColor:"#000000a3" ,padding:30 }, 
        common_Modal1:{flex:1 ,flexDirection:"column" ,backgroundColor:"#fff" ,padding:30 }, 
        modalBox:{  backgroundColor:"#fff" ,paddingVertical:30 ,paddingHorizontal:20 ,borderRadius:15},
        redeemQrbox:{backgroundColor:"#fff" ,padding:20 ,width:240 ,height:240},
        inputBox:{borderWidth:1 ,borderColor:"#cccccc" ,borderRadius:50 ,height:45  ,paddingHorizontal:15,marginBottom:15},
        inputBox1:{borderWidth:1 ,borderColor:"#cccccc" ,borderRadius:50 ,height:45  ,paddingHorizontal:15,marginBottom:5,fontFamily:'SFCompactDisplay-Medium'},
        mediumBtn:{minWidth:120 ,borderRadius:50,padding:12},
        mediumBtn1:{borderRadius:30,padding:5,marginLeft:5},

        cancelBtn:{
          backgroundColor:"#CCCCCC" ,
          
          },
          viewBtn:{
            backgroundColor: '#9A7527' 
          
          },
          ltcancelbtn:{
            backgroundColor: '#CCCCCC',
            borderRadius: 50,
            paddingVertical: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          },
        
    iosTop: {
        backgroundColor:  '#EFCB38',
        paddingTop: 50,
        paddingBottom:10,
        textAlign: 'center',
        color:'#fff',
        fontFamily: 'SFCompactDisplay-Bold',
        fontSize: 20,
   },
   androidTop: { 
       backgroundColor:  '#EFCB38',
       padding: 10,
       textAlign: 'center',
       color:'#fff',
       fontFamily: 'SFCompactDisplay-Bold',
       fontSize: 20,
   },
   lightFont: {
       fontFamily: 'SFCompactDisplay-Light',
       fontSize : 15,
   },
   mediamFont: {
       fontFamily: 'SFCompactDisplay-Medium',
       fontSize : 14,
   },

   VerylightFont: {
    fontFamily: 'SFCompactDisplay-Light',
    fontSize : 12,
},

   lightmediamFont: {
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 10,
   
},


   boldFont: {
       fontFamily: 'SFCompactDisplay-Bold',
       fontSize : 15,
   },

   boldFontNew1: {
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 8,
},
boldFontNew11: {
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 10,
},


   boldFontNew: {
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 9,
},

   boldFont11: {
    fontFamily: 'SFCompactDisplay-Bold',
    fontSize : 13,
},

 
   boldFont2: {
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 18,
},

boldFont3: {
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 20,
},

boldFontLight2: {
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize : 15,
  },


   boldFontLight: {
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize : 12,
    },

    boldFontLight1: {
      fontFamily: 'SFCompactDisplay-Medium',
      fontSize : 10,
      },

    LoginBoldFont2: {
      fontFamily: 'SFCompactDisplay-Bold',
      fontSize : 12,
  },
  
  LoginBoldFont3: {
    fontFamily: 'SFCompactDisplay-Bold',
    fontSize : 14,
},
   LoginBoldFont: {
    fontFamily: 'SFCompactDisplay-Bold',
    fontSize : 22,
},

modelBG:{backgroundColor:"#3B3B3B7F" ,flex:1 ,width:"100%" ,height:"100%" ,paddingHorizontal:20 ,paddingVertical:30 },

roundedPtsec:{flexDirection:"row" ,marginBottom:15 ,},

boldround:{marginRight:7 },

 alertMsg: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
     marginTop: Dimensions.get('window').height/2.7,
     alignContent:'center',
 },

 alertMsg1: {
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
   marginTop: Dimensions.get('window').height/3.2,
   alignContent:'center',
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
},
headWrapper:{
  paddingHorizontal: 20,
flexDirection:"row" ,alignContent:"center",
 
 
},
btm_Menu:{fontSize:14 ,   fontFamily: 'SFCompactDisplay-Medium'}

});


 
 