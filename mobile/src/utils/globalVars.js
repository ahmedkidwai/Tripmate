import {Platform} from 'react-native';

export const url =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
