import {Coordinate} from '../types';

export function randomFoodPosition(maxX: number, maxY: number): Coordinate {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
}
