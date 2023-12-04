import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import AppBar from '../../components/appBar'
import { kHomeMaps } from './data'
import Swiper from 'react-native-swiper'
import { Color } from '../../theme/color'
import { Button } from 'react-native-paper'

export default function Index({ navigation }) {
  const goProductList = () => {
    navigation.push('ProductList')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'white'}
          barStyle={'dark-content'}
          translucent={true}
        />
        <AppBar title='Shopify' backEnable='true' navigation={navigation} />
        <ScrollView>
          {kHomeMaps.map((e) => {
            if (e.name == 'FirstSection') {
              return (
                <View key={e.name}>
                  <Swiper
                    style={styles.wrapper}
                    paginationStyle={{ bottom: 20 }}
                    dot={
                      <View
                        style={{
                          backgroundColor: '#E0E0E0',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                    activeDot={
                      <View
                        style={{
                          backgroundColor: '#424242',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                  >
                    {e.items.map((v) => {
                      return (
                        <TouchableOpacity
                          key={v.text}
                          onPress={() => goProductList()}
                        >
                          <View style={styles.slide}>
                            <Image
                              style={{
                                width: 312,
                                height: 382,
                                resizeMode: 'stretch',
                              }}
                              source={{
                                uri:
                                  v.absoluteImageUrl ??
                                  'https://img2.baidu.com/it/u=2716494774,2819221109&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=299',
                              }}
                            />
                            <View
                              style={{
                                width: 312,
                                height: 60,
                              }}
                            >
                              <Text
                                style={{
                                  marginTop: 16,
                                  color: Color.Black,
                                  fontSize: 16,
                                  lineHeight: 18,
                                  fontFamily: 'BaselGrotesk-Regular',
                                }}
                              >
                                {v.text}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: 312,
                                height: 20,
                              }}
                            >
                              <Text
                                style={{
                                  color: Color.Black,
                                  fontSize: 14,
                                  lineHeight: 19,
                                  textDecorationLine: 'underline',
                                }}
                              >
                                Shop Now
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </Swiper>
                </View>
              )
            } else if (
              e.name == 'PrimarySection' ||
              e.name == 'PopularSection'
            ) {
              return (
                <View key={e.name}>
                  {e.items.map((v) => {
                    return (
                      <TouchableOpacity
                        key={v.brand}
                        onPress={() => goProductList()}
                      >
                        <View style={styles.slide}>
                          <Image
                            style={{
                              width: 312,
                              height: 382,
                              resizeMode: 'stretch',
                            }}
                            source={{
                              uri:
                                v.absoluteImageUrl ??
                                'https://img2.baidu.com/it/u=2716494774,2819221109&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=299',
                            }}
                          />
                          <Text style={styles.title}>{v.brand}</Text>
                          <Text style={styles.subTitle}>{v.productName}</Text>
                          <Text style={styles.shopNow}>Shop Now</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            } else if (e.name == 'NewArrivalSection') {
              return (
                <View
                  key={e.name}
                  style={{ alignItems: 'center', marginTop: 30 }}
                >
                  <Text style={styles.title}>{e.title}</Text>
                  <Text style={styles.centerSubTitle}>{e.subTitle}</Text>
                  <Swiper
                    style={styles.wrapper}
                    paginationStyle={{ bottom: 20 }}
                    dot={
                      <View
                        style={{
                          backgroundColor: '#E0E0E0',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                    activeDot={
                      <View
                        style={{
                          backgroundColor: '#424242',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                  >
                    {e.items.map((v) => {
                      return (
                        <TouchableOpacity
                          key={v.text}
                          onPress={() => goProductList()}
                        >
                          <View style={styles.centerSlide}>
                            <Image
                              style={{
                                width: 312,
                                height: 382,
                                resizeMode: 'stretch',
                              }}
                              source={{
                                uri:
                                  v.absoluteImageUrl ??
                                  'https://img2.baidu.com/it/u=2716494774,2819221109&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=299',
                              }}
                            />
                            <View
                              style={{
                                width: 312,
                                height: 60,
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.subTitle}>{v.text}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </Swiper>
                </View>
              )
            } else if (
              e.name == 'NewSeasonSection' ||
              e.name == 'ContemporarySection'
            ) {
              return (
                <View
                  key={e.name}
                  style={{ alignItems: 'center', marginTop: 30 }}
                >
                  <Text style={styles.title}>{e.title}</Text>
                  <Text style={styles.centerSubTitle}>{e.subTitle}</Text>
                  <Swiper
                    style={styles.wrapper}
                    paginationStyle={{ bottom: 20 }}
                    dot={
                      <View
                        style={{
                          backgroundColor: '#E0E0E0',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                    activeDot={
                      <View
                        style={{
                          backgroundColor: '#424242',
                          width: 7,
                          height: 7,
                          borderRadius: 3.5,
                          marginLeft: 7,
                          marginRight: 7,
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    }
                  >
                    {e.items.map((v) => {
                      return (
                        <TouchableOpacity
                          key={v.text}
                          onPress={() => goProductList()}
                        >
                          <View style={styles.centerSlide}>
                            <Image
                              style={{
                                width: 312,
                                height: 382,
                                resizeMode: 'stretch',
                              }}
                              source={{
                                uri:
                                  v.absoluteImageUrl ??
                                  'https://img2.baidu.com/it/u=2716494774,2819221109&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=299',
                              }}
                            />
                            <View
                              style={{
                                width: 312,
                                height: 60,
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.subTitle}>{v.text}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </Swiper>
                  <Button
                    buttonColor={Color.Black}
                    mode='contained'
                    style={{
                      width: Dimensions.get('window').width - 32,
                      height: 40,
                      borderRadius: 2,
                      marginTop: 10,
                      marginBottom: 40,
                    }}
                    labelStyle={{
                      fontSize: 16,
                      color: '#fff',
                    }}
                    onPress={() => console.log('shop now')}
                  >
                    Shop Now
                  </Button>
                </View>
              )
            }
            return null
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    height: 540,
  },
  slide: {
    width: 312,
    flex: 1,
    marginTop: 16,
    marginLeft: 16,
  },
  centerSlide: {
    width: 312,
    flex: 1,
    marginTop: 16,
    marginLeft: 16,
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    color: Color.Black,
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'BaselGrotesk-Regular',
  },
  subTitle: {
    marginTop: 16,
    color: Color.Black,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'BaselGrotesk-Regular',
  },
  centerSubTitle: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
    color: Color.Black,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'BaselGrotesk-Regular',
  },
  shopNow: {
    marginTop: 16,
    marginBottom: 20,
    color: Color.Black,
    fontSize: 14,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
})
