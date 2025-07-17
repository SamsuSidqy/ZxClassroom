import React, { useRef, useContext } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Drawer,
  Image, 
  Button, Badge, Div, Text, Icon } from 'react-native-magnus';
import {AuthProvider, AuthContext} from '../provider/ProviderService'
import { useNavigation } from '@react-navigation/native';

import HeaderUserComponent from './HeaderHomeComponent';

export default function DrawwerComponent  ({setings,chat}) {
  const drawerRef = useRef();
  const nav = useNavigation();
  const { logoutUser } = useContext(AuthContext);
  const menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Notification', icon: 'notifications' },
    { label: 'Settings', icon: 'settings' },
    { label: 'About App', icon:'info'},
    { label: 'Logout', icon: 'highlight-off' },
  ];

  const handleLogout = async () => {
    const result = await logoutUser()
    console.log(result)
    if (result) {
      nav.navigate('Login')
    }
  }

  return (
    <View style={{ }}>
     
      <HeaderUserComponent     
      profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZEjaNca5sYZ3-ZGm3cQH4qOAInQGJvYk1w&s" 
      username="doni"
      onMenuPress={() => drawerRef.current.open()}
      settings={setings}
      chat={chat}
      />      


      <Drawer ref={drawerRef} side="right" h="100%" w="70%" bg="white" roundedRight={20} >
        <Div pt={10}  px="lg">          
          <Image 
          w={50}
          h={50}
          source={require('../utils/logo.png')}/>
          <Div borderWidth={0.3} borderColor="#6f8a9e" />
          <Button
              block
              bg="transparent"
              justifyContent="flex-start"
              py="md"
              onPress={() => nav.navigate('Home')}
              prefix={
                <Icon
                  name="home"
                  fontSize={30}
                  fontFamily="MaterialIcons"
                  color="black"
                  mr="md"
                />
              }
            >
            <Text fontSize="xl">Home</Text>
          </Button>
          
          <Button
              block
              bg="transparent"
              justifyContent="flex-start"
              py="md"
              prefix={
                <Badge right={10} bg="#03a9fc">
                <Icon
                  name="notifications"
                  fontSize={30}
                  fontFamily="MaterialIcons"
                  color="black"
                  mr="md"
                />
                </Badge>
              }
            >
            <Text fontSize="xl">Notification</Text>
          </Button>

          <Button
              block
              bg="transparent"
              justifyContent="flex-start"
              py="md"
              prefix={
                <Icon
                  name="settings"
                  fontSize={30}
                  fontFamily="MaterialIcons"
                  color="black"
                  mr="md"
                />
              }
            >
            <Text fontSize="xl">Settings</Text>
          </Button>

          <Button
              block
              bg="transparent"
              justifyContent="flex-start"
              py="md"
              prefix={
                <Icon
                  name="info"
                  fontSize={30}
                  fontFamily="MaterialIcons"
                  color="black"
                  mr="md"
                />
              }
            >
            <Text fontSize="xl">About App</Text>
          </Button>

          <Button
              block
              bg="transparent"
              justifyContent="flex-start"
              py="md"
              onPress={handleLogout}
              prefix={
                <Icon
                  name="highlight-off"
                  fontSize={30}
                  fontFamily="MaterialIcons"
                  color="black"
                  mr="md"
                />
              }
            >
            <Text fontSize="xl">Logout</Text>
          </Button>


        </Div>
      </Drawer>

    </View>
  );
}
