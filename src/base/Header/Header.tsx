import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';

interface IHeaderProps {
  onDotClick?: (event: any) => void;
  showVerticalMenu?: boolean;
  title: string
}

const Header = (props: IHeaderProps) => {
  const { colors } = useTheme();
  const openMenupopup = (event) => {
    props.onDotClick(event)
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>{props.title}</Text>
      {
        props.showVerticalMenu && (
          <Pressable hitSlop={{ right: 40, left: 10, bottom: 20, top: 40 }} onPress={openMenupopup}>
            <Entypo name="dots-three-vertical" size={20} color={colors.text} />
          </Pressable>
        )
      }

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700'
  }
})