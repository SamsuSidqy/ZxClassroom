/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Main from './src/Main';
import { ThemeProvider } from 'react-native-magnus';
function App() {

  return (
    <ThemeProvider>
    <Main/>
    </ThemeProvider>
  );
}



export default App;
