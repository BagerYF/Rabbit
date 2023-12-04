import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../../../../components/appBar'
import { Color } from '../../../../theme/color'
import * as storage from '../../../../utils/storage'
import { apolloClient } from '../../../../server/graphql'
import LoginSchemas from '../../../../server/graphql/schema/login_schema'
import AddressSchemas from '../../../../server/graphql/schema/address_schema'
import { Button } from 'react-native-paper'
import Loading from '../../../../components/loading'

export default function Index({ navigation, props }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    queryCustomer()
  }, [])

  initData = async () => {
    var tempCustomerInfo = await storage.getItem(storage.StorageKeys.Customer)
    setData(tempCustomerInfo.addresses.edges)
  }

  const deleteAddress = async (address) => {
    var token = await storage.getItem(storage.StorageKeys.TokenInfo)

    var result = await apolloClient.mutate({
      mutation: AddressSchemas.customerAddressDelete,
      variables: {
        customerAccessToken: token.accessToken,
        id: address.node.id,
      },
    })
    queryCustomer()
  }

  const queryCustomer = async () => {
    setLoading(true)
    var token = await storage.getItem(storage.StorageKeys.TokenInfo)
    var result = await apolloClient.query({
      query: LoginSchemas.customer,
      variables: {
        customerAccessToken: token.accessToken,
      },
    })
    setLoading(false)
    var customerInfo = result.data.customer
    storage.setItem(storage.StorageKeys.Customer, customerInfo)
    setData(customerInfo.addresses.edges)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title='Save Address' navigation={navigation} bagEnable={true} />

        <FlatList
          style={{
            marginHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={'1'}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.node.firstName} {item.node.lastName}
                  {'\n'}
                  {item.node.address1} {item.node.address2}, {item.node.city}
                  {'\n'}
                  {item.node.province}, {item.node.zip}, {item.node.country}
                  {'\n'}
                  {item.node.phone}
                </Text>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      deleteAddress(item)
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row-reverse', marginRight: 10 }}
                    >
                      <Text style={styles.menuText}>Delete</Text>
                      <Image
                        style={styles.menuImage}
                        resizeMode={'contain'}
                        source={require('../../../../images/address_del.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('AddressEdit', {
                        type: 'old',
                        address: item.node,
                        callBack: () => queryCustomer(),
                      })
                    }}
                  >
                    <View style={{ flexDirection: 'row-reverse' }}>
                      <Text style={styles.menuText}>Edit</Text>
                      <Image
                        style={styles.menuImage}
                        resizeMode={'contain'}
                        source={require('../../../../images/address_edit.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
          {...props}
        />
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
            onPress={() => {
              navigation.push('AddressEdit', {
                type: 'new',
                address: {},
                callBack: () => queryCustomer(),
              })
            }}
          >
            Add Address
          </Button>
        </View>
        {loading && <Loading />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    borderBottomColor: Color.Grey_F5F5F5,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
  },
  menuImage: {
    width: 20,
    height: 20,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    marginHorizontal: 4,
    color: Color.Black,
  },
})
