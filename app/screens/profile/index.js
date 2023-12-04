import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppBar from '../../components/appBar';
import { List } from 'react-native-paper';
import { Color } from '../../theme/color';
import { Button } from 'react-native-paper';
import * as storage from '../../utils/storage';

export default function Index({ navigation, route }) {
  const [isLogin, setIsLogin] = useState(false);
  const [customer, setCustomer] = useState();

  React.useEffect(() => {
    initCustomer();

    const listener = DeviceEventEmitter.addListener(
      'ProfileUpdate',
      customerInfo => {
        setCustomer(customerInfo);
        setIsLogin(true);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  initCustomer = async () => {
    var tempCustomerInfo = await storage.getItem(storage.StorageKeys.Customer);
    if (tempCustomerInfo) {
      setCustomer(tempCustomerInfo);
      setIsLogin(true);
    }
  };

  logout = () => {
    setIsLogin(false);
    setCustomer(null);
    storage.removeItem(storage.StorageKeys.TokenInfo);
    storage.removeItem(storage.StorageKeys.Customer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'white'}
          barStyle={'dark-content'}
          translucent={true}
        />
        <AppBar title="Profile" backEnable="true" navigation={navigation} />
        <ScrollView>
          {!isLogin ? (
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'BaselGrotesk-Medium',
                  lineHeight: 22,
                  marginTop: 24,
                  color: Color.Black,
                }}>
                Login
              </Text>
              <Text
                style={{
                  width: 240,
                  fontSize: 16,
                  fontFamily: 'BaselGrotesk-Regular',
                  lineHeight: 22,
                  marginTop: 10,
                  marginBottom: 20,
                  color: Color.Black,
                  textAlign: 'center',
                }}>
                Login to manage your orders and fast-track checkout
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  mode="outlined"
                  style={{
                    width: (Dimensions.get('window').width - 46) / 2.0,
                    height: 40,
                    borderRadius: 2,
                    marginBottom: 20,
                    backgroundColor: Color.Black,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    lineHeight: 38,
                    fontFamily: 'BaselGrotesk-Regular',
                    color: '#fff',
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                  onPress={() => {
                    navigation.push('Login', { isLogin: true });
                  }}>
                  Login
                </Button>
                <Button
                  mode="outlined"
                  style={{
                    width: (Dimensions.get('window').width - 46) / 2.0,
                    height: 40,
                    borderRadius: 2,
                    marginBottom: 20,
                    marginLeft: 14,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    lineHeight: 38,
                    fontFamily: 'BaselGrotesk-Regular',
                    color: Color.Black,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                  onPress={() => {
                    navigation.push('Login', { isLogin: false });
                  }}>
                  Register
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BaselGrotesk-Regular',
                  lineHeight: 20,
                  marginLeft: 16,
                  marginTop: 24,
                  color: Color.Black,
                }}>
                Welcome {customer.displayName}
              </Text>
              <TouchableOpacity onPress={logout}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BaselGrotesk-Regular',
                    lineHeight: 30,
                    marginLeft: 16,
                    marginBottom: 30,
                    color: Color.Grey_9E9E9E,
                  }}>
                  Sign out
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <List.Section
            key="Profile Section"
            style={{
              marginTop: 0,
            }}>
            {isLogin ? (
              <View>
                <List.Item
                  key={'My Orders'}
                  title={'My Orders'}
                  style={styles.item}
                  titleStyle={styles.itemTitle}
                  right={() => (
                    <Image
                      style={styles.arrow}
                      source={require('../../images/arrow.png')}
                    />
                  )}
                  onPress={() => {
                    navigation.push('OrderList');
                  }}
                />
                <List.Item
                  key={'Saved Address'}
                  title={'Saved Address'}
                  style={styles.item}
                  titleStyle={styles.itemTitle}
                  right={() => (
                    <Image
                      style={styles.arrow}
                      source={require('../../images/arrow.png')}
                    />
                  )}
                  onPress={() => {
                    navigation.push('AddressList');
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
            <List.Subheader style={styles.header}>Settings</List.Subheader>
            <List.Item
              key={'Region'}
              title={'Region'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('Region');
              }}
            />
            <List.Item
              key={'Notifications'}
              title={'Notifications'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('Notifications');
              }}
            />
            <List.Subheader style={styles.header}>Support</List.Subheader>
            <List.Item
              key={'About'}
              title={'About'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('About');
              }}
            />
            <List.Item
              key={'Help and Contacts'}
              title={'Help and Contacts'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('HelpAndContacts');
              }}
            />
            <List.Item
              key={'FAQ'}
              title={'FAQ'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('FAQ');
              }}
            />
            <List.Item
              key={'Return and Refunds'}
              title={'Return and Refunds'}
              style={styles.item}
              titleStyle={styles.itemTitle}
              right={() => (
                <Image
                  style={styles.arrow}
                  source={require('../../images/arrow.png')}
                />
              )}
              onPress={() => {
                navigation.push('ReturnAndRefunds');
              }}
            />
          </List.Section>
          {isLogin ? (
            <View style={{ alignItems: 'center' }}>
              <Button
                mode="outlined"
                style={{
                  width: 108,
                  height: 32,
                  borderRadius: 2,
                  marginTop: 40,
                  marginBottom: 8,
                }}
                labelStyle={{
                  fontSize: 14,
                  lineHeight: 30,
                  color: Color.Black,
                  marginTop: 0,
                  marginBottom: 0,
                }}
                onPress={logout}>
                Log out
              </Button>
            </View>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            onPress={() => navigation.push('TermsAndConditions')}>
            <Text
              style={{
                width: 150,
                height: 24,
                marginTop: 40,
                marginBottom: 8,
                marginLeft: 16,
                fontSize: 14,
                fontFamily: 'BaselGrotesk-Regular',
                lineHeight: 22,
                color: Color.Black,
              }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('PrivacyPolicy')}>
            <Text
              style={{
                width: 150,
                height: 24,
                marginBottom: 8,
                marginLeft: 16,
                fontSize: 14,
                fontFamily: 'BaselGrotesk-Regular',
                lineHeight: 22,
                color: Color.Black,
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              width: 150,
              height: 24,
              marginBottom: 50,
              marginLeft: 16,
              fontSize: 14,
              fontFamily: 'BaselGrotesk-Regular',
              lineHeight: 22,
              color: Color.Grey_9E9E9E,
            }}>
            App Version 1.0.0
          </Text>
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
  header: {
    height: 24,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 24,
    marginBottom: 9,
    lineHeight: 24,
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
  },
  itemTitle: {
    color: Color.Black,
    fontSize: 16,
    height: 18,
    lineHeight: 18,
    fontFamily: 'BaselGrotesk-Regular',
  },
  item: {
    height: 48,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey_F5F5F5,
  },
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
});
