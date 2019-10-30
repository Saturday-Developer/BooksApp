import React from 'react';
import {LOG_ENABLED} from '../APIcalls/APIConstants';

import {Platform, Linking, Alert} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import * as Strings from '../values/Strings';

export async function getNetInfo() {
  if (Platform.OS === 'ios') {
    try {
      const res = await fetch('https://www.google.com');
      if (res.status === 200) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  } else {
    return NetInfo.isConnected.fetch().then(isConnected => {
      return isConnected;
    });
  }
}

export function showNoInternetDialog() {
  Alert.alert(
    Strings.NO_INTERNET,
    Strings.NO_INTERNET_MESSAGE,
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
    {cancelable: true},
  );
}
export function openSettings() {
  if (Platform.OS === 'ios') {
    Linking.canOpenURL('app-settings:')
      .then(supported => {
        if (!supported) {
          console.warn("Can't handle settings url");
        } else {
          return Linking.openURL('app-settings:');
        }
      })
      .catch(err => console.warn('An error occurred', err));
  } else {
    //Do Something!
  }
}

export function log() {
  if (LOG_ENABLED) console.log(...arguments);
}
