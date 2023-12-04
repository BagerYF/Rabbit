import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BasicInfo from './basic_info';
import { Color } from '../../../theme/color';
import BottomButton from './bottom_button';

export default function Index({
  navigation,
  route,
  deliverySelect,
  deliveryNext,
  checkout,
  email,
  shippingAddress,
  selectIndex,
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <BasicInfo
          checkout={checkout}
          type={'delivery'}
          email={email}
          shippingAddress={shippingAddress}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'BaselGrotesk-Medium',
            color: Color.Black,
            marginTop: 12,
            marginLeft: 16,
          }}>
          Shipping Methods
        </Text>
        {checkout.availableShippingRates.shippingRates.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                deliverySelect(i);
              }}
              key={e.handle}>
              <View style={styles.item}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 10,
                    marginTop: 3,
                  }}
                  source={
                    selectIndex === i
                      ? require('../../../images/selected.png')
                      : require('../../../images/unselected.png')
                  }
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      lineHeight: 22,
                    }}>
                    {e.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      marginTop: 8,
                      lineHeight: 16,
                    }}>
                    {parseFloat(e.priceV2.amount) === 0
                      ? 'Free'
                      : `${e.priceV2.currencyCode} ${e.priceV2.amount}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BottomButton name={'Next'} onPress={deliveryNext} checkout={checkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 16,
    padding: 16,
    borderColor: Color.Grey_EEEEEE,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
