import React,{useContext} from 'react';
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
import ProfileScreens from '../screens/users/ProfileScreens'
import ForumScreens from '../screens/users/ForumChatScreens'

const Stack = createNativeStackNavigator();


import {AuthProvider, AuthContext} from '../provider/ProviderService'

export default function MainNavigation() {
  const { authentication } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authentication ? (
          // Jika belum autentikasi, tampilkan hanya halaman login
          <Stack.Screen name="Login" component={LoginScreens} />
        ) : (
          // Jika sudah autentikasi, tampilkan semua halaman lainnya
          <>
            <Stack.Screen name="Home" component={HomeScreens} />
            <Stack.Screen name="Class" component={ClassroomScreen} />
            <Stack.Screen name="Assigsment" component={AssigsmentScreens} options={{ headerShown: true }} />
            <Stack.Screen name="CreateTask" component={CreateTask} />
            <Stack.Screen name="MyAssigsment" component={MyClassScreens} />
            <Stack.Screen name="SettingsClass" component={SettingsClassScreens} />
            <Stack.Screen name="CreateAnnounch" component={CreateAnnounchments} />
            <Stack.Screen name="MyProfile" component={ProfileScreens} />
            <Stack.Screen name="Forum" component={ForumScreens} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
