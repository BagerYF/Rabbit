import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AppBar from '../../../components/appBar';
import { Color } from '../../../theme/color';
import { List } from 'react-native-paper';

export default function Index({ navigation, route }) {
  return (
    <View style={styles.container}>
      <AppBar title={route.params.category} navigation={navigation} />
      <ScrollView>
        {route.params.subCategory.map(e => (
          <List.Item
            key={e.name}
            title={e.name}
            style={{
              height: 48,
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: Color.Grey_F5F5F5,
            }}
            titleStyle={{
              color: Color.Black,
              fontSize: 16,
              height: 18,
              lineHeight: 18,
              fontFamily: 'BaselGrotesk-Regular',
            }}
            right={() => (
              <Image
                style={styles.arrow}
                source={require('../../../images/arrow.png')}
              />
            )}
          />
        ))}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionHeaderContainer: {
    height: 46,
  },
  sectionHeaderLabel: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 20,
    height: 18,
    color: Color.Black,
  },
  listItemContainer: {
    height: 48,
    alignItems: 'center',
    borderBottomColor: Color.Grey_F5F5F5,
    borderBottomWidth: 1,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemLabel: {
    height: 22,
    marginLeft: 16,
    color: Color.Black,
  },
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
});
