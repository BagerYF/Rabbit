import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import BasicInfo from './basic_info'
import { Color } from '../../../theme/color'
import BottomButton from './bottom_button'
import { Button } from 'react-native-paper'
import { useForm, Controller, useController } from 'react-hook-form'
import Input from '../../../components/input'

export default function Index({
  navigation,
  route,
  placeOrder,
  checkout,
  email,
  shippingAddress,
  billingAddress,
  setBillingAddress,
  discountData,
  checkoutDiscountCodeApply,
  checkoutDiscountCodeRemove,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {},
  })

  const [code, setCode] = useState('')
  const [sameAddress, setSameAddress] = useState(false)
  const [showCodeError, setShowCodeError] = useState(false)

  useEffect(() => {
    compareAddress()
  }, [])

  compareAddress = () => {
    var shippingAddressStr = getAddressString(shippingAddress)
    var billingAddressStr = getAddressString(billingAddress)
    setSameAddress(shippingAddressStr === billingAddressStr)
  }

  getAddressString = (address) => {
    return (
      address.country +
      address.firstName +
      address.lastName +
      address.address1 +
      address.address2 +
      address.city +
      address.zip +
      address.phone +
      address.province
    )
  }

  const onChangeText = (text) => {
    setCode(text)
  }

  const onSubmit = async (data) => {
    clearErrors()
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Medium',
            color: Color.Black,
            marginTop: 12,
            width: 60,
            marginLeft: 16,
          }}
        >
          Payment
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Regular',
            color: Color.Black,
            marginLeft: 16,
          }}
        >
          All transactions are secure and encrypted.
        </Text>
        {parseFloat(checkout?.totalPriceV2?.amount) === 0 ? (
          <View
            style={{
              marginVertical: 16,
              marginHorizontal: 16,
              borderColor: Color.Grey_E0E0E0,
              borderRadius: 4,
              borderWidth: 1,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 22,
                height: 22,
              }}
              source={require('../../../images/payment_free.png')}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'BaselGrotesk-Regular',
                color: Color.Black,
                marginTop: 9,
                lineHeight: 20,
              }}
            >
              This order is covered by your gift card
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginVertical: 16,
              marginHorizontal: 16,
              padding: 16,
              borderColor: Color.Grey_E0E0E0,
              borderRadius: 4,
              borderWidth: 1,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                  lineHeight: 24,
                }}
              >
                Credit or Debit Card
              </Text>
              <Image
                style={{
                  width: 122,
                  height: 24,
                }}
                source={require('../../../images/pay_type.png')}
              />
            </View>
            <Input
              name='Card Number'
              control={control}
              errors={errors}
              errorMsg='Please enter Card Number'
              hideTitle={true}
              maxLength={19}
              keyboardType='numeric'
            />
            <View
              style={{ width: (Dimensions.get('window').width - 74) / 2.0 }}
            >
              <Input
                name='MM / YY'
                control={control}
                errors={errors}
                errorMsg='Please enter MM / YY'
                hideTitle={true}
                maxLength={7}
                keyboardType='numeric'
              />
            </View>
            <Input
              name='Name on Card'
              control={control}
              errors={errors}
              errorMsg='Please enter Name on Card'
              hideTitle={true}
            />
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{ width: (Dimensions.get('window').width - 74) / 2.0 }}
              >
                <Input
                  name='Security code'
                  control={control}
                  errors={errors}
                  errorMsg='Security code'
                  hideTitle={true}
                  maxLength={3}
                  keyboardType='numeric'
                />
              </View>
              <Image
                style={{
                  width: 48,
                  height: 32,
                  marginLeft: 10,
                  marginTop: 20,
                }}
                resizeMode={'contain'}
                source={require('../../../images/credit.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'BaselGrotesk-Regular',
                color: Color.Black,
                lineHeight: 20,
                marginTop: 10,
              }}
            >
              The security number is the three digits on the back of the card in
              the signature box.
            </Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Medium',
            color: Color.Black,
            marginTop: 16,
            marginLeft: 16,
            marginBottom: 12,
            lineHeight: 17,
          }}
        >
          Billing Address
        </Text>
        {sameAddress ? (
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Grey_9E9E9E,
              marginLeft: 16,
              lineHeight: 24,
            }}
          >
            Same as shipping address
          </Text>
        ) : null}
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'BaselGrotesk-Regular',
            color: Color.Black,
            lineHeight: 24,
            marginHorizontal: 16,
          }}
        >
          {billingAddress.firstName} {billingAddress.lastName}
          {'\n'}
          {billingAddress.address1} {billingAddress.address2},{' '}
          {billingAddress.city}
          {'\n'}
          {billingAddress.province}, {billingAddress.zip},{' '}
          {billingAddress.country}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('AddressEdit', {
              type: 'checkout',
              address: billingAddress,
              callBack: (e) => {
                setBillingAddress(e)
                compareAddress()
              },
            })
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              marginHorizontal: 16,
              borderTopColor: Color.Grey_EEEEEE,
              borderTopWidth: 1,
              alignItems: 'center',
              height: 40,
            }}
          >
            <Image
              style={styles.image}
              source={require('../../../images/pen.png')}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'BaselGrotesk-Regular',
                color: Color.Black,
                lineHeight: 20,
                flex: 1,
              }}
            >
              Edit
            </Text>
            <Image
              style={styles.image}
              source={require('../../../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Medium',
            color: Color.Black,
            marginTop: 16,
            marginLeft: 16,
            lineHeight: 17,
          }}
        >
          Add Code
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
          }}
        >
          <TextInput
            style={{
              height: 44,
              fontSize: 14,
              color: Color.Black,
              padding: 0,
              flex: 1,
              marginRight: 10,
              borderBottomColor: Color.Grey_BDBDBD,
              borderBottomWidth: 1,
              paddingLeft: 0,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={code}
            placeholder={'Gift card or discount code'}
            placeholderTextColor={Color.Grey_9E9E9E}
            cursorColor={Color.Black}
            clearButtonMode='while-editing'
            contextMenuHidden={true}
          />
          <Button
            mode='outlined'
            style={{
              width: 75,
              height: 44,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: Color.Grey_BDBDBD,
            }}
            labelStyle={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
              marginHorizontal: 0,
            }}
            onPress={async () => {
              setShowCodeError(false)
              var result = await checkoutDiscountCodeApply(code)
              if (result) {
                setCode('')
              } else {
                setShowCodeError(true)
              }
            }}
          >
            Apply
          </Button>
        </View>
        {showCodeError ? (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Red,
              lineHeight: 17,
              marginLeft: 16,
              marginTop: 4,
            }}
          >
            Enter a valid discount code or gift card
          </Text>
        ) : null}
        <View style={{ marginHorizontal: 16, marginTop: 32 }}>
          {discountData.map((e) => {
            return (
              <Button
                key={e}
                mode='outlined'
                style={{
                  width: 75,
                  height: 44,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: Color.Grey_BDBDBD,
                }}
                labelStyle={{
                  fontSize: 16,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Black,
                  marginLeft: 16,
                  marginRight: 20,
                }}
                contentStyle={{
                  height: 44,
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                }}
                icon={({ size, color }) => (
                  <Image
                    source={require('../../../images/nav_close.png')}
                    style={{ width: 12, height: 12 }}
                  />
                )}
                onPress={() => {
                  checkoutDiscountCodeRemove()
                }}
              >
                {e.toUpperCase().substring(0, 2)}...
              </Button>
            )
          })}
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <BottomButton
        name={'Place Order'}
        onPress={handleSubmit(onSubmit)}
        checkout={checkout}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    margin: 16,
    padding: 16,
    borderColor: Color.Grey_EEEEEE,
    borderWidth: 1,
    flexDirection: 'row',
  },
  image: {
    marginHorizontal: 4,
    width: 16,
    height: 16,
  },
})
