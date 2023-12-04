import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../../../../components/appBar'
import { Color } from '../../../../theme/color'
import { useForm, Controller, useController } from 'react-hook-form'
import { Button, RadioButton } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { classic } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler'
import Input from '../../../../components/input'
import { kCountryMaps } from '../../region/data'
import { apolloClient } from '../../../../server/graphql'
import AddressSchemas from '../../../../server/graphql/schema/address_schema'
import * as storage from '../../../../utils/storage'

export default function Index({ navigation, route }) {
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

  const { type, address, callBack } = route.params
  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [selectedStateCode, setSelectedStateCode] = useState('')
  const [stateData, setStateData] = useState([])

  useEffect(() => {
    initData()
  }, [])

  initData = () => {
    if (type === 'new') {
      setSelectedCountryCode('CN')
      var tempCountry = kCountryMaps.filter((e) => e.code === 'CN')[0]
      setStateData(tempCountry.provinces)
      setValue('Country', tempCountry.name)
      setValue('First Name', 'Tom')
      setValue('Last Name', 'Li')
      setValue('Address', 'addressksalfs')
      setValue('Apartment / Unit / Suite', 'Unitdlfjsl')
      setValue('City', 'Citysdfslkfds')
      setValue('Postcode / Zipcode', '888333')
      setValue('Phone', '34975849')
    } else if (type === 'checkout') {
      setSelectedCountryCode(address.countryCodeV2)
      var tempCountry = kCountryMaps.filter(
        (e) => e.code === address.countryCodeV2
      )[0]
      setStateData(tempCountry.provinces)
      setValue('Country', address.country)
      setValue('First Name', address.firstName)
      setValue('Last Name', address.lastName)
      setValue('Address', address.address1)
      setValue('Apartment / Unit / Suite', address.address2)
      setValue('City', address.city)
      setValue('Postcode / Zipcode', address.zip)
      setValue('Phone', address.phone)
      setValue('State', address.province)
      setSelectedStateCode(address.provinceCode)
    } else {
      setSelectedCountryCode(address.countryCodeV2)
      var tempCountry = kCountryMaps.filter(
        (e) => e.code === address.countryCodeV2
      )[0]
      setStateData(tempCountry.provinces)
      setValue('Country', address.country)
      setValue('First Name', address.firstName)
      setValue('Last Name', address.lastName)
      setValue('Address', address.address1)
      setValue('Apartment / Unit / Suite', address.address2)
      setValue('City', address.city)
      setValue('Postcode / Zipcode', address.zip)
      setValue('Phone', address.phone)
      setValue('State', address.province)
      setSelectedStateCode(address.provinceCode)
    }
  }

  React.useEffect(() => {
    if (route.params?.country) {
      var e = route.params?.country
      setSelectedCountryCode(e.code)
      setValue('Country', e.name)
      setStateData(e.provinces)
      setSelectedStateCode('')
      setValue('State', '')
    }
    if (route.params?.state) {
      var e = route.params?.state
      setSelectedStateCode(e.code)
      setValue('State', e.name)
    }
  }, [route.params?.country, route.params?.state])

  const selectCountry = () => {
    clearErrors('Country')
    navigation.push('AddressCountry', {
      routeName: 'AddressEdit',
      type: 'country',
      data: kCountryMaps,
      selectedCode: selectedCountryCode,
    })
  }

  const selectState = () => {
    clearErrors('State')
    navigation.push('AddressCountry', {
      routeName: 'AddressEdit',
      type: 'state',
      data: stateData,
      selectedCode: selectedStateCode,
    })
  }

  const onSubmit = async (data) => {
    var token = await storage.getItem(storage.StorageKeys.TokenInfo)
    if (type === 'new') {
      var result = await apolloClient.mutate({
        mutation: AddressSchemas.customerAddressCreate,
        variables: {
          customerAccessToken: token.accessToken,
          address: {
            country: data.Country,
            province: data.State,
            firstName: data['First Name'],
            lastName: data['Last Name'],
            address1: data.Address,
            address2: data['Apartment / Unit / Suite'],
            city: data.City,
            zip: data['Postcode / Zipcode'],
            phone: data.Phone,
          },
        },
      })
      callBack()
    } else if (type === 'checkout') {
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
        countryCodeV2: selectedCountryCode,
        provinceCode: selectedStateCode,
      }
      callBack(tempAddress)
    } else {
      var result = await apolloClient.mutate({
        mutation: AddressSchemas.customerAddressUpdate,
        variables: {
          customerAccessToken: token.accessToken,
          id: address.id,
          address: {
            country: data.Country,
            province: data.State,
            firstName: data['First Name'],
            lastName: data['Last Name'],
            address1: data.Address,
            address2: data['Apartment / Unit / Suite'],
            city: data.City,
            zip: data['Postcode / Zipcode'],
            phone: data.Phone,
          },
        },
      })
      callBack()
    }
    navigation.goBack()
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar
          title={type === 'new' ? 'Add Address' : 'Update Address'}
          navigation={navigation}
          bagEnable={true}
        />
        <ScrollView>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              marginTop: 20,
              marginLeft: 16,
              marginBottom: 10,
              color: Color.Black,
            }}
          >
            *Required Fields
          </Text>
          <View style={{ marginHorizontal: 16 }}>
            <Input
              name='First Name'
              control={control}
              errors={errors}
              errorMsg='Please enter your first name'
            />
            <Input
              name='Last Name'
              control={control}
              errors={errors}
              errorMsg='Please enter your last name'
            />
            <Input
              name='Country'
              control={control}
              errors={errors}
              type='selector'
              onPress={selectCountry}
              errorMsg='Please select a country'
            />
            <Input
              name='Address'
              control={control}
              errors={errors}
              errorMsg='Please enter your address'
            />
            <Input
              name='Apartment / Unit / Suite'
              control={control}
              errors={errors}
              optional={true}
            />
            <Input
              name='City'
              control={control}
              errors={errors}
              errorMsg='Please enter your city'
            />
            {stateData.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: (Dimensions.get('window').width - 42) / 2,
                  }}
                >
                  <Input
                    name='State'
                    control={control}
                    errors={errors}
                    type='selector'
                    onPress={selectState}
                    errorMsg='Please enter your state'
                  />
                </View>
                <View
                  style={{
                    width: (Dimensions.get('window').width - 42) / 2,
                  }}
                >
                  <Input
                    name='Postcode / Zipcode'
                    control={control}
                    errors={errors}
                    errorMsg='Please enter your postcode / zipcode'
                  />
                </View>
              </View>
            ) : (
              <Input
                name='Postcode / Zipcode'
                control={control}
                errors={errors}
                errorMsg='Please enter your postcode / zipcode'
              />
            )}

            <Input
              name='Phone'
              control={control}
              errors={errors}
              optional={true}
            />
          </View>
          <View style={{ height: 40 }}></View>
        </ScrollView>
        <View
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 16,
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
              fontFamily: 'BaselGrotesk-Medium',
              color: '#fff',
            }}
            onPress={handleSubmit(onSubmit)}
          >
            {type === 'new' ? 'Add Address' : 'Update Address'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // minHeight: '100%',
  },
  input: {},
})
