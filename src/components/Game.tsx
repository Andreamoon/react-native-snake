import * as React from 'react';
import {Colors} from '../styles/colorts';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {Coordinate, Direction, GestureEventType} from '../types';
import {Snake} from './Snake';
import {checkGameOver} from '../utils/checkGameOver';
import {Food} from './Food';
import {checkEatsFood} from '../utils/checkEatsFood';
import {randomFoodPosition} from '../utils/randomFoodPosition';
import {Header} from './Header';
import {Text} from 'react-native-elements';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
const GAME_BOUNDS = {xMin: 0, xMax: 35, yMin: 0, yMax: 71};
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
  const [score, setScore] = React.useState<number>(0);

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

  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);
  function moveSnake() {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; // crea una copia

    // CHECK GAME OVER
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      return;
    }
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;

      default:
        break;
    }

    // CHECK IF EATS FOODS
    if (checkEatsFood(newHead, food, 2)) {
      // set random fruit position
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      //incremnet snake
      setSnake([newHead, ...snake]);
      // get another position of food
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }
  function reloadGame() {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  }
  function pauseGame() {
    setIsPaused(!isPaused);
  }
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderBlockColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
