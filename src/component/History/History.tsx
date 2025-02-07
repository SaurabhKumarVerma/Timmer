import { Appearance, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGS_KEY, TIMERS_KEY } from '../../constant/constant';
import { color } from '../../theme/appColor';
import Entypo from '@expo/vector-icons/Entypo';

const History = () => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const [logs, setLogs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
      return () => { };
    }, [])
  );


  const loadData = async () => {
    try {
      const [savedLogs] = await Promise.all([
        AsyncStorage.getItem(LOGS_KEY),
      ]);

      setLogs(JSON.parse(savedLogs) || []);
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  return (
    <View>
      <FlatList
        data={logs}
        style={{ paddingBottom: '30%' }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <Entypo name="back-in-time" size={24} color="black" />
            <View>
            <Text style={[styles.logText, {fontWeight: '700', color: color.black}]}>
              {item.timerName} ({item.category}) - {item.duration}s completed at{' '}
              
            </Text>
            <Text style={[styles.logText, {color: color.darkGrey}]}>
            {new Date(item.completedAt).toLocaleString()}
            </Text>
            </View>
          </View>
        )}
      />
      
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  logText: {
    color: color.grey,
    fontSize: 12,
    marginHorizontal: 20
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginVertical: 10,
    overflow: 'hidden',
    paddingVertical: 20,
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10
  },
})