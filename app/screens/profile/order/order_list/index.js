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
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppBar from '../../../../components/appBar';
import { Color } from '../../../../theme/color';
import * as storage from '../../../../utils/storage';
import { apolloClient } from '../../../../server/graphql';
import LoginSchemas from '../../../../server/graphql/schema/login_schema';

export default function Index({ navigation, props }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // queryCustomer();
    initData();
  }, []);

  initData = async () => {
    var tempCustomerInfo = await storage.getItem(storage.StorageKeys.Customer);
    setData(tempCustomerInfo.orders.edges);
  };

  const queryCustomer = async () => {
    var token = await storage.getItem(storage.StorageKeys.TokenInfo);
    var result = await apolloClient.query({
      query: LoginSchemas.customer,
      variables: {
        customerAccessToken: token.accessToken,
      },
    });
    var customerInfo = result.data.customer;
    storage.setItem(storage.StorageKeys.Customer, customerInfo);
    setData(customerInfo.orders.edges);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title="My Orders" navigation={navigation} bagEnable={true} />

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
              <TouchableOpacity
                onPress={() => {
                  navigation.push('OrderDetail', { orderInfo: item.node });
                }}>
                <View style={styles.item}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Grey_9E9E9E,
                      }}>
                      Order#
                      <Text style={styles.itemText}>
                        {' '}
                        {item.node.orderNumber}
                      </Text>
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.itemText}>
                        {item.node.processedAt.substring(0, 10)}
                      </Text>
                      <Image
                        style={styles.menuImage}
                        resizeMode={'contain'}
                        source={require('../../../../images/arrow.png')}
                      />
                    </View>
                  </View>
                  {item.node.lineItems.edges.map(e => {
                    return (
                      <Image
                        style={{
                          width: 72,
                          height: 72,
                          marginTop: 10,
                        }}
                        resizeMode={'contain'}
                        source={{ uri: e.node.variant.image.url }}
                        key={e.node.title}
                      />
                    );
                  })}
                </View>
              </TouchableOpacity>
            );
          }}
          {...props}
        />
      </View>
    </SafeAreaView>
  );
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
    width: 14,
    height: 14,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    marginHorizontal: 4,
    color: Color.Black,
  },
});
