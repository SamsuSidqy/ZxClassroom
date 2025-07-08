import React, { useRef } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Drawer, Button, Badge, Div, Text, Icon } from 'react-native-magnus';
import { useNavigation } from '@react-navigation/native';

import HeaderUserComponent from './HeaderHomeComponent';

export default function DrawwerComponent  ({setings}) {
  const drawerRef = useRef();
  const nav = useNavigation();
  const menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Notification', icon: 'notifications' },
    { label: 'Settings', icon: 'settings' },
    { label: 'About App', icon:'info'},
    { label: 'Logout', icon: 'highlight-off' },
  ];

  return (
    <View style={{ paddingTop:40,}}>
     
      <HeaderUserComponent     
      profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZEjaNca5sYZ3-ZGm3cQH4qOAInQGJvYk1w&s" 
      username="doni"
      onMenuPress={() => drawerRef.current.open()}
      settings={setings}
      />      


      <Drawer ref={drawerRef} side="left" h="100%" w="70%" bg="white">
        <Div pt={20}  px="lg">
         <Text  fontWeight="bold" fontSize="4xl" mt={30} mb={20}>
            ZX Classroom
          </Text>

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
