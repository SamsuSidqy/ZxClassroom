import React from 'react';
import { Div, Text, Image } from 'react-native-magnus';
import {TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

const HeaderTaskComponent = ({tombol}) => {
  const nav = useNavigation();
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
        <TouchableOpacity onPress={() => nav.goBack()} >
        <Icon
          name="close"
          size={25}
          color="black"
        />
        </TouchableOpacity>
      </Div>

      {/* Kanan: Profile Pic */}
      {/*<Image
        source={{ uri: profileImage }}
        h={40}
        w={40}
        rounded="circle"
        borderWidth={1}
        borderColor="gray200"
      />*/}
      {tombol}
    </Div>
  );
};

export default HeaderTaskComponent;
