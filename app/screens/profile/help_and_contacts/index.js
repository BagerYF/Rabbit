import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import React, { useRef } from 'react'
import AppBar from '../../../components/appBar'
import { Color } from '../../../theme/color'
import { useForm, Controller } from 'react-hook-form'
// import { Button, RadioButton } from 'react-native-paper'
import Input from '../../../components/input'
import SinglePickView from '../../../components/single_pick_view'

export default function Index({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      Name: '',
      Email: '',
    },
  })

  const pickViewRef = useRef()

  const onSubmit = (data) => console.log(data)

  const Radio = ({
    name,
    control,
    errors,
    placeholder,
    errorMsg,
    optional,
    values,
  }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              color: Color.Black,
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              marginTop: 16,
              lineHeight: 17,
            }}
          >
            {name}
            {optional ? '' : '*'}
          </Text>
          {optional ? (
            <Text
              style={{
                color: Color.Grey_9E9E9E,
                fontSize: 12,
                fontFamily: 'BaselGrotesk-Regular',
                marginTop: 16,
                lineHeight: 17,
              }}
            >
              optional
            </Text>
          ) : null}
        </View>
        <Controller
          control={control}
          rules={{
            required: optional ? false : true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                flex: 1,
              }}
            >
              <RadioButton.Group
                onValueChange={onChange}
                value={value}
                onBlur={onBlur}
              >
                {values.map((e) => {
                  return (
                    <View
                      key={e}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <RadioButton value={e} color={Color.Black} />
                      <Text>{e}</Text>
                    </View>
                  )
                })}
              </RadioButton.Group>
            </View>
          )}
          name={name}
        />
        {errors[name] && errorMsg && (
          <Text
            style={{
              color: Color.Red,
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              marginTop: 8,
            }}
          >
            {errorMsg}
          </Text>
        )}
      </View>
    )
  }

  const typeList = [
    'Trouble placing an order',
    'Product information',
    'Status of my order',
    'Delivery tracking',
    'Product I received',
    'Returns',
    'Refunds',
    'Change my address',
  ]

  const slectEnquiryType = () => {
    clearErrors('Enquiry Type')
    pickViewRef.current.showView()
  }

  slectEnquiryTypeCallBack = (type) => {
    setValue('Enquiry Type', type)
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'cyan',
        padding: 16,
        height: 300,
      }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Text>Swipe down to close</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#00000000'}
          barStyle={'dark-content'}
          translucent={true}
        />
        <AppBar
          title='Help And Contacts'
          navigation={navigation}
          bagEnable={true}
        />
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              color: Color.Black,
              lineHeight: 20,
            }}
          >
            To submit an inquiry simply complete the contact form below and tap
            ‘Send’. We aim to get back to you in one business day.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Regular',
              marginHorizontal: 16,
              marginTop: 16,
              color: Color.Black,
              lineHeight: 20,
            }}
          >
            For information relating to common questions and inquiries please
            see the links below:
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BaselGrotesk-Regular',
                marginHorizontal: 16,
                marginTop: 16,
                color: Color.Grey_757575,
                lineHeight: 20,
                textDecorationLine: 'underline',
                textDecorationColor: Color.Grey_757575,
              }}
            >
              Frequently Asked Questions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BaselGrotesk-Regular',
                marginHorizontal: 16,
                marginTop: 10,
                color: Color.Grey_757575,
                lineHeight: 20,
                textDecorationLine: 'underline',
                textDecorationColor: Color.Grey_757575,
              }}
            >
              Orders and Shipping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BaselGrotesk-Regular',
                marginHorizontal: 16,
                marginTop: 10,
                color: Color.Grey_757575,
                lineHeight: 20,
                textDecorationLine: 'underline',
                textDecorationColor: Color.Grey_757575,
              }}
            >
              Returns and Refunds
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BaselGrotesk-Medium',
              marginTop: 33,
              marginLeft: 16,
              marginBottom: 8,
              color: Color.Black,
            }}
          >
            Contact Form
          </Text>
          <View style={{ marginHorizontal: 16 }}>
            <Input
              name='Name'
              control={control}
              errors={errors}
              errorMsg='Please enter your name'
            />
            <Input
              name='Email'
              control={control}
              errors={errors}
              errorMsg='Please enter a valid email adress'
            />
            <Input
              name='Phone'
              control={control}
              errors={errors}
              optional={true}
            />
            <Radio
              name='Is this Enquiry related to an existing order?'
              control={control}
              errors={errors}
              errorMsg='Please select a status'
              values={['Yes', 'No']}
            />
            <Input
              name='Enquiry Type'
              control={control}
              errors={errors}
              type='selector'
              onPress={slectEnquiryType}
              errorMsg='Please select a type'
            />
            <Input
              name='Message'
              control={control}
              errors={errors}
              errorMsg='Please enter a message'
              multiline={true}
            />
          </View>
          <View style={{ height: 40 }}></View>
        </ScrollView>
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
            onPress={handleSubmit(onSubmit)}
          >
            Send
          </Button>
        </View>
        <SinglePickView
          refs={pickViewRef}
          title={'Please select a type'}
          data={typeList}
          callBack={slectEnquiryTypeCallBack}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
