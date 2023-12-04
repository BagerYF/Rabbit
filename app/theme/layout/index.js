import { Dimensions, Platform } from 'react-native';

export default {
  statusBarHeight: 20,
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};
