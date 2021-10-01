import { StyleSheet } from 'react-native';
import {COLORS} from './Styles/colors';


export const styles = StyleSheet.create({

  main_Title: {
    fontFamily: 'Roboto-Bold',
    color: '#000',
    fontSize: 25,
    letterSpacing: 1,
    marginBottom: 20,
  },

  commonWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#fafbfb',
    flex: 1,
    flexDirection: 'column',
  },

  field_Box: {
    marginTop: 60,
    flexDirection: 'column',
  },

  inputFieldBox: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  inputwrap1: {flex: 0.2},

  inputwrap2: {flex: 1},

  commonButton: {
    backgroundColor: '#9A7527',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  btnText: {color: '#fff', fontFamily: 'Roboto-Medium'},

  ltguestWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  fbButton: {
    backgroundColor: '#2874f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  },
  googleButton: {
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: '#2874f0',
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  line1: {borderWidth: 1, borderColor: '#000', width: '45%', height: 1},

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
    padding: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },

  listBox: {
    position: 'relative',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },

  listBoxlayer: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000000a3',
    width: '100%',
    height: '100%',
    right: 0,
    left: 0,
  },
  productLists: {
    flexDirection: 'row',
    width: '100%',
    height: 180,
    backgroundColor: '#fff',
    padding: 20,
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

  md_Title: {color: '#000', fontFamily: 'Roboto-Bold'},

  rewardLists: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    elevation: 24,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
  },

  imageStyle: {width: '100%', height: '100%'},

  sm_Button: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 10,
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

  hs_Amount: {fontFamily: 'Roboto-Bold', fontSize: 16},

  payId: {fontFamily: 'Roboto-Bold', color: '#9C9C9C', fontSize: 16},

  commom_color: {color: '#9C9C9C', fontFamily: 'Roboto-Medium'},

  common_successBtn: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 19,
    paddingVertical: 6,
    borderRadius: 20,
  },

  Wallet_layer1:{backgroundColor:"#fff" ,paddingVertical:50 ,paddingHorizontal:30,
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.00,
  
  elevation: 1, borderBottomWidth:3 ,   borderBottomColor: '#F3F4F4',},

  wl_ammount:
  {fontSize:22 ,fontFamily:"Roboto-Bold" ,color:"#9A7527"

},

    mainContainer:{
        flex:1
    },
    logoSos:{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor:COLORS.yellow,
        justifyContent: 'center'
    },
    logoSosDash:{
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor:COLORS.yellow,
      justifyContent: 'center'
  },
  logoSos40:{
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor:COLORS.yellow,
    justifyContent: 'center'
},
    backBtn:{
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor:COLORS.grey,
        justifyContent: 'center',
        margin:10,
        alignItems:'center',
    },

    //Text_Style//
    textBold:{
        backgroundColor:COLORS.yellow,
        justifyContent: 'center'
    },

    //Button//
    appButtonText: {
        fontSize: 12,
        color: COLORS.white,
        fontWeight: "bold",
        alignSelf: "center",
      },

      buttonBlack: {
        elevation: 8,
        backgroundColor: COLORS.black_100,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom:20,
        marginLeft:15,
        marginRight:15,
        marginTop:20
      },
 
      textInputContainer: {
        marginBottom: 10,
        justifyContent:'center',
      },

      roundedTextInput: {
          height:45,
          width:45,
        borderRadius: 10,
        borderWidth: 4,
        elevation: 1,
        backgroundColor:COLORS.white,
      },

      //overlay//
      overlay_Orange: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 142, 29,0.7)',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
      },

      overlay_Violet: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(127, 29, 255,0.7)',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
      }
})