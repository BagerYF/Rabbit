import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppBar from '../../components/appBar'
import { Color } from '../../theme/color'
import { Button } from 'react-native-paper'
import Input from '../../components/input'
import { useForm, Controller, useController } from 'react-hook-form'
import { apolloClient } from '../../server/graphql'
import * as storage from '../../utils/storage'
import LoginSchemas from '../../server/graphql/schema/login_schema'

export default function Index({ navigation, route }) {
  const [isLogin, setIsLogin] = useState(route.params.isLogin)

  useEffect(() => {
    setValue('First Name', 'Tom')
    setValue('Last Name', 'Li')
    setValue('Email', 'Tom1@163.com')
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      Email: 'bager1@163.com',
      Password: '123321',
    },
  })

  const register = async (data) => {
    var result = await apolloClient.mutate({
      mutation: LoginSchemas.customerCreate,
      variables: {
        input: {
          email: 'tom2@163.com',
          password: '123321',
          firstName: 'Tom',
          lastName: 'Li',
          acceptsMarketing: true,
        },
      },
    })
    login()
  }

  const login = async (data) => {
    var result = await apolloClient.mutate({
      mutation: LoginSchemas.customerAccessTokenCreate,
      variables: {
        input: {
          email: 'bager1@163.com',
          password: '123321',
        },
      },
    })
    var tokenInfo = result.data.customerAccessTokenCreate.customerAccessToken
    await storage.setItem(storage.StorageKeys.TokenInfo, tokenInfo)
    queryCustomer()
  }

  const queryCustomer = async () => {
    var token = await storage.getItem(storage.StorageKeys.TokenInfo)
    if (token.accessToken) {
      var result = await apolloClient.query({
        query: LoginSchemas.customer,
        variables: {
          customerAccessToken: token.accessToken,
        },
      })
      var customerInfo = result.data.customer
      storage.setItem(storage.StorageKeys.Customer, customerInfo)
      navigation.goBack()
      DeviceEventEmitter.emit('ProfileUpdate', customerInfo)
    }
  }

  const LoginView = () => {
    return (
      <View>
        <View style={{ margin: 16, marginBottom: 32 }}>
          <Input
            name='Email'
            control={control}
            errors={errors}
            errorMsg='Please enter your Email'
          />
          <Input
            name='Password'
            control={control}
            errors={errors}
            errorMsg='Please enter your Email'
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            mode='outlined'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 40,
              borderRadius: 2,
              marginBottom: 10,
              backgroundColor: Color.Black,
            }}
            labelStyle={{
              fontSize: 16,
              lineHeight: 38,
              fontFamily: 'BaselGrotesk-Regular',
              color: '#fff',
              marginTop: 0,
              marginBottom: 0,
            }}
            onPress={handleSubmit(login)}
          >
            Login
          </Button>
          <Button
            mode='outlined'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 40,
              borderRadius: 2,
              marginBottom: 24,
            }}
            labelStyle={{
              fontSize: 16,
              lineHeight: 38,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
              marginTop: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              setIsLogin(false)
            }}
          >
            Create a new account
          </Button>
          <Button
            mode='text'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 40,
              borderRadius: 2,
              marginBottom: 20,
            }}
            labelStyle={{
              fontSize: 12,
              lineHeight: 38,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
              marginTop: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            Continue as guest
          </Button>
        </View>
      </View>
    )
  }

  const RegisterView = () => {
    return (
      <View>
        <View style={{ margin: 16, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: (Dimensions.get('window').width - 42) / 2,
              }}
            >
              <Input
                name='First Name'
                control={control}
                errors={errors}
                errorMsg='Please enter your first name'
              />
            </View>
            <View
              style={{
                width: (Dimensions.get('window').width - 42) / 2,
              }}
            >
              <Input
                name='Last Name'
                control={control}
                errors={errors}
                errorMsg='Please enter your last name'
              />
            </View>
          </View>
          <Input
            name='Email'
            control={control}
            errors={errors}
            errorMsg='Please enter your Email'
          />
          <Input
            name='Password'
            control={control}
            errors={errors}
            errorMsg='Please enter your Email'
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            mode='outlined'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 40,
              borderRadius: 2,
              marginBottom: 10,
              backgroundColor: Color.Black,
            }}
            labelStyle={{
              fontSize: 16,
              lineHeight: 38,
              fontFamily: 'BaselGrotesk-Regular',
              color: '#fff',
              marginTop: 0,
              marginBottom: 0,
            }}
            onPress={handleSubmit(register)}
          >
            Create account
          </Button>
          <Button
            mode='outlined'
            style={{
              width: Dimensions.get('window').width - 32,
              height: 40,
              borderRadius: 2,
              marginBottom: 24,
            }}
            labelStyle={{
              fontSize: 16,
              lineHeight: 38,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
              marginTop: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              setIsLogin(true)
            }}
          >
            Back to login
          </Button>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BaselGrotesk-Regular',
              color: Color.Black,
              textAlign: 'center',
              lineHeight: 15,
              marginVertical: 20,
              marginHorizontal: 40,
            }}
          >
            By signing up you agree with our{'\n'}
            <Text style={{ color: Color.Grey_9E9E9E }}>
              Terms & Conditions
            </Text>{' '}
            and <Text style={{ color: Color.Grey_9E9E9E }}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar
          title=''
          navigation={navigation}
          bagEnable={true}
          closeAble={true}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'BaselGrotesk-Bold',
              color: Color.Black,
            }}
          >
            Shopify
          </Text>
        </View>
        {isLogin ? <LoginView /> : <RegisterView />}
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
