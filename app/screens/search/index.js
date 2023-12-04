import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../../components/appBar'
import { Color } from '../../theme/color'
import { kCategoryMaps, kSuggestedMaps } from './data'
import { List } from 'react-native-paper'
import { SearchPageStatus } from '../../constants/enum'
import Suggested from './suggested'
import History from './history'
import * as storage from '../../utils/storage'

export default function Index({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCancelBtn, setShowCancelBtn] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [department, setDepartment] = useState('')
  const [pageStatus, setPageStatus] = useState(SearchPageStatus.Normal)
  const [historyList, setHistoryList] = useState([])

  const onChangeSearch = (query) => setSearchQuery(query)

  useEffect(() => {
    setDepartment(kCategoryMaps[0]['name'])
    setCategoryList(kCategoryMaps[0]['children'])

    Keyboard.addListener('keyboardDidShow', () => {
      changeCancelStatus(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      changeCancelStatus(false)
    })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [setDepartment])

  const cancelClick = () => {
    changeCancelStatus(false)
    Keyboard.dismiss()
  }

  const onChangeText = (text) => {
    setSearchQuery(text)
    if (text.length == 0) {
    } else {
    }
  }

  const onSubmitEditing = async () => {
    if (searchQuery.length > 0) {
      var d = await storage.getItem(storage.StorageKeys.SearchHistoryKey)
      var historyList = []
      if (d != null) {
        historyList = [...d]
        for (let index = 0; index < historyList.length; index++) {
          const element = historyList[index]
          if (element == searchQuery) {
            historyList.splice(index, 1)
            break
          }
        }
      }
      historyList.splice(0, 0, searchQuery)
      if (historyList.length > 5) {
        historyList = historyList.slice(0, 5)
      }
      await storage.setItem(storage.StorageKeys.SearchHistoryKey, historyList)
    }
  }

  const changeCancelStatus = async (status) => {
    setShowCancelBtn(status)
    if (status) {
      var d = await storage.getItem(storage.StorageKeys.SearchHistoryKey)
      if (d != null) {
        setHistoryList(d)
        setPageStatus(SearchPageStatus.History)
      } else {
        setPageStatus(SearchPageStatus.Suggested)
      }
    } else {
      setPageStatus(SearchPageStatus.Normal)
    }
  }

  const departmentClick = (e) => {
    setDepartment(e.name)
    setCategoryList(e.children)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {showCancelBtn ? (
          <View style={{ paddingTop: StatusBar.currentHeight }}></View>
        ) : (
          <AppBar title='Search' backEnable='true' navigation={navigation} />
        )}
        <View style={styles.searchBarBg}>
          <View
            style={
              showCancelBtn ? styles.searchBarWithCancel : styles.searchBar
            }
          >
            <Image
              source={require('../../images/search.png')}
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
              onSubmitEditing={() => onSubmitEditing()}
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
        {pageStatus == SearchPageStatus.Normal ? (
          <View>
            <View style={{ marginTop: 8, marginLeft: 16, marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.Black,
                }}
              >
                Department
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 14,
                marginBottom: 16,
              }}
            >
              {kCategoryMaps.map((e) => (
                <TouchableOpacity
                  key={e.name}
                  onPress={() => {
                    departmentClick(e)
                  }}
                >
                  <View
                    style={
                      e.name == department
                        ? styles.departmentBgSelected
                        : styles.departmentBg
                    }
                  >
                    <Text
                      style={
                        e.name == department
                          ? styles.departmentTextSeleted
                          : styles.departmentText
                      }
                    >
                      {e.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {categoryList.map((e) => (
              <List.Item
                onPress={() => {
                  navigation.push('CategoryList', {
                    category: e.name,
                    subCategory: e.children,
                  })
                }}
                key={e.name}
                title={e.name}
                style={{
                  height: 48,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: Color.Grey_F5F5F5,
                }}
                titleStyle={{
                  color: e.name == 'Sale' ? Color.Red : Color.Black,
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
          </View>
        ) : (
          <View></View>
        )}
        {pageStatus == SearchPageStatus.Suggested ? (
          <Suggested />
        ) : (
          <View></View>
        )}
        {pageStatus == SearchPageStatus.History ? (
          <History hisList={historyList} />
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  departmentBgSelected: {
    backgroundColor: Color.Black,
    marginRight: 10,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  departmentTextSeleted: {
    color: '#fff',
    marginHorizontal: 15,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
  },
  departmentBg: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Color.Grey_EEEEEE,
    marginRight: 10,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  departmentText: {
    color: Color.Grey_616161,
    marginHorizontal: 15,
    fontSize: 16,
    fontFamily: 'BaselGrotesk-Regular',
  },
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
})
