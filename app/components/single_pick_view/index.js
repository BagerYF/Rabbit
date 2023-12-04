import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react'
import { Color } from '../../theme/color'
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { Button } from 'react-native-paper'
import Picker from 'react-native-animated-wheel-picker'

export default function Index(props) {
  const bottomSheetRef = useRef(null)

  const { title, data, callBack, refs } = props

  var dataList = useMemo(
    () =>
      data.map((e) => {
        return { title: e }
      }),
    [data]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const refPicker = useRef(null)

  const handleSheetChanges = useCallback((index) => {}, [])

  useImperativeHandle(refs, () => ({
    showView: () => {
      bottomSheetRef.current.snapToIndex(1)
    },
  }))

  const renderBackdrop = (props) => {
    const { animatedIndex, style } = props
    return (
      <BottomSheetBackdrop
        {...props}
        style={{ ...props.style, backgroundColor: '#000' }}
        pressBehavior={'close'}
      />
    )
  }

  onSubmit = () => {
    bottomSheetRef.current.snapToIndex(0)
    callBack(data[selectedIndex])
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      contentHeight={340}
      snapPoints={[1, 340]}
      backdropComponent={renderBackdrop}
      statusBarTranslucent={true}
      enableContentPanningGesture={false}
      onChange={handleSheetChanges}
    >
      <View style={styles.container}>
        <View
          style={{
            width: Dimensions.get('window').width - 32,
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 20,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.snapToIndex(0)
            }}
          >
            <Image
              source={require('../../images/nav_close.png')}
              style={{ width: 12, height: 12 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width,
            height: 200,
            position: 'relative',
          }}
        >
          <Picker
            pickerData={dataList}
            textStyle={{ fontSize: 16 }}
            itemHeight={40}
            maskedComponents={
              <>
                <View
                  style={{
                    height: 40 * Math.trunc(5 / 2),
                    backgroundColor: Color.Grey_757575,
                  }}
                />
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#000',
                  }}
                />
                <View
                  style={{
                    height: 40 * Math.trunc(5 / 2),
                    backgroundColor: Color.Grey_757575,
                  }}
                />
              </>
            }
            onSelected={(item, index) => {
              setSelectedIndex(index)
            }}
          />
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: Color.Grey_BDBDBD,
              position: 'absolute',
              top: 80,
            }}
          />
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 1,
              backgroundColor: Color.Grey_BDBDBD,
              position: 'absolute',
              top: 120,
            }}
          />
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Button
            buttonColor={Color.Black}
            mode='contained'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 44,
              borderRadius: 2,
            }}
            contentStyle={{
              height: 44,
            }}
            labelStyle={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Medium',
              color: '#fff',
            }}
            onPress={onSubmit}
          >
            Select
          </Button>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
})
