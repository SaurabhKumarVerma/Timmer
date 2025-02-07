import { Button, SectionList, StyleSheet, Text, TextInput, View, Pressable, Modal, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EACTION, ECATEOGRY, ITimer } from '../../types/type';
import { LOGS_KEY, TIMERS_KEY } from '../../constant/constant';
import { color } from '../../theme/appColor';
import { useTheme } from '@react-navigation/native';

const Home = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [category, setCategory] = useState<ECATEOGRY>(ECATEOGRY.WORKOUT);
  const [timers, setTimers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const {width} = useWindowDimensions()
  const { colors } = useTheme();

  const categories = ['Workout', 'Study', 'Break', 'Other'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedTimers, savedLogs] = await Promise.all([
          AsyncStorage.getItem(TIMERS_KEY),
          AsyncStorage.getItem(LOGS_KEY),
        ]);

        setTimers(JSON.parse(savedTimers) || []);
        setLogs(JSON.parse(savedLogs) || []);
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveTimers = async () => {
      try {
        await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
      } catch (e) {
        console.error('Failed to save timers', e);
      }
    };
    saveTimers();
  }, [timers]);

  useEffect(() => {
    const saveLogs = async () => {
      try {
        await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(logs));
      } catch (e) {
        console.error('Failed to save logs', e);
      }
    };

    saveLogs();
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (timer.isRunning && timer.timeLeft > 0) {
            return { ...timer, timeLeft: timer.timeLeft - 1 };
          }
          if (timer.isRunning && timer.timeLeft === 0) {
            setModalVisible(!isModalVisible);
            setLogs(prevLogs => [
              ...prevLogs,
              {
                id: Math.random().toString(),
                timerName: timer.name,
                category: timer.category,
                duration: timer.duration,
                completedAt: new Date().toISOString()
              }
            ]);
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!name || !duration || isNaN(Number(duration))) {
      alert('Please fill all fields with valid values');
      return;
    }
    const newTimer = {
      id: Math.random().toString(),
      name,
      timeLeft: parseInt(duration, 10),
      category,
      isRunning: false,
      duration: parseInt(duration, 10),
      createdAt: new Date()
    };
    setTimers(prev => [...prev, newTimer]);
    setName('');
    setDuration('');
  };

  const toggleTimer = (id) => {
    setTimers(prev => prev.map(timer =>
      timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const resetTimer = (id) => {
    setTimers(prev => prev.map(timer =>
      timer.id === id ? {
        ...timer,
        timeLeft: timer.duration,
        isRunning: false
      } : timer
    ));
  };


  const handleBulkAction = (category, action) => {
    setTimers(prev => prev.map(timer => {
      if (timer.category !== category) return timer;
      switch (action) {
        case EACTION.START:
          return { ...timer, isRunning: true };
        case EACTION.PAUSE:
          return { ...timer, isRunning: false };
        case EACTION.RESET:
          return { ...timer, timeLeft: timer.duration, isRunning: false };
        default:
          return timer;
      }
    }));
  };


  const groupedTimers = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});


  const sections = Object.entries(groupedTimers).map(([title, data]) => ({
    title,
    data: expandedSections[title] ? data : [],
  }));

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const showCompletedModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Completed!</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    )
  }


  return (
    <View style={[styles.container]}>
      {showCompletedModal()}

      <Text style={styles.label}>Timer Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter timer name"
      />

      <Text style={styles.label}>Duration (seconds):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.categoryContainer}>
        {categories.map(cat => (
          <Button
            key={cat}
            title={cat}
            color={category === cat ? color.blue : color.grey}
            onPress={() => setCategory(cat as ECATEOGRY)}
          />
        ))}
      </View>

      <Pressable onPress={handleSubmit} style={[styles.timerButton, {width: width - 40, }]}>
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>Create Timer</Text>
      </Pressable>

      <SectionList
      style={{marginBottom: '20%'}}
      showsVerticalScrollIndicator={false}
        sections={sections as readonly {title: string, data: ITimer[]}[]}
        ListFooterComponent={() => (
          <View style={{ marginBottom: '20%' }} />
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.timerCard, {backgroundColor: colors.card}]}>
            <View style={styles.timerInfo}>
              <Text style={styles.timerName}>{item.name}</Text>
              <Text style={styles.timerTime}>
               {item?.timeLeft === 0 ? 'Completed' : (
                <>
                  {item.timeLeft}s remaining ({item.duration}s total)
                </>
               ) } 
              </Text>
              <View style={styles.timerControls}>
                <Pressable
                  onPress={() => toggleTimer(item.id)}
                >
                  <Text>{item.isRunning ? 'Pause' : 'Start'}</Text>
                </Pressable>
                <Pressable
                  onPress={() => resetTimer(item.id)}
                  style={{marginLeft: 10}}
                >
                  <Text>Reset</Text>
                </Pressable>
              </View>
            </View>
            <Progress.Circle
              progress={item.duration > 0 ? (item.timeLeft / item.duration) : 0}
              size={60}
              showsText
              formatText={() => `${item.timeLeft}s`}
              color={item.isRunning ? color.blue : color.black}
              strokeCap="round"
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Pressable onPress={() => toggleSection(title)} style={[styles.sectionHeader, {backgroundColor: colors.card}]}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.bulkControls}>
              <Pressable onPress={() => handleBulkAction(title, EACTION.START)} >
                <Text>Start All</Text>
              </Pressable>
              <Pressable onPress={() => handleBulkAction(title, EACTION.PAUSE)} >
                <Text>Pause All</Text>
              </Pressable>
              <Pressable onPress={() => handleBulkAction(title, EACTION.RESET)} >
                <Text>Reset</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  timerInfo: {
  },
  timerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timerTime: {
    color: '#666',
    marginVertical: 5,
  },
  timerControls: {
    flexDirection: 'row',
  },
  sectionHeader: {
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bulkControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: color.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerButton: {
    alignSelf: 'center', 
    backgroundColor:'#E5E4E2', 
    paddingVertical: 12, 
    paddingHorizontal: 10, 
    borderRadius: 6,
    marginBottom: '2%'
  }
});

export default Home;