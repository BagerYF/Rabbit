import { Linking } from 'react-native'

const urls = {}

export default function Linking(url) {
  var baiduURL = 'https://www.google.com'

  Linking.canOpenURL(baiduURL).then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + baiduURL)
    } else {
      return Linking.openURL(baiduURL)
    }
  })
}
