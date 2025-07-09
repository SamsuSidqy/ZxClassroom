import React from "react";
import { TouchableOpacity } from "react-native";
import { Div, Text } from "react-native-magnus";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import FabClass from './FabClass';

export default function NavigationBottomClass({ aktif, setAktif }) {
  const navigation = useNavigation();

  const navItems = [
    { key: 'forum', label: 'Tugas', icon: 'event-note' },
    { key: 'orang', label: 'Orang', icon: 'people' },
  ];

  return (
    <>
      {aktif != "orang" ? <FabClass /> : null}

      <Div
        row
        justifyContent="space-around"
        alignItems="center"
        bg="white"
        p="md"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderTopWidth={1}
        borderColor="gray200"
      >
        {navItems.map((item) => (
          <TouchableOpacity key={item.key} onPress={() => setAktif(item.key)}>
            <Div alignItems="center">
              <Icon
                size={20}
                name={item.icon}
                fontFamily="Feather"
                color={aktif === item.key ? '#26aec9' : '#243538'}
              />
              <Text fontSize="xs" color={aktif === item.key ? '#26aec9' : '#243538'}>
                {item.label}
              </Text>
            </Div>
          </TouchableOpacity>
        ))}
      </Div>
    </>
  );
}
