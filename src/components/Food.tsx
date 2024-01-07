import * as React from 'react';
import {Coordinate} from '../types';
import {StyleSheet, Text} from 'react-native';

function getRandomFruitEmoji() {
  const fruitsEmoji = ['🍇', '🍉', '🍊', '🍎'];
  const randomIndex = Math.floor(Math.random() * fruitsEmoji.length);
  return fruitsEmoji[randomIndex];
}

interface FoodProps extends Coordinate {
  isEatingFood: boolean;
}
export function Food<T extends FoodProps>({
  x,
  y,
  isEatingFood,
}: T): JSX.Element {
  const [randomFruit,setRandomFruit] = React.useState<string>("")
  React.useEffect(() => {
    setRandomFruit(getRandomFruitEmoji())
  }, [isEatingFood]);

  return (
    <Text style={[{top: y * 10, left: x * 10}, styles.food]}>
      {randomFruit}
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
