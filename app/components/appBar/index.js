import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import * as storage from '../../utils/storage'
import { Color } from '../../theme/color'

const AppBar = (props) => {
  const _goBack = () => console.log('Went back')
  const { elevation, title, backEnable, navigation, closeAble, bagEnable } =
    props

  const [bagNum, setBagNum] = useState(0)

  useEffect(() => {
    var listener
    if (bagEnable === undefined) {
      initCartNum()
      listener = DeviceEventEmitter.addListener('CartUpdate', () => {
        initCartNum()
      })
    }
    return () => {
      if (bagEnable === undefined) {
        listener.remove()
      }
    }
  }, [])

  const initCartNum = async () => {
    var localCart = await storage.getItem(storage.StorageKeys.Cart)
    if (localCart) {
      var tempNum = 0
      localCart.lines.edges.forEach((element) => {
        tempNum += element.node.quantity
      })
      setBagNum(tempNum)
    }
  }

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Appbar.Header
        mode='center-aligned'
        style={{ height: 50, backgroundColor: '#fff' }}
      >
        <View style={{ width: 50 }}>
          {backEnable === undefined ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              {closeAble === undefined ? (
                <Image
                  style={styles.backIcon}
                  source={require('../../images/backarrow.png')}
                />
              ) : (
                <Image
                  style={styles.backIcon}
                  source={require('../../images/nav_close.png')}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        <Appbar.Content title={title} titleStyle={styles.title} />
        {bagEnable === undefined ? (
          <TouchableOpacity
            onPress={() => {
              navigation.push('Cart')
              // navigation.push('Checkout');
            }}
          >
            <View style={{ width: 50 }}>
              <ImageBackground
                style={styles.backIcon}
                source={require('../../images/nav_bag.png')}
              >
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: -10,
                  }}
                >
                  {bagNum > 0 && (
                    <Text
                      style={{
                        marginTop: 8,
                        color: Color.Black,
                        backgroundColor: '#fff',
                        fontSize: 10,
                        fontFamily: 'BaselGrotesk-Medium',
                        paddingHorizontal: 1,
                      }}
                    >
                      {bagNum}
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ) : null}
      </Appbar.Header>
      {elevation === undefined ? null : (
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            height: elevation,
            backgroundColor: '#f5f5f5',
          }}
        ></View>
      )}
    </View>
  )
}

export default AppBar

const styles = StyleSheet.create({
  backIcon: {
    width: 16,
    height: 16,
    marginLeft: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'BaselGrotesk-Medium',
    color: '#000',
  },
})
