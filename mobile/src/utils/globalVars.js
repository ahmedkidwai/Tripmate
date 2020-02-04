import { Platform } from 'react-native';

global.url = Platform.OS === 'ios' ? "http://localhost" : "http://10.0.2.2";