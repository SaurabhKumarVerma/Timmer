import { StyleSheet, View } from 'react-native'
import React from 'react'
import History from '../../component/History/History'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../base/Header/Header'

const HistoryScreen = () => {
  const inset = useSafeAreaInsets()
  return (
    <View style={{top: inset.top, marginHorizontal: 10}}> 
    <Header  title={'History'}/>
     <History />
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({})