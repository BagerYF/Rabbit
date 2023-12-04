import { StyleSheet, Text, View, Dimensions, Modal } from 'react-native';
import React from 'react';
import { MaterialIndicator } from 'react-native-indicators';

export default function index({ type }) {
  const Indicator = () => (
    <View
      style={{
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}>
      <MaterialIndicator color="black" size={20} trackWidth={2} />
    </View>
  );

  if (type == 'modal') {
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={true}
        statusBarTranslucent={true}>
        <Indicator />
      </Modal>
    );
  } else {
    return <Indicator />;
  }
}

const styles = StyleSheet.create({});
