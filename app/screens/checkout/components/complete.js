import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { Color } from '../../../theme/color';
import { Button } from 'react-native-paper';

export default function Index({ navigation }) {
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 48,
            height: 48,
          }}
          source={require('../../../images/success.png')}
        />
        <Text
          style={{
            marginTop: 24,
            fontSize: 16,
            fontFamily: 'BaselGrotesk-Medium',
            color: Color.Black,
            lineHeight: 22,
          }}>
          Your order is complete
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 16,
            fontFamily: 'BaselGrotesk-Regular',
            color: Color.Grey_616161,
            lineHeight: 22,
            textAlign: 'center',
            width: 290,
          }}>
          A confirmation email will be sent to your email box
        </Text>
      </View>
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
        onPress={() => {
          navigation.popToTop();
        }}>
        Continue Shopping
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
