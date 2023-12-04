import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import { kSuggestedMaps } from '../data';
import { Color } from '../../../theme/color';

export default function index(prop) {
  return (
    <ScrollView>
      <List.Section
        key="Designer Section"
        style={{
          marginTop: 0,
        }}>
        <List.Subheader
          style={{
            height: 24,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 24,
            marginBottom: 9,
            lineHeight: 24,
            fontSize: 14,
            fontFamily: 'BaselGrotesk-Regular',
          }}>
          Search History
        </List.Subheader>
        {prop.hisList.map(e => (
          <List.Item
            key={e}
            title={e}
            style={{
              height: 48,
              justifyContent: 'center',
              //   borderBottomWidth: 1,
              //   borderBottomColor: Color.Grey_F5F5F5,
            }}
            titleStyle={{
              color: Color.Black,
              fontSize: 16,
              height: 18,
              lineHeight: 18,
              fontFamily: 'BaselGrotesk-Regular',
            }}
          />
        ))}
      </List.Section>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
});
