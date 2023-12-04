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
import { Button } from 'react-native-paper'
import { Color } from '../../theme/color'
import AppBar from '../../components/appBar'
import { apolloClient } from '../../server/graphql'
import * as storage from '../../utils/storage'
import CartSchemas from '../../server/graphql/schema/cart_schema'

export default function Index({ navigation, route }) {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    getData()

    const listener = DeviceEventEmitter.addListener('CartUpdate', () => {
      getData()
    })
    return () => {
      listener.remove()
    }
  }, [])

  const getData = async () => {
    var localCart = await storage.getItem(storage.StorageKeys.Cart)
    setCart(localCart)
  }

  const updateProductQuantityInCart = async (cartItem) => {
    var result = await apolloClient.mutate({
      mutation: CartSchemas.updateProductQuantityInCart,
      variables: {
        cartId: cart.id,
        lines: [
          {
            quantity: 2,
            id: cartItem.node.id,
          },
        ],
      },
    })
    var tempCart = result.data.cartLinesUpdate.cart
    setCart(tempCart)
    storage.setItem(storage.StorageKeys.Cart, tempCart)
    DeviceEventEmitter.emit('CartUpdate', {})
  }

  const removeProductFromCart = async (cartItem) => {
    var result = await apolloClient.mutate({
      mutation: CartSchemas.removeProductFromCart,
      variables: {
        cartId: cart.id,
        lineIds: [cartItem.node.id],
      },
    })
    var tempCart = result.data.cartLinesRemove.cart
    if (tempCart.lines.edges.length === 0) {
      setCart(null)
      storage.removeItem(storage.StorageKeys.Cart)
    } else {
      setCart(tempCart)
      storage.setItem(storage.StorageKeys.Cart, tempCart)
    }
    DeviceEventEmitter.emit('CartUpdate', {})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar
          title='Shopping Bag'
          navigation={navigation}
          closeAble={true}
          bagEnable={true}
        />
        {cart ? (
          <View style={styles.container}>
            <ScrollView>
              {cart.lines.edges.map((e) => {
                return (
                  <View
                    key={e.node.id}
                    style={{
                      marginHorizontal: 16,
                      marginTop: 20,
                      borderBottomColor: Color.Grey_EEEEEE,
                      borderBottomWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Image
                        style={{ width: 104, height: 156 }}
                        resizeMode={'contain'}
                        source={{
                          uri: e.node.merchandise.image.url
                            ? e.node.merchandise.image.url
                            : 'https://img2.baidu.com/it/u=1585458193,188380332&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 21,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'BaselGrotesk-Medium',
                              color: Color.Black,
                              lineHeight: 20,
                            }}
                          >
                            {e.node.merchandise.product.productType}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeProductFromCart(e)}
                          >
                            <Image
                              style={{
                                width: 14,
                                height: 14,
                              }}
                              source={require('../../images/cart_delete_product.png')}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'BaselGrotesk-Regular',
                            color: Color.Black,
                            lineHeight: 20,
                          }}
                        >
                          {e.node.merchandise.product.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'BaselGrotesk-Regular',
                            color: Color.Grey_757575,
                            lineHeight: 20,
                            marginTop: 8,
                          }}
                        >
                          {e.node.merchandise.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            updateProductQuantityInCart(e)
                          }}
                        >
                          <View
                            style={{
                              width: 100,
                              height: 32,
                              marginTop: 12,
                              backgroundColor: Color.Grey_EEEEEE,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'BaselGrotesk-Regular',
                                color: Color.Grey_757575,
                                lineHeight: 20,
                                marginLeft: 9,
                              }}
                            >
                              Qty
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'BaselGrotesk-Regular',
                                color: Color.Black,
                                lineHeight: 20,
                                marginLeft: 5,
                                flex: 1,
                              }}
                            >
                              {e.node.quantity}
                            </Text>
                            <Image
                              style={{
                                width: 18,
                                height: 10,
                                marginRight: 6,
                                marginLeft: 6,
                              }}
                              source={require('../../images/porduct_detail_arrow.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 26,
                        height: 20,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'BaselGrotesk-Regular',
                          color: Color.Grey_757575,
                        }}
                      >
                        Move to wishlist
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 20,
                          marginLeft: 40,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'BaselGrotesk-Regular',
                            color: Color.Grey_757575,
                          }}
                        >
                          Price
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'BaselGrotesk-Regular',
                            color: Color.Black,
                          }}
                        >
                          {e.node.cost.totalAmount.currencyCode}
                          {e.node.cost.totalAmount.amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('TermsAndConditions')
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      width: Dimensions.get('window').width / 2.0,
                    }}
                  >
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        marginTop: 15,
                      }}
                      source={require('../../images/cart_icon_review.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Black,
                        lineHeight: 20,
                        marginTop: 10,
                      }}
                    >
                      Reviews
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Grey_757575,
                        textAlign: 'center',
                        marginTop: 8,
                        lineHeight: 18,
                      }}
                    >
                      See what our customers have to say about shopping with us
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Grey_757575,
                        textAlign: 'center',
                        marginTop: 8,
                        lineHeight: 18,
                        textDecorationLine: 'underline',
                        textDecorationColor: Color.Grey_757575,
                      }}
                    >
                      See Our Reviews
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('ReturnAndRefunds')
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      width: Dimensions.get('window').width / 2.0,
                    }}
                  >
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        marginTop: 15,
                      }}
                      source={require('../../images/cart_icon_free_return.png')}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Black,
                        lineHeight: 20,
                        marginTop: 10,
                      }}
                    >
                      Easy returns
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Grey_757575,
                        textAlign: 'center',
                        marginTop: 8,
                        lineHeight: 18,
                      }}
                    >
                      Shop in confidence with a quick and easy return process
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Grey_757575,
                        textAlign: 'center',
                        marginTop: 8,
                        lineHeight: 18,
                        textDecorationLine: 'underline',
                        textDecorationColor: Color.Grey_757575,
                      }}
                    >
                      Return Policy
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ height: 180 }}></View>
            </ScrollView>
            <View
              style={{
                width: Dimensions.get('window').width,
                flex: 1,
                marginBottom: 16,
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                borderTopColor: Color.Grey_EEEEEE,
                borderTopWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                  marginTop: 11,
                  lineHeight: 20,
                  flex: 1,
                }}
              >
                Subtotal {cart.cost.subtotalAmount.currencyCode ?? ''}
                {cart.cost.subtotalAmount.amount ?? ''}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                  marginBottom: 16,
                  lineHeight: 16,
                  flex: 1,
                }}
              >
                Shipping and taxes calculated at checkout
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  mode='outlined'
                  style={{
                    width: (Dimensions.get('window').width - 42) / 2,
                    height: 44,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: Color.Black,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    fontFamily: 'BaselGrotesk-Medium',
                    color: Color.Black,
                  }}
                  icon={() => (
                    <Image
                      source={require('../../images/product_detail_apple_pay.png')}
                      style={{ width: 58, height: 22, marginLeft: 10 }}
                    />
                  )}
                  onPress={() => console.log('Apple pay')}
                ></Button>
                <Button
                  buttonColor={Color.Black}
                  mode='outlined'
                  style={{
                    width: (Dimensions.get('window').width - 42) / 2,
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
                  onPress={() => navigation.push('Checkout')}
                >
                  Checkout
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.textBg}>
            <Text style={styles.text}>
              Your shopping cart is currently empty
            </Text>
          </View>
        )}
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
})
