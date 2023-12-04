import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color } from '../../../theme/color'
import { kDesigersMaps } from './data'
import AppBar from '../../../components/appBar'
import { apolloClient } from '../../../server/graphql'
import ProductSchemas from '../../../server/graphql/schema/product_schema'
import CartSchemas from '../../../server/graphql/schema/cart_schema'
import Swiper from 'react-native-swiper'
import * as storage from '../../../utils/storage'
import { Button, Snackbar } from 'react-native-paper'

export default function Index({ navigation, route }) {
  const { id } = route.params
  const [product, setProduct] = useState(null)
  const [variant, setVariant] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    var result = await apolloClient.query({
      query: ProductSchemas.productDetail,
      variables: {
        id: id,
      },
    })
    setProduct(result.data.product)
    setVariant(result.data.product.variants.edges[0].node)
  }

  const addProductsToCart = async () => {
    var cart = await storage.getItem(storage.StorageKeys.Cart)
    if (cart != null) {
      var result = await apolloClient.mutate({
        mutation: CartSchemas.addProductsToCart,
        variables: {
          cartId: cart.id,
          lines: [
            {
              quantity: 1,
              merchandiseId: product.variants.edges[0].node.id,
            },
          ],
        },
      })
      cart = result.data.cartLinesAdd.cart
      setVisible(true)
      storage.setItem(storage.StorageKeys.Cart, cart)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    } else {
      var result = await apolloClient.mutate({
        mutation: CartSchemas.createCart,
        variables: {
          input: {
            lines: [
              {
                quantity: 1,
                merchandiseId: product.variants.edges[0].node.id,
              },
            ],
            attributes: {
              key: 'cart_attribute',
              value: 'This is a cart attribute',
            },
          },
        },
      })
      cart = result.data.cartCreate.cart
      setVisible(true)
      storage.setItem(storage.StorageKeys.Cart, cart)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
    DeviceEventEmitter.emit('CartUpdate', {})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title='' navigation={navigation} />
        {product !== null ? (
          <View style={styles.container}>
            <ScrollView>
              <View style={{ height: 300 }}>
                <Swiper
                  style={styles.wrapper}
                  paginationStyle={{ bottom: 20 }}
                  autoplay={true}
                  dot={
                    <View
                      style={{
                        backgroundColor: '#E0E0E0',
                        width: 7,
                        height: 7,
                        borderRadius: 3.5,
                        marginLeft: 7,
                        marginRight: 7,
                        marginTop: 7,
                        marginBottom: 7,
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: '#424242',
                        width: 7,
                        height: 7,
                        borderRadius: 3.5,
                        marginLeft: 7,
                        marginRight: 7,
                        marginTop: 7,
                        marginBottom: 7,
                      }}
                    />
                  }
                >
                  {product.images.edges.map((v) => {
                    return (
                      <Image
                        key={v.node.id}
                        style={{ height: 300 }}
                        resizeMode={'contain'}
                        source={{ uri: v.node.url }}
                      />
                    )
                  })}
                </Swiper>
              </View>
              <Text
                style={{
                  marginLeft: 16,
                  marginTop: 10,
                  fontSize: 24,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                }}
              >
                {product.vendor}
              </Text>
              <Text
                style={{
                  marginLeft: 16,
                  marginTop: 4,
                  marginRight: 16,
                  fontSize: 16,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                }}
              >
                {product.title}
              </Text>
              {variant !== null ? (
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text
                    style={{
                      marginLeft: 16,
                      marginTop: 20,
                      fontSize: 14,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Grey_757575,
                      textDecorationLine: 'line-through',
                    }}
                  >
                    {variant.compareAtPrice.currencyCode}
                    {variant.compareAtPrice.amount}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 20,
                      fontSize: 16,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Red,
                    }}
                  >
                    {variant.price.currencyCode}
                    {variant.price.amount}
                  </Text>
                </View>
              ) : null}
              <Text style={styles.title}>Description</Text>
              <Text style={styles.intro}>{product.description}</Text>
              <View
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  height: 1,
                  backgroundColor: Color.Grey_E0E0E0,
                }}
              ></View>
              <Text style={styles.title}>Shipping and Returns</Text>
              <Text style={styles.title}>Delivery Destinations</Text>
              <Text style={styles.intro}>
                Shopify ships globally to a large number of countries. For more
                information on delivery, visit our orders & shipping page.
              </Text>
              <Text style={styles.title}>Returns</Text>
              <Text style={styles.intro}>
                You can purchase in confidence and send the items back to us if
                they are not right for you. If you would like to initiate a
                return, please go to your account at the top right corner where
                it says your name. Click \"Create Return\" next to the order
                your would like to return and follow the prompts.
              </Text>
              <View style={{ height: 70 }}></View>
            </ScrollView>
            <View
              style={{
                width: Dimensions.get('window').width,
                flex: 1,
                height: 64,
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Button
                buttonColor={Color.Black}
                mode='outlined'
                style={{
                  width: Dimensions.get('window').width - 32,
                  height: 44,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: Color.Black,
                }}
                labelStyle={{
                  fontSize: 16,
                  color: '#fff',
                }}
                onPress={() => addProductsToCart()}
              >
                Add to bag
              </Button>
            </View>
          </View>
        ) : null}
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: 100,
          }}
        >
          <Snackbar visible={visible} onDismiss={() => {}}>
            Already added to bag
          </Snackbar>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
  wrapper: {
    height: 300,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
    lineHeight: 48,
  },
  intro: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
  },
})
