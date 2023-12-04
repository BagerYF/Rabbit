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
import AppBar from '../../../components/appBar'
import { AlphabetList } from 'react-native-section-alphabet-list'
import { Color } from '../../../theme/color'
import { kDesignersAllMaps } from '../data'

export default function Index({ navigation }) {
  const [listData, setListData] = useState([])
  const [allDesigenrs, setAllDesigenrs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCancelBtn, setShowCancelBtn] = useState(false)

  const onChangeSearch = (query) => setSearchQuery(query)

  useEffect(() => {
    var tempAllDesigners = Object.keys(kDesignersAllMaps)
    setAllDesigenrs(tempAllDesigners)
    var tempList = tempAllDesigners.map((e) => ({ value: e, key: e }))
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
  }, [setListData, setAllDesigenrs])

  const cancelClick = () => {
    setShowCancelBtn(false)
    Keyboard.dismiss()
  }

  const onChangeText = (text) => {
    setSearchQuery(text)
    if (text.length == 0) {
      var tempList = allDesigenrs.map((e) => ({ value: e, key: e }))
      setListData(tempList)
    } else {
      var tempList = allDesigenrs
        .filter((e) => e.toLowerCase().indexOf(text.toLowerCase()) != -1)
        .map((e) => ({ value: e, key: e }))
      setListData(tempList)
    }
  }

  return (
    <View style={styles.container}>
      {showCancelBtn ? null : (
        <AppBar title='Designer A-Z' navigation={navigation} />
      )}
      <View style={styles.searchBarBg}>
        <View
          style={showCancelBtn ? styles.searchBarWithCancel : styles.searchBar}
        >
          <Image
            source={require('../../../images/search.png')}
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
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemLabel}>{item.value}</Text>
            <Image
              style={styles.arrow}
              source={require('../../../images/arrow.png')}
            />
          </View>
        )}
      />
    </View>
  )
}

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
  arrow: {
    width: 8,
    height: 16,
    marginRight: 10,
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
