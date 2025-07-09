import React from 'react';
import { Div, Text, Image } from 'react-native-magnus';
import {TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const HeaderUserComponent = ({ username, onMenuPress, profileImage,settings,chat}) => {
  return (
    <Div
      row
      justifyContent="space-between"
      alignItems="center"
      px="lg"
      py="md"
      bg="white"
      shadow="sm"
    >
      {/* Kiri: Menu & Username */}
      <Div row alignItems="center">
        <TouchableOpacity onPress={onMenuPress}>
        <Icon
          name="space-dashboard"
          size={25}
          color="black"
        />
        </TouchableOpacity>
        <Text p={15} fontSize="lg" fontWeight="bold">Hello, {username} !!</Text>
      </Div>

      {/* Kanan: Profile Pic */}
      <Div gap={10} row justifyContent="space-between" alignItems="center">
        <Image
          source={{ uri: profileImage }}
          h={40}
          w={40}
          rounded="circle"
          borderWidth={1}
          borderColor="gray200"
        />
        {settings}
        {chat}
      </Div>
    </Div>
  );
};

export default HeaderUserComponent;
