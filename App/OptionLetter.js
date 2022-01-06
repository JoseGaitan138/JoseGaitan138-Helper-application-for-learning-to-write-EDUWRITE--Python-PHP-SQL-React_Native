import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');

export default function OptionLetter({navigation, route}) {
  const onPressUpper = () => {
    navigation.navigate('Word', {
      text: route.params.text.toUpperCase(),
      letterOption: 1, // Mayuscula
      learning: route.params.learning ? route.params.learning : false,
      indexWord: route.params.indexWord ? route.params.indexWord : '-1',
      letterId: route.params.letterId ? route.params.letterId : '-1'
    });
  };
  const onPressLower = () => {
    navigation.navigate('Word', {
      text: route.params.text.toLowerCase(),
      letterOption: 2, // Minuscula
      learning: route.params.learning ? route.params.learning : false,
      indexWord: route.params.indexWord ? route.params.indexWord : '-1',
      letterId: route.params.letterId ? route.params.letterId : '-1'
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPressUpper}>
        <Icon
          name="format-letter-case-upper"
          size={height * 0.2}
          color="#000"
        />
        <Text style={styles.label}>Mayusculas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressLower}>
        <Icon
          name="format-letter-case-lower"
          size={height * 0.2}
          color="#000"
        />
        <Text style={styles.label}>Minusculas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: height * 0.02,
  },
  label: {
    fontSize: width * 0.06,
  },
});
