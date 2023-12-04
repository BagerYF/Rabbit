import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppBar from '../../../components/appBar';
import { Color } from '../../../theme/color';
import { List, Button } from 'react-native-paper';
import * as storage from '../../../utils/storage';
import { kCountryMaps } from './data';

export default function Index({ navigation, route }) {
  const [region, setRegion] = useState();

  useEffect(() => {
    initRegion();
  }, []);

  initRegion = async () => {
    var tempRegion = await storage.getItem(storage.StorageKeys.Region);
    if (tempRegion === null) {
      tempRegion = kCountryMaps.filter(e => e.code === 'CN')[0];
    }
    setRegion(tempRegion);
  };

  React.useEffect(() => {
    if (route.params?.region) {
      setRegion(route.params?.region);
    }
  }, [route.params?.region]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title="Region" navigation={navigation} bagEnable={true} />
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              color: Color.Black,
              lineHeight: 22,
            }}>
            Your selected region
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              color: Color.Black,
              lineHeight: 15,
            }}>
            Region
          </Text>
          <List.Item
            key="title"
            title={`${region?.name || ''} ${region?.currencyCode || ''}`}
            style={{
              height: 48,
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: Color.Grey_F5F5F5,
              marginHorizontal: 16,
            }}
            titleStyle={{
              color: Color.Black,
              fontSize: 16,
              height: 18,
              lineHeight: 18,
              fontFamily: 'BaselGrotesk-Regular',
            }}
            left={() => (
              <Image
                style={styles.img}
                source={{
                  uri: `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${
                    region?.code || ''
                  }.png`,
                }}
              />
            )}
            right={() => (
              <Image
                style={styles.arrow}
                source={require('../../../images/arrow_down.png')}
              />
            )}
            onPress={() => {
              navigation.push('RegionList');
            }}
          />
        </ScrollView>
        <View
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}>
          <Button
            buttonColor={Color.Black}
            mode="outlined"
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
              storage.setItem(storage.StorageKeys.Region, region);
              navigation.goBack();
            }}>
            Update Region
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    marginTop: 6,
    borderRadius: 8,
    width: 16,
    height: 16,
  },
  arrow: {
    marginTop: 10,
    marginRight: 10,
    width: 12,
    height: 8,
  },
});
