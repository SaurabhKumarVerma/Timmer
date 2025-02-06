import { Appearance, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const History = () => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const onChangeColor = () => {
    
    Appearance.setColorScheme( scheme === 'light' ? 'dark' : 'light')
  }
  return (
    <View>
      <TouchableOpacity onPress={() => onChangeColor()}>
        <Text style={{color: colors.text}}>History</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default History

const styles = StyleSheet.create({})