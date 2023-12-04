import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import AppBar from '../../../components/appBar'
import { List } from 'react-native-paper'
import { Color } from '../../../theme/color'
import { useQuery, useLazyQuery } from '@apollo/client'
import { apolloClient } from '../../../server/graphql'
import ProductSchemas from '../../../server/graphql/schema/product_schema'

export default function Index({ navigation, props }) {
  const [first, setFirst] = useState(6)
  const [data, setData] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(0)
  const [noMore, setNoMore] = useState(false)
  const [isRereshing, setIsRereshing] = useState(false)
  const [endCursor, setEndCursor] = useState('')

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = async () => {
    setIsRereshing(true)
    var result = await apolloClient.query({
      query: ProductSchemas.productList,
      variables: {
        first: 30,
      },
    })
    setIsRereshing(false)
    setNoMore(false)
    setData([...result.data.products.edges])
    setEndCursor(result.data.products.pageInfo.endCursor)
  }

  const onLoading = async () => {
    if (noMore) {
      return
    }
    setLoadingMore(true)
    var result = await apolloClient.query({
      query: ProductSchemas.productList,
      variables: {
        first: 30,
        after: endCursor,
      },
    })
    setData([...data, ...result.data.products.edges])
    setLoadingMore(false)
    if (result.data.products.pageInfo.hasNextPage == false) {
      setNoMore(true)
    } else {
      setNoMore(false)
    }
    setEndCursor(result.data.products.pageInfo.endCursor)
  }

  const LoadMoreView = useMemo(
    () => (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator
          style={{
            color: Color.Grey_9E9E9E,
            margin: 10,
          }}
          size={'large'}
          color={'black'}
          animating={true}
        />
        <Text>Loading more</Text>
      </View>
    ),
    []
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppBar title='Product' navigation={navigation} elevation={1} />
        <View style={styles.menu}>
          <View style={styles.menuFilter}>
            <Image
              style={styles.menuImage}
              resizeMode={'contain'}
              source={require('../../../images/product_refine.png')}
            />
            <Text style={styles.menuText}>Filter</Text>
          </View>
          <View style={styles.menuSort}>
            <Text style={styles.menuText}>New In</Text>
            <Image
              style={styles.menuImage}
              resizeMode={'contain'}
              source={require('../../../images/product_down_arrow.png')}
            />
          </View>
        </View>
        <FlatList
          style={{
            marginHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          //Set pull-up loading
          ListFooterComponent={loadingMore ? LoadMoreView : null}
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                onRefresh()
              }}
              refreshing={isRereshing}
            />
          }
          onEndReached={() => {
            onLoading()
          }}
          numColumns={'2'}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('ProductDetail', {
                    id: item.node.id,
                  })
                }}
              >
                <View style={styles.item}>
                  <Image
                    style={{ width: 150, height: 210 }}
                    resizeMode={'contain'}
                    source={{
                      uri:
                        item.node.images.edges.length > 0
                          ? item.node.images.edges[0].node.url
                          : 'https://img2.baidu.com/it/u=1585458193,188380332&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
                    }}
                  />
                  <Text style={styles.itemTitle}>{item.node.title}</Text>
                  <Text style={styles.itemProductType}>
                    {item.node.productType}
                  </Text>
                  <Text style={styles.itemVendor}>{item.node.vendor}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          {...props}
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
  arrow: {
    width: 8,
    height: 16,
    marginTop: 8,
    marginRight: 8,
  },
  item: {
    width: (Dimensions.get('window').width - 60) / 2.0,
    height: 280,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Black,
    marginTop: 10,
    marginBottom: 5,
  },
  itemProductType: {
    fontSize: 12,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Grey_9E9E9E,
  },
  itemVendor: {
    fontSize: 12,
    fontFamily: 'BaselGrotesk-Regular',
    color: Color.Grey_757575,
  },
  menu: {
    marginHorizontal: 16,
    height: 24,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuSort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    width: 15,
    height: 11,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'BaselGrotesk-Regular',
    marginHorizontal: 4,
    color: Color.Black,
  },
})
