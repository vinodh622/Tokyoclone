import {LOGIN_FAIL, LOGIN_REQ, LOGIN_RESPONSE, LOG_OUT,LOGIN_PHONE,LOGIN_SOCIAL,LOGIN_SOCIAL_GOOGLE,LOGIN_SOCIAL_APPLE} from './Constants';
import {
  Alert} from "react-native";
  
 import {pushAction} from '../PushAction';


export const loginAction = (values, code, load) => async (dispatch) => {
  try {
    var form = new FormData();
    form.append('phone',code+values.phoneNumber)
    await fetch("http://sos.shiftlogics.com/api/user/loginphone", {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch({type: LOGIN_RESPONSE, payload: data});
      });
  } catch (error) {
      dispatch({type: LOGIN_FAIL});
  }
};

export const loginSocialAction = (idValue,name,email,navigation,notificationValues) => async(dispatch,myData) => {
  let abort = new AbortController();
   var form = new FormData();
    form.append('fb_id',idValue),
    form.append('name',name),
    form.append('email',email),
    form.append('dob',""),
  
   fetch(
          'http://sos.shiftlogics.com/api/user/loginfb',
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
 
            Alert.alert(
              data.status,
              "",
              [
                { text: "OK", onPress: () => {
                  let uniqueToken= data.data.token

                  if (data.status === 'success')  {
                  if (data.data.phone_verified == "0"){
                    navigation.navigate('loginWithPhone',{loginData : data.data});
                  }else{
                    pushAction(uniqueToken,notificationValues.tok,notificationValues.os,"user")
                    dispatch({type: LOGIN_SOCIAL, payload: data});
                    navigation.navigate('Home');
                    console.log("phone verified0");
                  }
                }
                } }
              ],
              { cancelable: false }
               );


              })
              .catch((e) => {
                dispatch({type: LOGIN_FAIL});
               console.log(e);   
              })
              return () => {
              abort.abort();
              };
}
 
export const loginSocialAppleAction = (idValue,name,email,navigation,notificationValues) => async(dispatch) => {
 
  let abort = new AbortController();
  var form = new FormData();
  form.append('apple_id',idValue),
  form.append('name',name),
  form.append('email',email),
  form.append('dob',""),
 
       fetch(
          'http://sos.shiftlogics.com/api/user/loginapple',
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
        
                Alert.alert(
                  data.status,
                  "",
                  [
                    { text: "OK", onPress: () => {
                      if (data.status === 'success')  {

                        let uniqueToken= data.data.token

                      if (data.data.phone_verified == "0"){
                        navigation.navigate('loginWithPhone',{loginData : data.data});
                      }else{
                        dispatch({type: LOGIN_SOCIAL_APPLE, payload: data});

                        console.log("Phone verification 1111")
                        console.log('uniqueTokenuniqueToken',uniqueToken);
                        console.log('notificationValues.tok',notificationValues.tok);
                        console.log('notificationValues.os',notificationValues.os);

                        pushAction(uniqueToken,notificationValues.tok,notificationValues.os,"user")
                        navigation.navigate('Home');
                      }
                    }
                    } }
                  ],
                  { cancelable: false }
                );
                

              })
              .catch((e) => {
                dispatch({type: LOGIN_FAIL});
               console.log(e);   
              })
              return () => {
              abort.abort();
            };
}


export const loginSocialGoogleAction = (idValue,name,email,navigation,notificationValues) => async(dispatch) => {

  console.log("funcation");
  let abort = new AbortController();
  var form = new FormData();
  form.append('google_id',idValue),
  form.append('email',email),
  form.append('name',name),
  form.append('dob',""),


  console.log("formformformform",form);

       fetch(
          'http://sos.shiftlogics.com/api/user/logingoogle',
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
           
       console.log('datadatadata google',data);

            Alert.alert(
              data.status,
              "",
              [
                { text: "OK", onPress: () => {
                   
              if (data.status === 'success')  {

                let uniqueToken= data.data.token
 
                if (data.data.phone_verified == "0"){
                  navigation.navigate('loginWithPhone',{loginData : data.data});
                }else{
                  pushAction(uniqueToken,notificationValues.tok,notificationValues.os,"user")
                  dispatch({type: LOGIN_SOCIAL_GOOGLE, payload: data});
                  navigation.navigate('Home');
                  console.log("phone verified0");
                }
               }
                } }
              ],
              { cancelable: false }
               );
              })
              .catch((e) => {
                dispatch({type: LOGIN_FAIL});
               console.log(e);   
              })
              return () => {
              abort.abort();
            };
}


 
export const loginPhoneAction = (apiToken, otpData, phone,apiURL,navigation,notificationValues) => async (dispatch) => {

  console.log('mathan api loading...')
 console.log('apiToken',apiToken);
 console.log('otpData',otpData);
 console.log('phone',phone);
 console.log('apiURL',apiURL);
 
 try {
   var form = new FormData();
   form.append('api_token',apiToken),
        form.append('otp', otpData),
        form.append('phone', phone),

        console.log('formformformform',form)
   
   await fetch(apiURL, {
     method: 'POST',
     headers: new Headers({
       Accept: 'application/json',
       'Content-Type': 'multipart/form-data',
     }),
     body: form,
   })
     .then((response) => response.json())
     .then((data) => {

      console.log('datadatadatadatadatadatadata matan',data)

       Alert.alert(
        data.status,
        "",
        [
          { text: "OK", onPress: () => {
            
            if (data.status === 'success')  {
              let uniqueToken= data.data.token
              dispatch({type: LOGIN_PHONE, payload: data});
              pushAction(uniqueToken,notificationValues.tok,notificationValues.os,"user")
              navigation.navigate('Home');
            }else{

            }

          } 
         }
        ],
        { cancelable: false }
      );

     });
 } catch (error) {
     dispatch({type: LOGIN_FAIL});
 }
};

 


export const Ltout = () => async (dispatch) => {
  try {
    dispatch({type: LOG_OUT});
  } catch (error) {
    console.log(error);
  }
};