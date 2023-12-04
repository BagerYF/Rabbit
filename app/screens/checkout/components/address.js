import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Input from '../../../components/input';
import * as storage from '../../../utils/storage';
import { Color } from '../../../theme/color';
import { useForm, Controller, useController } from 'react-hook-form';
import { kCountryMaps } from '../../profile/region/data';
import BottomButton from './bottom_button';

export default function Index({ navigation, route, addressNext, checkout }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {},
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [stateData, setStateData] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const [saveAddress, setSaveAddress] = useState(true);

  useEffect(() => {
    initData();
  }, []);

  initData = async () => {
    var address = await storage.getItem(storage.StorageKeys.Address);
    if (address === null) {
      setSelectedCountryCode('CN');
      var tempCountry = kCountryMaps.filter(e => e.code === 'CN')[0];
      setStateData(tempCountry.provinces);
      setValue('Country', tempCountry.name);
      setValue('First Name', 'Tom');
      setValue('Last Name', 'Li');
      setValue('Email', 'Li888@163.com');
      setValue('Address', 'addressksalfs');
      setValue('Apartment / Unit / Suite', 'Unitdlfjsl');
      setValue('City', 'Citysdfslkfds');
      setValue('Postcode / Zipcode', '888333');
      setValue('Phone', '34975849');
    } else {
      setSelectedCountryCode(address['CountryCode']);
      var tempCountry = kCountryMaps.filter(
        e => e.code === address['CountryCode'],
      )[0];
      setStateData(tempCountry.provinces);
      setValue('Country', address['Country']);
      setValue('First Name', address['First Name']);
      setValue('Last Name', address['Last Name']);
      setValue('Email', address['Email']);
      setValue('Address', address['Address']);
      setValue('Apartment / Unit / Suite', address['Apartment / Unit / Suite']);
      setValue('City', address['City']);
      setValue('Postcode / Zipcode', address['Postcode / Zipcode']);
      setValue('Phone', address['Phone']);
      setValue('State', address['State']);
      setSelectedStateCode(address['StateCode']);
    }
  };

  React.useEffect(() => {
    if (route.params?.country) {
      var e = route.params?.country;
      setSelectedCountryCode(e.code);
      setValue('Country', e.name);
      setStateData(e.provinces);
      setSelectedStateCode('');
      setValue('State', '');
    }
    if (route.params?.state) {
      var e = route.params?.state;
      setSelectedStateCode(e.code);
      setValue('State', e.name);
    }
  }, [route.params?.country, route.params?.state]);

  const selectCountry = () => {
    clearErrors('Checkout');
    navigation.push('AddressCountry', {
      routeName: 'Checkout',
      type: 'country',
      data: kCountryMaps,
      selectedCode: selectedCountryCode,
    });
  };

  const selectState = () => {
    clearErrors('State');
    navigation.push('AddressCountry', {
      routeName: 'Checkout',
      type: 'state',
      data: stateData,
      selectedCode: selectedStateCode,
    });
  };

  const onSubmit = async data => {
    var tempData = data;
    tempData['CountryCode'] = selectedCountryCode;
    tempData['StateCode'] = selectedStateCode;
    storage.setItem(storage.StorageKeys.Address, tempData);
    addressNext(tempData);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Regular',
            marginTop: 20,
            marginLeft: 16,
            marginBottom: 10,
            color: Color.Black,
          }}>
          *Required Fields
        </Text>
        <View style={{ marginHorizontal: 16 }}>
          <Input
            name="First Name"
            control={control}
            errors={errors}
            errorMsg="Please enter your first name"
          />
          <Input
            name="Last Name"
            control={control}
            errors={errors}
            errorMsg="Please enter your last name"
          />
          <Input
            name="Email"
            control={control}
            errors={errors}
            errorMsg="Please enter your email"
          />
          <TouchableOpacity
            onPress={() => {
              setSubscribe(!subscribe);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 16,
              }}>
              <Image
                style={{ width: 16, height: 16 }}
                source={
                  subscribe
                    ? require('../../../images/select_y.png')
                    : require('../../../images/select_n.png')
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Grey_616161,
                  marginLeft: 8,
                }}>
                Subscribe to our newsletter
              </Text>
            </View>
          </TouchableOpacity>
          <Input
            name="Country"
            control={control}
            errors={errors}
            type="selector"
            onPress={selectCountry}
            errorMsg="Please select a country"
          />
          <Input
            name="Address"
            control={control}
            errors={errors}
            errorMsg="Please enter your address"
          />
          <Input
            name="Apartment / Unit / Suite"
            control={control}
            errors={errors}
            optional={true}
          />
          <Input
            name="City"
            control={control}
            errors={errors}
            errorMsg="Please enter your city"
          />
          {stateData.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: (Dimensions.get('window').width - 42) / 2,
                }}>
                <Input
                  name="State"
                  control={control}
                  errors={errors}
                  type="selector"
                  onPress={selectState}
                  errorMsg="Please enter your state"
                />
              </View>
              <View
                style={{
                  width: (Dimensions.get('window').width - 42) / 2,
                }}>
                <Input
                  name="Postcode / Zipcode"
                  control={control}
                  errors={errors}
                  errorMsg="Please enter your postcode / zipcode"
                />
              </View>
            </View>
          ) : (
            <Input
              name="Postcode / Zipcode"
              control={control}
              errors={errors}
              errorMsg="Please enter your postcode / zipcode"
            />
          )}

          <Input
            name="Phone"
            control={control}
            errors={errors}
            optional={true}
          />
          <TouchableOpacity
            onPress={() => {
              setSaveAddress(!saveAddress);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 16,
              }}>
              <Image
                style={{ width: 16, height: 16 }}
                source={
                  saveAddress
                    ? require('../../../images/select_y.png')
                    : require('../../../images/select_n.png')
                }
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'BaselGrotesk-Regular',
                  color: Color.Grey_616161,
                  marginLeft: 8,
                }}>
                Save address for next purchase
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView>
      <BottomButton
        name={'Next'}
        onPress={handleSubmit(onSubmit)}
        checkout={checkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
