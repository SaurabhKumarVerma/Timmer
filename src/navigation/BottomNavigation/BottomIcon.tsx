import { StyleSheet, Text, View } from "react-native"

import Animated from "react-native-reanimated"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { EBOTTOMSCREENICON } from "../../types/type"

interface IBottomIcon {
  isFocused: boolean
  routeName: string
  index: number
}

type RouteNames = "Home" | "History"

const BottomIcon = (props: IBottomIcon) => {
  const routeMap: Record<RouteNames, string> = {
    Home: EBOTTOMSCREENICON.HOME,
    History: EBOTTOMSCREENICON.HISTORY,
  }

  const selectedRouteMap: Record<RouteNames, EBOTTOMSCREENICON> = {
    Home: EBOTTOMSCREENICON.HOME,
    History: EBOTTOMSCREENICON.HISTORY,
  }

  const routeName = (name: string): string => {
    const capName = name
    const defaultIconName = EBOTTOMSCREENICON.HOME
    const iconName = props.isFocused
      ? selectedRouteMap[capName as RouteNames]
      : routeMap[capName as RouteNames]
    return iconName || defaultIconName
  }

  const iconColor = (focus: boolean) => {

    if (focus) {
      return '#36454F'
    } else {
      return '#D3D3D3'
    }
  }
  return (
    <Animated.View
      style={{}}
    >
      <Animated.View
        style={{
          paddingBottom: 8,
          flexDirection: 'row',
          alignItems: "center"
        }}
      >
        <Animated.View style={styles.container}>
          <MaterialIcons
            name={routeName(props.routeName) as any}
            size={20}
            color={iconColor(props.isFocused)}
          />
        </Animated.View>

        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              color: iconColor(props.isFocused),
              fontSize: 12,
              fontWeight: "700",
              overflow: "hidden",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {props.routeName}
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 24,
    zIndex: 1,
  },
})

export default BottomIcon
