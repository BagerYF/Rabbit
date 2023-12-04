import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home'
import DesignersScreen from '../screens/designers'
import SearchScreen from '../screens/search'
import WishlistScreen from '../screens/wishlist'
import ProfileScreen from '../screens/profile'

import { Color } from '../theme/color'

const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='0'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // tabBarStyle: { position: 'absolute' },
        tabBarLabelStyle: { fontFamily: 'BaselGrotesk-Regular' },
        tabBarActiveTintColor: Color.Black,
        tabBarInactiveTintColor: Color.Grey_BDBDBD,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='0'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarLabelStyle: { fontFamily: 'BG' },
          // tabBarActiveTintColor: Color.Black,
          // tabBarInactiveTintColor: Color.Grey_BDBDBD,
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_home_s.png')}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_home.png')}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='1'
        component={DesignersScreen}
        options={{
          tabBarLabel: 'Designers',
          // tabBarLabelStyle: { fontFamily: 'BG' },
          // tabBarActiveTintColor: Color.Black,
          // tabBarInactiveTintColor: Color.Grey_BDBDBD,
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_designers_s.png')}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_designers.png')}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='2'
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          // tabBarHideOnKeyboard: true,
          // tabBarLabelStyle: { fontFamily: 'BG' },
          // tabBarActiveTintColor: Color.Black,
          // tabBarInactiveTintColor: Color.Grey_BDBDBD,
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_search_s.png')}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_search.png')}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='3'
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          // tabBarLabelStyle: { fontFamily: 'BG' },
          // tabBarActiveTintColor: Color.Black,
          // tabBarInactiveTintColor: Color.Grey_BDBDBD,
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_wishlist_s.png')}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_wishlist.png')}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='4'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          // tabBarLabelStyle: { fontFamily: 'BG' },
          // tabBarActiveTintColor: Color.Black,
          // tabBarInactiveTintColor: Color.Grey_BDBDBD,
          // headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_profile_s.png')}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={require('../images/tab_profile.png')}
                />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabs

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26,
  },
})
