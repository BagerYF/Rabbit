import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  StatusBar,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color } from '../../theme/color'
import { Appbar, Button } from 'react-native-paper'
import Address from './components/address'
import Delivery from './components/delivery'
import Payment from './components/payment'
import Complete from './components/complete'
import { apolloClient } from '../../server/graphql'
import CheckoutSchemas from '../../server/graphql/schema/checkout_schema'
import * as storage from '../../utils/storage'

export default function Index({ navigation, route }) {
  const [index, setIndex] = React.useState(-1)
  const indexTitleData = ['Address', 'Delivery', 'Payment']
  const [cart, setCart] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [billingAddress, setBillingAddress] = useState(null)
  const [email, setEmail] = useState(null)
  const [deliverySelectIndex, setDeliverySelectIndex] = React.useState(-1)
  const [discountData, setDiscountData] = useState([])

  useEffect(() => {
    initData()
  }, [])

  const AppBar = () => {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <Appbar.Header
          mode='center-aligned'
          style={{ height: 50, backgroundColor: '#fff' }}
        >
          {index !== 3 ? (
            <View style={{ width: 50 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <Image
                  style={styles.backIcon}
                  source={require('../../images/backarrow.png')}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {index === -1 || index === 3 ? (
            <Appbar.Content
              title={index === -1 ? 'Checkout' : 'Order Complete'}
              titleStyle={{
                fontSize: 16,
                fontWeight: '400',
                fontFamily: 'BaselGrotesk-Medium',
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                marginRight: 50,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {indexTitleData.map((e, i) => {
                return (
                  <Button
                    key={e}
                    mode='text'
                    labelStyle={{
                      color: index >= i ? Color.Black : Color.Grey_9E9E9E,
                      fontSize: 16,
                      fontFamily: 'BaselGrotesk-Medium',
                      marginVertical: 0,
                      marginHorizontal: 5,
                    }}
                    onPress={() => console.log('Pressed')}
                  >
                    {e}
                  </Button>
                )
              })}
            </View>
          )}
        </Appbar.Header>
      </View>
    )
  }

  const initData = async () => {
    var localCart = await storage.getItem(storage.StorageKeys.Cart)
    setCart(localCart)
    var params = {
      lineItems: localCart.lines.edges?.map((e) => {
        return {
          variantId: e.node.merchandise.id,
          quantity: e.node.quantity,
        }
      }),
    }
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCreate,
      variables: {
        input: params,
      },
    })
    setCheckout(result.data.checkoutCreate.checkout)
    setIndex(0)
  }

  const addressNext = async (data) => {
    await checkoutShippingAddressUpdate(data)
    var result = await checkoutShippingLines()
    if (result) {
      setIndex(1)
    }
  }

  const deliveryNext = () => {
    if (deliverySelectIndex > -1) {
      setIndex(2)
    }
  }

  const deliverySelect = async (i) => {
    await checkoutShippingLineUpdate(i)
    setDeliverySelectIndex(i)
  }

  const placeOrder = async () => {
    var token = await storage.getItem(storage.StorageKeys.TokenInfo)
    var results = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCustomerAssociateV2,
      variables: {
        checkoutId: checkout?.id,
        customerAccessToken: token.accessToken,
      },
    })
    setCheckout(results.data.checkoutCustomerAssociateV2.checkout)
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutCompleteFree,
      variables: {
        checkoutId: checkout?.id,
      },
    })
    setCheckout(result.data.checkoutCompleteFree.checkout)
    setIndex(3)
    await storage.removeItem(storage.StorageKeys.Cart)
    DeviceEventEmitter.emit('CartUpdate', {})
  }

  const checkoutShippingAddressUpdate = async (data) => {
    var tempAddress = {
      country: data.Country,
      province: data.State,
      firstName: data['First Name'],
      lastName: data['Last Name'],
      address1: data.Address,
      address2: data['Apartment / Unit / Suite'],
      city: data.City,
      zip: data['Postcode / Zipcode'],
      phone: data.Phone,
    }
    setEmail(data['Email'])
    setShippingAddress(tempAddress)
    if (billingAddress === null) {
      setBillingAddress({
        ...tempAddress,
        countryCodeV2: data.CountryCode,
        provinceCode: data.provinceCode,
      })
    }
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingAddressUpdate,
      variables: {
        checkoutId: checkout?.id,
        shippingAddress: tempAddress,
      },
    })
  }

  const checkoutShippingLines = async () => {
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingLines,
      variables: {
        id: checkout?.id,
      },
    })
    checkout.availableShippingRates = result.data.node.availableShippingRates
    if (checkout.availableShippingRates.ready === true) {
      return true
    }
    return await checkoutShippingLines()
  }

  const checkoutShippingLineUpdate = async (i) => {
    var e = checkout.availableShippingRates.shippingRates[i]
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutShippingLineUpdate,
      variables: {
        checkoutId: checkout?.id,
        shippingRateHandle: e.handle,
      },
    })
    setCheckout(result.data.checkoutShippingLineUpdate.checkout)
  }

  const checkoutDiscountCodeApply = async (code) => {
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutDiscountCodeApplyV2,
      variables: {
        checkoutId: checkout?.id,
        discountCode: code,
      },
    })
    if (result.data.checkoutDiscountCodeApplyV2.checkoutUserErrors.length > 0) {
      return false
    } else {
      setCheckout(result.data.checkoutDiscountCodeApplyV2.checkout)
      setDiscountData([code])
      return true
    }
  }

  const checkoutDiscountCodeRemove = async () => {
    var result = await apolloClient.mutate({
      mutation: CheckoutSchemas.checkoutDiscountCodeRemove,
      variables: {
        checkoutId: checkout?.id,
      },
    })
    setCheckout(result.data.checkoutDiscountCodeRemove.checkout)
    setDiscountData([])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title='' navigation={navigation} bagEnable={true} />
        {index === 0 ? (
          <Address
            navigation={navigation}
            route={route}
            addressNext={addressNext}
            checkout={checkout}
          />
        ) : null}
        {index === 1 ? (
          <Delivery
            navigation={navigation}
            route={route}
            deliverySelect={deliverySelect}
            deliveryNext={deliveryNext}
            checkout={checkout}
            email={email}
            shippingAddress={shippingAddress}
            selectIndex={deliverySelectIndex}
          />
        ) : null}
        {index === 2 ? (
          <Payment
            navigation={navigation}
            route={route}
            placeOrder={placeOrder}
            checkout={checkout}
            email={email}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            discountData={discountData}
            checkoutDiscountCodeApply={checkoutDiscountCodeApply}
            checkoutDiscountCodeRemove={checkoutDiscountCodeRemove}
          />
        ) : null}
        {index === 3 && <Complete navigation={navigation} />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 16,
    height: 16,
    marginLeft: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'BaselGrotesk-Medium',
  },
})
