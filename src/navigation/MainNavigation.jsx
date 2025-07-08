import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreens from '../screens/auth/Login';
import HomeScreens from '../screens/users/HomeScreens';
import ClassroomScreen from '../screens/users/ClassScreens';
import AssigsmentScreens from '../screens/users/AssigsmentScreens';
import CreateTask from '../screens/users/CreateTask';
import CreateAnnounchments from '../screens/users/CreateAnnounchments';
import MyClassScreens from '../screens/users/MyClassScreens';
import SettingsClassScreens from '../screens/users/SettingsClassScreens';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      	<Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreens} />
      	<Stack.Screen options={{headerShown: false}} name="Class" component={ClassroomScreen} />
      	<Stack.Screen options={{headerShown: true}} name="Assigsment" component={AssigsmentScreens} />
        <Stack.Screen options={{headerShown: false}} name="CreateTask" component={CreateTask} />
        <Stack.Screen options={{headerShown: false}} name="MyClass" component={MyClassScreens} />
        <Stack.Screen options={{headerShown: false}} name="SettingsClass" component={SettingsClassScreens} />
        <Stack.Screen options={{headerShown: false}} name="CreateAnnounch" component={CreateAnnounchments} />
       	<Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
