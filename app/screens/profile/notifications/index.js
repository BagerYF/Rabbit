import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  Modal,
  Platform,
  AppState,
  NativeModules,
  // NativeEventEmitter,
} from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import AppBar from '../../../components/appBar'
import { Color } from '../../../theme/color'
import { List, Switch } from 'react-native-paper'
import Loading from '../../../components/loading'
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions'

export default function Index({ navigation }) {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [loading, setLoading] = useState(false)
  const { ReactInteraction } = NativeModules
  // const testManagerEmitter = new NativeEventEmitter(ReactInteraction);

  const appState = useRef(AppState.currentState)

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    const subscription = testManagerEmitter.addListener('EventInit', (e) =>
      console.log(e)
    )

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
      subscription.remove()
    }
  }, [])

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      initNotificationStatus()
    }

    appState.current = nextAppState
  }

  useEffect(() => {
    initNotificationStatus()
  }, [])

  const onToggleSwitch = async () => {
    await openSettings().catch(() => console.log('cannot open settings'))
  }

  initNotificationStatus = async () => {
    checkNotifications().then(({ status }) => {
      if (status === 'granted') {
        setIsSwitchOn(true)
      } else {
        setIsSwitchOn(false)
      }
    })
  }

  requestPermission = () => {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
      console.log(result)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar
          title='Notifications'
          navigation={navigation}
          bagEnable={true}
        />
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginVertical: 16,
              color: Color.Black,
              lineHeight: 20,
            }}
          >
            Receive push notifications from us to get latest offers and
            promotion.
          </Text>
          <List.Item
            key={'Push Notifications'}
            title={'Push Notifications'}
            style={styles.item}
            titleStyle={styles.itemTitle}
            right={() => (
              <TouchableOpacity onPress={() => onToggleSwitch()}>
                <Image
                  style={styles.toggle}
                  source={
                    isSwitchOn
                      ? require('../../../images/toggle_selected.png')
                      : require('../../../images/toggle_unselected.png')
                  }
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        {loading && <Loading />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemTitle: {
    color: Color.Black,
    fontSize: 16,
    height: 18,
    lineHeight: 18,
    fontFamily: 'BaselGrotesk-Regular',
  },
  item: {
    height: 48,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey_F5F5F5,
  },
  toggle: {
    width: 48,
    height: 24,
    marginTop: 4,
    marginRight: 8,
  },
})
