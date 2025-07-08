import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Div, Header, Button, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import LampiranComponent from "./LampiranComponent";

export default function MyClassPetunjukComponent() {
  return (
    <Div mx={20} my={35} gap={12}>
      <Text fontSize={19} fontWeight="bold">
        Title
      </Text>
      <Div>
        <Text fontSize="lg" lineHeight={24} textAlign="justify" color="gray700">
          React Native Magnus adalah sebuah UI framework untuk React Native yang
          memudahkan pengembangan aplikasi mobile dengan komponen yang sudah
          bergaya secara default. Anda bisa membuat tampilan yang konsisten dan
          rapi hanya dengan beberapa baris kode, tanpa harus mengatur banyak
          style secara manual.
        </Text>
      </Div>

      <Div gap={5}>
          <Div
            w="100%"
            gap={5}
            row
            justifyContent="space-between"
            alignItems="center"
            mt="xl"
          >
            <Text color="#349eeb">data.name.pdf</Text>
            <Div gap={15} row justifyContent="space-between">

              <TouchableOpacity >
                <Icon name="remove-red-eye" size={20} />
              </TouchableOpacity>
            </Div>
          </Div>

      </Div>
    </Div>
  );
}
