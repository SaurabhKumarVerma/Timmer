import * as FileSystem from 'expo-file-system';

export const saveTimerDataToLocal = async (timerData) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'timer_history.json';
      const jsonString = JSON.stringify(timerData, null, 3);
  
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      console.log('File saved at:', fileUri);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };