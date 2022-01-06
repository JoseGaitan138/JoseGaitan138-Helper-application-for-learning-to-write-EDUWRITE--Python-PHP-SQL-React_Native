import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../Screens/SignIn/SignIn';
import SignUp from '../Screens/SignUp/SignUp';
import Home from '../Screens/Home/Home';
import Words from '../Screens/Words/Words';
import Word from '../Screens/Word/Word';
import OptionLetter from '../Screens/OptionLetter/OptionLetter';
import Learning from '../Screens/Learning/Learning';

const Stack = createStackNavigator();

export default class Navigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{title: '', headerTransparent: true}}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Words"
          component={Words}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Word"
          component={Word}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OptionLetter"
          component={OptionLetter}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Learning"
          component={Learning}
        />
      </Stack.Navigator>
    );
  }
}
