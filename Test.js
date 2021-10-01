///====== Import Statements ===== //

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
 
import {Formik} from 'formik';
import * as yup from 'yup';


///====== Import Statements ===== //

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

//===== ValidationSchema ===== //

const SignupSchema = yup.object({
  merchantid: yup.string().required('Required'),
  password: yup.string().required('Required').min(8, 'It must be 8 Characters'),
});

//===== ValidationSchema ===== //

export default function Test() {
  //======== Fuction  ====== //

  //Initail state of app ===== //
  const [loading, setLoading] = useState(false);
  const [splash, setSplash] = useState(true);
  //Initail state of app ===== //

  //===Getting Login Details via Store =====//
 //const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  //const LoginStatus = useSelector((state) => state.loginDetails);
  //const {status, getErrorMesage} = LoginStatus;
  //===Getting Login Details via Store =====//

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);

    return () => {
      //test
      clearInterval(() => {
        setSplash(true);
        //setSendData(false);
      });
    };
  }, [   ]);

  return (
    <>
      {splash ? (
        <View  >
          <ActivityIndicator size={70} color="#EFCB38" />
        </View>
      ) : (
        <View style={{marginTop:80}} >
          <StatusBar
            backgroundColor="#EFCB38"
            barStyle="dark-content"
            networkActivityIndicatorVisible={true}
          />
          <View >
         
          </View>

          <View >
            <Text  >Hello,Merchant</Text>

            <View  >
              <Formik
                initialValues={{
                  merchantid: '',
                  password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                //   setLoading(true);
                //   dispatch(Ltout(purgeStoredState));
                //   await dispatch(loginAction(values)).then(() => {
                //     setLoading(false);



                //   });


                    console.log('value',values);


                }}>
                {(props) => (
                  <View>
                    <View>
                      <View  >
                        <TextInput
                     
                          placeholder="Merchant ID"
                          placeholderTextColor="#957C1F"
                          onChangeText={props.handleChange('merchantid')}
                          value={props.values.merchantid}
                        />
                        
                      </View>

                      <Text  >
                        {props.touched.merchantid && props.errors.merchantid}
                      </Text>
                    </View>

                    <View>
                      <View  >
                        <TextInput
                           placeholder="Password"
                          secureTextEntry={true}
                          placeholderTextColor="#957C1F"
                          onChangeText={props.handleChange('password')}
                          value={props.values.password}
                        />
                        
                      </View>
                      <Text >
                        {props.touched.password && props.errors.password}
                      </Text>
                    </View>

                    <View  >
                      <TouchableOpacity onPress={props.handleSubmit}>
                        <View style={global.loginButton}>
                          <Text style={global.btnText}>Log In</Text>
                          <Text style={{marginLeft: 20}}>
                            {loading ? (
                              <ActivityIndicator size="small" color="#F8DB65" />
                            ) : (
                              ''
                            )}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -90,
                right: 0,
                left: 0,
              }}>
             
            </View>

           
          </View>
        </View>
      )}
    </>
  );
}