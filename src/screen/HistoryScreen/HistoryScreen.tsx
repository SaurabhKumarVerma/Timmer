import { StyleSheet, View } from 'react-native'
import React from 'react'
import History from '../../component/History/History'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HistoryScreen = () => {
  const inset = useSafeAreaInsets()
  return (
    <View style={{top: inset.top}}> 
     <History />
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({})