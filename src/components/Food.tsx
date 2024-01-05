import * as React from 'react';
import {Coordinate} from '../types';
import {StyleSheet, Text} from 'react-native';

function getRandomFruitEmoji() {
  const fruitsEmoji = ['🍇', '🍉', '🍊', '🍎'];
  const randomIndex = Math.floor(Math.random() * fruitsEmoji.length);
  return fruitsEmoji[randomIndex];
}

export function Food({x, y}: Coordinate): JSX.Element {
  return (
    <Text style={[{top: y * 10, left: x * 10}, styles.food]}>
      {getRandomFruitEmoji()}
    </Text>
  );
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: 'absolute',
  },
});
