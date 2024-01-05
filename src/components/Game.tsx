import * as React from 'react';
import {Colors} from '../styles/colorts';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export function Game(): JSX.Element {
  function handleGesture(event: GestureEvent<PanGestureHandlerEventPayload>) {
    const {translationX, translationY} = event.nativeEvent;
    // console.log(translationX, translationY);

    // CI STIAMO MUOVENDO SULL ASSE X
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        //MOVING RIGHT
      } else {
        // MOVING LEFT
      }
    } else {
      //  CI STIAMO MUOVENDO SULL ASSE Y
      if (translationY > 0) {
        //MOVING UP
      } else {
        // MOVING DOWN
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
