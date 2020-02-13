import {Platform} from 'react-native';

export const url =
  Platform.OS === 'ios' ? 'http://localhost' : 'http://10.0.2.2';
