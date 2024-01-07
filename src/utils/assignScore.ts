//['🍇', '🍉', '🍊', '🍎']

export function assignScore(fruitType: string): number {
  switch (fruitType) {
    case '🍇':
      return 10;
    case '🍉':
      return 20;
    case '🍊':
      return 30;
    case '🍎':
      return 40;

    default:
      return 0;
  }
}
