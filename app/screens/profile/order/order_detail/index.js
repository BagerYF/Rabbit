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

export default function Index({ navigation, route }) {
  const { orderInfo } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: 'amount',
        data1: ['SubTotal', 'Shipping', 'Tax'],
        data2: [
          `${
            orderInfo.subtotalPriceV2?.currencyCode +
            ' ' +
            orderInfo.subtotalPriceV2?.amount
          }`,
          ,
          parseFloat(orderInfo.totalShippingPriceV2?.amount) === 0
            ? 'Free'
            : `${
                orderInfo.totalShippingPriceV2?.currencyCode +
                ' ' +
                orderInfo.totalShippingPriceV2?.amount
              }`,
          `${
            orderInfo.totalTaxV2?.currencyCode +
            ' ' +
            orderInfo.totalTaxV2?.amount
          }`,
        ],
        data3: [
          `Total ${
            orderInfo.totalPriceV2?.currencyCode +
            ' ' +
            orderInfo.totalPriceV2?.amount
          }`,
        ],
      },
      {
        key: 'order',
        data1: ['OrderNumber', 'Order Date'],
        data2: [orderInfo.orderNumber, orderInfo.processedAt.substring(0, 10)],
      },
      {
        key: 'shipping',
        data1: ['Shipping'],
        data2: ['International Priority Express Shipping'],
      },
      {
        key: 'contact',
        data1: ['Contact', 'Address'],
        data2: [
          orderInfo.email,
          `${orderInfo.shippingAddress.firstName} ${orderInfo.shippingAddress.lastName}
${orderInfo.shippingAddress.address1} ${orderInfo.shippingAddress.address2}, ${orderInfo.shippingAddress.city}
${orderInfo.shippingAddress.province}, ${orderInfo.shippingAddress.zip}, ${orderInfo.shippingAddress.country}
${orderInfo.shippingAddress.phone}`,
        ],
      },
    ]);
  }, []);

  const Helper = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingTop: 25,
          paddingBottom: 50,
          borderBottomColor: Color.Grey_F5F5F5,
          borderBottomWidth: 1,
        }}>
        <Image
          style={styles.menuImage}
          resizeMode={'contain'}
          source={require('../../../../images/icon_order_problem.png')}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'BaselGrotesk-Medium',
            lineHeight: 20,
            color: Color.Black,
            marginTop: 10,
          }}>
          Help and Contact
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'BaselGrotesk-Regular',
            lineHeight: 16,
            color: Color.Grey_616161,
            marginTop: 8,
            textAlign: 'center',
          }}>
          {`Questions about your \n order? Don't hesitate to ask`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('HelpAndContacts');
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              lineHeight: 16,
              color: Color.Grey_616161,
              marginTop: 8,
              textAlign: 'center',
              textDecorationLine: 'underline',
              textDecorationColor: Color.Grey_616161,
            }}>
            Contact Shopify
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Return = () => {
    return (
      <View>
        <Text style={styles.title}>Return Information</Text>
        <Text style={styles.intro}>
          The eligible return period for this item(s) has expired. For more
          information, see our Return Policy.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('ReturnAndRefunds');
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              lineHeight: 16,
              color: Color.Grey_616161,
              marginTop: 10,
              marginLeft: 16,
              marginBottom: 50,
              textDecorationLine: 'underline',
              textDecorationColor: Color.Grey_616161,
            }}>
            Return Policy
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar
          title={orderInfo.name}
          navigation={navigation}
          bagEnable={true}
        />
        <ScrollView>
          {data.map(e => {
            return (
              <View key={e.key} style={styles.item}>
                <View style={{ width: 110 }}>
                  {e.data1.map(t => {
                    return (
                      <Text style={styles.itemText} key={t}>
                        {t}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flex: 1 }}>
                  {e.data2.map((t, i) => {
                    return (
                      <Text style={styles.itemText} key={t + i}>
                        {t}
                      </Text>
                    );
                  })}
                </View>
                {e.data3 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    {e.data3.map(t => {
                      return (
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'BaselGrotesk-Medium',
                            color: Color.Black,
                          }}
                          key={'total'}>
                          {t}
                        </Text>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            );
          })}
          {orderInfo.lineItems.edges.map(e => {
            return (
              <View
                key={e.node.title}
                style={{
                  ...styles.item,
                }}>
                <Image
                  style={{ width: 104, height: 156 }}
                  resizeMode={'contain'}
                  source={{
                    uri: e.node.variant.image.url
                      ? e.node.variant.image.url
                      : 'https://img2.baidu.com/it/u=1585458193,188380332&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 21,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Medium',
                        color: Color.Black,
                        lineHeight: 20,
                      }}>
                      {e.node.variant.product.productType}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      lineHeight: 20,
                    }}>
                    {e.node.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      lineHeight: 20,
                      marginTop: 8,
                    }}>
                    {`Size     ${
                      e.node.variant.selectedOptions.filter(
                        e => e.name === 'Size',
                      )[0].value
                    }`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      lineHeight: 20,
                    }}>
                    {`Color   ${
                      e.node.variant.selectedOptions.filter(
                        e => e.name === 'Color',
                      )[0].value
                    }`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'BaselGrotesk-Regular',
                      color: Color.Black,
                      lineHeight: 20,
                    }}>
                    {`Qty      ${e.node.quantity}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Regular',
                        color: Color.Black,
                        lineHeight: 20,
                      }}>
                      Price
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'BaselGrotesk-Medium',
                        color: Color.Black,
                        lineHeight: 20,
                      }}>
                      {e.node.originalTotalPrice.currencyCode +
                        ' ' +
                        e.node.originalTotalPrice.amount}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          <Helper />
          <Return />
        </ScrollView>
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
    flexDirection: 'row',
    borderBottomColor: Color.Grey_F5F5F5,
    borderBottomWidth: 1,
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
  },
  menuImage: {
    width: 22,
    height: 22,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    marginHorizontal: 4,
    color: Color.Black,
  },
  title: {
    marginTop: 12,
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Medium',
    color: Color.Black,
    lineHeight: 20,
  },
  intro: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
    lineHeight: 22,
    color: Color.Black,
  },
});
