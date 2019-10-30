import * as Utility from '../utils/Utility';
import * as Strings from '../values/Strings';
import axios from 'axios';
let FETCH_TIMEOUT = 600000;

const FAILURE_STATUS = Object.freeze({
  TimeOut: 0,
  AuthFail: 1,
  NoData: 2,
  ServerFail: 3,
});

export function apiRequest(
  method,
  url,
  headers,
  callback,
  showDialog,
  params,
  loadingMsg,
  errorMsg,
  callbackFailure,
  type,
) {
  Utility.getNetInfo().then(isConnected => {
    if (!isConnected) {
      if (showDialog) {
        Utility.showNoInternetDialog();
      }
      let failureResponse = {msg: Strings.NO_INTERNET, status: 'F'};

      callbackFailure && callbackFailure(failureResponse);
      return;
    }
    //let body = paramsToBody(params);
    let body = undefined;
    if (type != 'Upload') body = JSON.stringify(params);
    else body = params;

    axios({
      method: method,
      url: url,
      data: body,
      timeout: FETCH_TIMEOUT,
      headers: headers,
    })
      .then(function(response) {
        Utility.log('apiResponse :' + JSON.stringify(response));
        if (response.status == 200) {
          callback(response.data);
          //   if (
          //     response.data.response.status == 'success' &&
          //     response.data.response.code == 200
          //   ) {
          //     callback(response.data.response);
          //   }
          //   else if (response.data.response.code == 1007) {
          //     callbackFailure && callbackFailure(response.data.response);
          //   }
          //   else {
          //     let failureResponse = {
          //       msg: 'Contact to administrator!',
          //       status: 'F',
          //     };
          // callbackFailure && callbackFailure(failureResponse);
          //   }
        } else {
          callbackFailure && callbackFailure(response.data);
        }
      })
      .catch(function(error) {
        // alert(error)
        Utility.log('api:' + JSON.stringify(error.response));
        let failureResponse = {
          msg: 'Contact to administrator!',
          error: Strings.SERVER_API_FAILURE_MSG,
          status: 'F',
        };
        callbackFailure && callbackFailure(error);
      });
  });
}

export function paramsToBody(params) {
  if (!params || params.length < 1) {
    console.warn('response : empty params');
    return null;
  }

  const body = new FormData();
  for (let k in params) {
    body.append(k, params[k]);
  }
  return body;
}
