import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack'
import MainTabs from './TabStack.js'
import DesignersScreen from '../screens/designers'
import DesignersListScreen from '../screens/designers/designers_list'
import CategoryListScreen from '../screens/search/category_list'
import ProductListScreen from '../screens/product/product_list'
import ProductDetailScreen from '../screens/product/product_detail'
import CartScreen from '../screens/cart'
import AboutScreen from '../screens/profile/about'
import ReturnAndRefundsScreen from '../screens/profile/return_and_refunds'
import TermsAndConditionsScreen from '../screens/profile/terms_and_conditions'
import PrivacyPolicyScreen from '../screens/profile/privacy_policy'
import FaqScreen from '../screens/profile/faq'
import NotificationsScreen from '../screens/profile/notifications'
import HelpAndContactsScreen from '../screens/profile/help_and_contacts'
import RegionScreen from '../screens/profile/region'
import RegionListScreen from '../screens/profile/region/region_list'
import LoginScreen from '../screens/login'
import AddressListScreen from '../screens/profile/address/address_list'
import AddressEditScreen from '../screens/profile/address/address_edit'
import AddressCountryScreen from '../screens/profile/address/address_country'
import OrderListScreen from '../screens/profile/order/order_list'
import OrderDetailScreen from '../screens/profile/order/order_detail'
import CheckoutScreen from '../screens/checkout'

export default function Index() {
  const Stack = createStackNavigator()
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  }
  return (
    <Stack.Navigator
      initialRouteName='main'
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='main' component={MainTabs} />
      <Stack.Screen name='DesignersList' component={DesignersListScreen} />
      <Stack.Screen name='CategoryList' component={CategoryListScreen} />
      <Stack.Screen name='ProductList' component={ProductListScreen} />
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name='About' component={AboutScreen} />
      <Stack.Screen
        name='ReturnAndRefunds'
        component={ReturnAndRefundsScreen}
      />
      <Stack.Screen
        name='TermsAndConditions'
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} />
      <Stack.Screen name='FAQ' component={FaqScreen} />
      <Stack.Screen name='Notifications' component={NotificationsScreen} />
      <Stack.Screen name='HelpAndContacts' component={HelpAndContactsScreen} />
      <Stack.Screen name='Region' component={RegionScreen} />
      <Stack.Screen
        name='RegionList'
        component={RegionListScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name='AddressList' component={AddressListScreen} />
      <Stack.Screen name='AddressEdit' component={AddressEditScreen} />
      <Stack.Screen
        name='AddressCountry'
        component={AddressCountryScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name='OrderList' component={OrderListScreen} />
      <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
