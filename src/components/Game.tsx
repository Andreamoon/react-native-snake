import * as React from 'react';
import {Colors} from '../styles/colorts';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {Coordinate, Direction, GestureEventType} from '../types';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
const GAME_BOUNDS = {xMin: 0, xMax: 35, yMin: 0, yMax: 63};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export function Game(): JSX.Element {
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  function handleGesture(event: GestureEventType) {
    const {translationX, translationY} = event.nativeEvent;
    // console.log(translationX, translationY);

    // CI STIAMO MUOVENDO SULL ASSE X
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        //MOVING RIGHT
        setDirection(Direction.Right);
      } else {
        // MOVING LEFT
        setDirection(Direction.Left);
      }
    } else {
      //  CI STIAMO MUOVENDO SULL ASSE Y
      if (translationY > 0) {
        //MOVING DOWN
        setDirection(Direction.Down);
      } else {
        // MOVING UP
        setDirection(Direction.Up);
      }
    }
  }
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.conntainer}></SafeAreaView>
    </PanGestureHandler>
  );
}
const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
