import { StyleSheet, useColorScheme } from 'react-native';
import vectorIcon from './src/utils/vectorIcon';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigation from './src/navigation/BottomNavigation/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import DarkTheme from './src/theme/DarkTheme';
import LightTheme from './src/theme/LightTheme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const scheme = useColorScheme();
  const [loaded, error] = useFonts({
    ...vectorIcon,
  });

  useEffect(() => {
    if (loaded || error ) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <BottomNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
