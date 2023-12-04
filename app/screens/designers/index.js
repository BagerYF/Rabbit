import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import AppBar from '../../components/appBar';
import { List } from 'react-native-paper';
import { Color } from '../../theme/color';
import { kDesigersMaps } from './data';

export default function Index({ navigation }) {
  const goDesignersList = () => {
    navigation.push('DesignersList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title="Designers" backEnable="true" navigation={navigation} />
        <ScrollView showsHorizontalScrollIndicator="false">
          <TouchableHighlight
            underlayColor={Color.Grey_F5F5F5}
            onPress={goDesignersList}>
            <List.Item
              key="Designer A-Z"
              title="Designer A-Z"
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
                  source={require('../../images/arrow.png')}
                />
              )}
            />
          </TouchableHighlight>
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
              Featured Designers
            </List.Subheader>
            {kDesigersMaps.map(e => (
              <List.Item
                key={e}
                title={e}
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
                    source={require('../../images/arrow.png')}
                  />
                )}
              />
            ))}
          </List.Section>
          {/* <View style={{ height: 100 }}></View> */}
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
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
});
