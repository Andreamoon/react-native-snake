import React from 'react';
import {Game} from './src/components/Game';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 2 }}>
      <Game />
    </GestureHandlerRootView>
  );
}

export default App;
