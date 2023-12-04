import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Color } from '../../../theme/color';

export default function Index({ checkout, type, email, shippingAddress }) {
  return (
    <View
      style={{
        borderBottomColor: Color.Grey_EEEEEE,
        borderBottomWidth: 1,
        marginHorizontal: 16,
        paddingVertical: 16,
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>Contact</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.value}>
          {shippingAddress.address1 || ''} {shippingAddress.address2 || ''}{' '}
          {(shippingAddress.address2 || '').length > 0 ? ', ' : ''}
          {shippingAddress.city || ''} {shippingAddress.country || ''}{' '}
          {(shippingAddress.country || '').length > 0 ? ', ' : ''}
          {shippingAddress.zip || ''} {shippingAddress.country || ''}
        </Text>
      </View>
      {type === 'payment' ? (
        <View style={styles.item}>
          <Text style={styles.title}>Shipping</Text>
          <Text style={styles.value}>{checkout.shippingLine.title}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginTop: 12 },
  title: {
    fontSize: 12,
    fontFamily: 'BaselGrotesk-Medium',
    color: Color.Black,
    marginRight: 20,
    width: 60,
  },
  value: {
    fontSize: 12,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
    flex: 1,
  },
});
