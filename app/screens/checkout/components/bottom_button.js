import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { Color } from '../../../theme/color';

export default function bottom_button({ name, onPress, checkout }) {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Color.Grey_E0E0E0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text style={styles.text}>
          SubTotal {'    '}
          {checkout?.subtotalPriceV2?.currencyCode}
          {checkout?.subtotalPriceV2?.amount}
        </Text>
        <Text
          style={{
            fontFamily: 'BaselGrotesk-Medium',
            fontSize: 16,
            color: Color.Black,
          }}>
          Total {checkout?.totalPriceV2?.currencyCode}
          {checkout?.totalPriceV2?.amount}
        </Text>
      </View>
      {checkout.shippingLine ? (
        <Text style={styles.text}>
          Shipping {'   '}
          {checkout?.shippingLine.priceV2?.currencyCode}
          {checkout?.shippingLine.priceV2?.amount}
        </Text>
      ) : null}
      <Text style={styles.text}>
        Discount {'   '}
        {checkout?.currencyCode}
        {(
          parseFloat(checkout?.totalPriceV2?.amount) -
          parseFloat(checkout?.subtotalPriceV2?.amount) -
          parseFloat(checkout?.totalTaxV2?.amount) -
          parseFloat(checkout?.shippingLine?.priceV2?.amount || 0)
        ).toFixed(1)}
      </Text>
      <Text style={styles.text}>
        Tax {'             '}
        {checkout?.totalTaxV2?.currencyCode}
        {checkout?.totalTaxV2?.amount}
      </Text>
      <View style={{ height: 10 }}></View>
      <Button
        buttonColor={Color.Black}
        mode="outlined"
        style={{
          width: Dimensions.get('window').width - 32,
          height: 44,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: Color.Black,
        }}
        labelStyle={{
          fontSize: 16,
          fontFamily: 'BaselGrotesk-Medium',
          color: '#fff',
        }}
        onPress={onPress}>
        {name}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
    lineHeight: 18,
  },
});
