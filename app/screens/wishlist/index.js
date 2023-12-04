import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import React from 'react';
import AppBar from '../../components/appBar';
import { Color } from '../../theme/color';

export default function Index({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <AppBar title="Wishlist" backEnable="true" navigation={navigation} />
        <View style={styles.textBg}>
          <Text style={styles.text}>Your Wishlist is currently empty</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: Color.Black,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
  },
  textBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
