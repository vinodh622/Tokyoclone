//import {boolean} from 'yup';
import {
  LOGIN_RESPONSE,
  LOGIN_PHONE,
  LOGIN_SOCIAL,
  LOGIN_SOCIAL_GOOGLE,
  LOG_OUT,
  LOGIN_SOCIAL_APPLE
} from '../actions/Constants';



function loginReducer(
  state = {
    loginData: null,
    token: '',
    status: null,
    getErrorMesage: '',
  },
  action,
) {
  switch (action.type) {

    case LOGIN_RESPONSE:

      let jsonData = action.payload;

      let extractToken = jsonData.data.token;

      let extractStatus = jsonData.status;

      let extractData = jsonData.data;

      console.log(extractStatus)

      console.log('jsonDatajsonDatajsonData',extractData);

      return {
         token: extractToken,
         status: extractStatus,
         loginData : extractData,
        //loadSpinner: false,
      };

      /*
{"data": "Invalid otp", "status": "failure", "statuscode": "3"}

{"data": {"email": "mathanbeme@gmail.com", "email_verified": 1, "id": 2, "name": "Mathan Narayanaperumal", "phone": "919994029677", "phone_verified": 1, "token": "JcG05UxMLXDo6tscJhH8QkaHlcTBucgNc8fDUws0l2wFp7532iDfqAQn2n1xW0DoUpUOPJaeG211wJ7s"}, "msg": "Otp verified successfully!", "status": "success", "statuscode": "1"}

*/

      case LOGIN_PHONE:
        let jsonData1 = action.payload;

        let extractData1 = jsonData1.data;

        let extractStatus1 = jsonData1.status;

        console.log('extractStatus1',extractStatus1);


        let extractToken1 = jsonData1.data.token;

        return{
          loginData : extractData1,
          status : extractStatus1,
          token :  extractToken1,
        };

        case LOGIN_SOCIAL:

          let jsonData2 = action.payload;

          let extractData2 = jsonData2.data;

          let extractStatus2 = jsonData2.status;

          

          return{
            loginData : extractData2,
            status : extractStatus2,
            
          };

          case LOGIN_SOCIAL_GOOGLE :

          let jsonData3 = action.payload;

          let extractData3 = jsonData3.data;

          let extractStatus3 = jsonData3.status;

          return{
            loginData : extractData3,
            status : extractStatus3,
          };

          case LOGIN_SOCIAL_GOOGLE :

            let jsonData4 = action.payload;

            let extractData4 = jsonData4.data;
  
            let extractStatus4 = jsonData4.status;
  
            return{
              loginData : extractData4,
              status : extractStatus4,
            };

            case LOGIN_SOCIAL_APPLE :

              let jsonData5 = action.payload;
  
              let extractData5 = jsonData5.data;
    
              let extractStatus5 = jsonData5.status;
    
              return{
                loginData : extractData5,
                status : extractStatus5,
              };

              

    case LOG_OUT:
       return {token: '',status: null,loginData: null};

    default:
      return state;
  }
}

export {loginReducer};