import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import React from 'react'
import { Color } from '../../theme/color'
import { useForm, Controller, useController } from 'react-hook-form'
import cardValidator from 'card-validator'

export default function Input({
  name,
  control,
  errors,
  placeholder,
  errorMsg,
  optional,
  multiline,
  type,
  onPress,
  hideTitle,
  maxLength,
  keyboardType,
}) {
  function formatNum(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g)
    var match = (matches && matches[0]) || ''
    var parts = []

    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  function formatDate(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{2,4}/g)
    var match = (matches && matches[0]) || ''
    var parts = []

    for (i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2))
    }

    if (parts.length) {
      return parts.join(' / ')
    } else {
      return value
    }
  }

  return (
    <View>
      {!hideTitle && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
      )}
      <Controller
        control={control}
        rules={{
          required: optional ? false : true,
          validate: {
            isValid: (value) => {
              if (name === 'Card Number') {
                var numberValidation = cardValidator.number(value)
                return numberValidation.isValid
              }
              if (name === 'MM / YY') {
                var dateValidation = cardValidator.expirationDate(value)
                return dateValidation.isValid
              }
              if (name === 'Security code') {
                var cvvValidation = cardValidator.cvv(value)
                return cvvValidation.isValid
              }
              return true
            },
          },
          pattern:
            name === 'Email'
              ? /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              : null,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={{
              marginTop: 6,
              borderBottomColor:
                errors[name] && errorMsg
                  ? Color.Red
                  : value
                  ? Color.Black
                  : Color.Grey_9E9E9E,
              borderBottomWidth: 1,
              minHeight: 48,
              justifyContent: 'center',
            }}
          >
            {onPress ? (
              <TouchableOpacity
                onPress={onPress}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={name}
                  multiline={multiline}
                  editable={type === 'selector' ? false : true}
                  cursorColor={Color.Black}
                  color={Color.Black}
                />
                <Image
                  style={{ width: 14, height: 8, marginRight: 10 }}
                  source={require('../../images/arrow_down.png')}
                />
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(e) => {
                  var t = ''
                  if (name === 'Card Number') {
                    t = formatNum(e)
                  } else if (name === 'MM / YY') {
                    t = formatDate(e)
                  } else {
                    t = e
                  }
                  onChange(t)
                }}
                maxLength={maxLength || 30}
                value={value}
                placeholder={name}
                multiline={multiline}
                editable={type === 'selector' ? false : true}
                cursorColor={Color.Black}
                color={Color.Black}
                keyboardType={keyboardType || 'default'}
              />
            )}
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

const styles = StyleSheet.create({
  input: {
    paddingLeft: 0,
  },
})
