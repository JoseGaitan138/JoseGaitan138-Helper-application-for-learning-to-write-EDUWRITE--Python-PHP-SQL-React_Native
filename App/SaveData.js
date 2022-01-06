import AsyncStorage from '@react-native-async-storage/async-storage';
export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('posiciones');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('posiciones');
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};
export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('posiciones', jsonValue);
  } catch (e) {
    // saving error
  }
};
