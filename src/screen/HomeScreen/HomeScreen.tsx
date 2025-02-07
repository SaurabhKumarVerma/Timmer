import { Appearance, GestureResponderEvent, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import Home from '../../component/Home/Home'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../base/Header/Header'
import Menu from '../../component/Home/Menu'
import { EMODE, IMenuItem } from '../../types/type'

const HomeScreen = () => {
  const inset = useSafeAreaInsets()
  const scheme = useColorScheme();
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [locationY, setLocationY] = useState<number>(0)
  

  const handleMenuClick = (event: GestureResponderEvent) => {
    setLocationY(event.nativeEvent.locationY);
    setShowMenu(true);
  };

  const handleDarkMode = () => {
    Appearance.setColorScheme( scheme === EMODE.LIGHT ? EMODE.DARK : EMODE.LIGHT)
    setShowMenu(false)
  }

  const menuItem: IMenuItem[] = [
    {
      label: `Switch To ${scheme === EMODE.LIGHT ? 'Dark' : 'Light'}`,
      onSelect: () => handleDarkMode(),
      icon: scheme === EMODE.LIGHT ? 'dark-mode' : 'sunny'
    },
  ]
  return (
    <>
      <View style={{ top: inset.top, flex: 1, marginHorizontal: 16 }}>
        <Header onDotClick={handleMenuClick} showVerticalMenu title={'Timmer'}/>
        <Home />
      </View>
      {showMenu && <Menu isVisible={showMenu} setCloseModal={() => setShowMenu(false)} y={locationY} menuItem={menuItem} />}
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})