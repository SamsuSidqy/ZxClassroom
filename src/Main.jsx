import React from 'react';
import {SafeAreaView, StatusBar, FlatList} from 'react-native';
// import {
//   ThemeProvider,
// } from 'react-native-magnus';
import MainNavigation from './navigation/MainNavigation';
import {AuthProvider} from './provider/ProviderService'

export default function Main(){
  return(  
  	<AuthProvider>
      <MainNavigation/>    
    </AuthProvider>
  )
}