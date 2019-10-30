import * as APIConstants from '../APIConstants';
import {apiRequest} from '../APICalls';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function getBooksList(data, callbackSuccess, callbackFailure) {
  let params = {};
  apiRequest(
    'GET',
    APIConstants.GETLISTOFBOOKS_URL,
    headers,
    response => {
      callbackSuccess(response);
    },
    true,
    params,
    null,
    null,
    callbackFailure,
  );
}
