import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import React from 'react'
import AppBar from '../../../components/appBar'
import { Color } from '../../../theme/color'

export default function Index({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title='Shopping Bag' navigation={navigation} bagEnable={true} />
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BaselGrotesk-Regular',
              marginTop: 18,
              marginBottom: 24,
              textAlign: 'center',
              color: Color.Black,
            }}
          >
            The Best of Luxury Fashion
          </Text>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: 230,
            }}
            resizeMode={'contain'}
            source={require('../../../images/about.jpeg')}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              color: Color.Black,
              lineHeight: 20,
            }}
          >
            Shopify brings to you the best of luxury fashion. Featuring an
            extensive range of over 500 brands, including womenswear, menswear
            and kidswear from iconic fashion houses, such as Prada, Gucci, Saint
            Laurent, Balenciaga and Valentino.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              marginBottom: 32,
              color: Color.Black,
              lineHeight: 20,
            }}
          >
            Every aspect of the user experience is optimized, starting with a
            curated selection of world-renowned brands delivered with
            best-in-class technology. Payment is easy and secure, with free
            express shipping to over X countries and free returns on all orders
            so you can shop with confidence.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
