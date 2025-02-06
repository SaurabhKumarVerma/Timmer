import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CustomBottomTabBar from "./CustomTabBar"
import { ESCREEN } from "../../types/type"
import HomeScreen from "../../screen/HomeScreen/HomeScreen"
import HistoryScreen from "../../screen/HistoryScreen/HistoryScreen"

const BottomNavigation = () => {
  const Tabs = createBottomTabNavigator()

  const CustomBottomTabs = (props: BottomTabBarProps) => {
    return <CustomBottomTabBar {...props} key={Math.random()} />
  }

  return (
    <Tabs.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
      tabBar={CustomBottomTabs}
      initialRouteName={ESCREEN.HOME_SCREEN}
    >
      <Tabs.Screen name={ESCREEN.HOME_SCREEN} component={HomeScreen} />
      <Tabs.Screen name={ESCREEN.HISTORY_SCREEN} component={HistoryScreen} />
    </Tabs.Navigator>
  )
}

export default BottomNavigation
