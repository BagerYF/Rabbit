import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../../../../components/appBar'
import { AlphabetList } from 'react-native-section-alphabet-list'
import { Color } from '../../../../theme/color'

export default function Index({ navigation, route }) {
  const { routeName, type, data, selectedCode } = route.params

  const [listData, setListData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCancelBtn, setShowCancelBtn] = useState(false)

  const onChangeSearch = (query) => setSearchQuery(query)

  useEffect(() => {
    var tempList = data.map((e) => ({
      value: e.name,
      key: e.name,
      allValue: e,
    }))
    setListData(tempList)

    Keyboard.addListener('keyboardDidShow', () => {
      setShowCancelBtn(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setShowCancelBtn(false)
    })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [setListData])

  const cancelClick = () => {
    setShowCancelBtn(false)
    Keyboard.dismiss()
  }

  const onChangeText = (text) => {
    setSearchQuery(text)
    if (text.length == 0) {
      var tempList = data.map((e) => ({
        value: e.name,
        key: e.name,
        allValue: e,
      }))
      setListData(tempList)
    } else {
      var tempList = data
        .filter((e) => e.name.toLowerCase().indexOf(text.toLowerCase()) != -1)
        .map((e) => ({ value: e.name, key: e.name, allValue: e }))
      setListData(tempList)
    }
  }

  return (
    <View style={styles.container}>
      {showCancelBtn ? null : (
        <AppBar
          title={`Select your ${type}`}
          navigation={navigation}
          bagEnable={true}
          closeAble={true}
        />
      )}
      <View style={styles.searchBarBg}>
        <View
          style={showCancelBtn ? styles.searchBarWithCancel : styles.searchBar}
        >
          <Image
            source={require('../../../../images/search.png')}
            style={{
              width: 19,
              height: 19,
              marginHorizontal: 10,
            }}
          />
          <TextInput
            style={
              showCancelBtn
                ? styles.searchBarInputWithCancel
                : styles.searchBarInput
            }
            onChangeText={(text) => onChangeText(text)}
            value={searchQuery}
            placeholder={'Search'}
            placeholderTextColor={Color.Grey_9E9E9E}
            cursorColor={Color.Black}
            clearButtonMode='while-editing'
            contextMenuHidden={true}
          />
        </View>
        {showCancelBtn ? (
          <TouchableOpacity onPress={cancelClick}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <AlphabetList
        data={listData}
        style={styles.alphabetList}
        indexLetterStyle={styles.indexLetter}
        indexContainerStyle={styles.indexContainer}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}
        renderCustomItem={(item) => (
          <TouchableOpacity
            onPress={() => {
              var param = {}
              param[type] = item.allValue
              navigation.navigate({
                name: routeName,
                params: param,
                merge: true,
              })
            }}
          >
            <View style={styles.listItemContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {type === 'country' ? (
                  <Image
                    style={styles.img}
                    source={{
                      uri: `https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/${item.allValue.code}.png`,
                    }}
                  />
                ) : null}
                <Text style={styles.listItemLabel}>{item.allValue.name}</Text>
              </View>
              {item.allValue.code === selectedCode ? (
                <Image
                  source={require('../../../../images/selected.png')}
                  style={{
                    width: 16,
                    height: 16,
                    marginHorizontal: 10,
                  }}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
// https://d1mp1ehq6zpjr9.cloudfront.net/static/images/flags/
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  alphabetList: {
    marginBottom: 100,
    backgroundColor: '#fff',
  },
  indexLetter: {
    color: 'black',
    fontSize: 9,
    width: 10,
  },
  indexContainer: {
    width: 10,
    marginRight: 5,
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
  img: {
    width: 16,
    height: 16,
    marginLeft: 10,
    borderRadius: 8,
  },
  searchBarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  searchBar: {
    width: Dimensions.get('window').width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginVertical: 12,
    backgroundColor: Color.Grey_EEEEEE,
    height: 40,
  },
  searchBarWithCancel: {
    width: Dimensions.get('window').width - 32 - 64,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginVertical: 12,
    backgroundColor: Color.Grey_EEEEEE,
    height: 40,
  },
  searchBarInput: {
    width: Dimensions.get('window').width - 32 - 64,
    height: 40,
    fontSize: 14,
    color: Color.Black,
    padding: 0,
  },
  searchBarInputWithCancel: {
    width: Dimensions.get('window').width - 80 - 64,
    height: 40,
    fontSize: 14,
    color: Color.Black,
    padding: 0,
  },
  cancelBtn: {
    height: 40,
    lineHeight: 40,
    color: Color.Black,
    fontSize: 16,
  },
})
