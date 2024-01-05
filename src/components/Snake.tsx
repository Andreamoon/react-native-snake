import * as React from 'react';
import {Coordinate} from '../types';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface SnakeProps {
  snake: Coordinate[];
}

export function Snake<T extends SnakeProps>({snake}: T): JSX.Element {
  return (
    <React.Fragment>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[style.snake,segmentStyle]} />;
      })}
    </React.Fragment>
  );
}

const style = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
});
