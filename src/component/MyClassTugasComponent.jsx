import React from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Div, Avatar, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MyClassTugasComponent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <Div row gap={40} justifyContent="space-around" mx={50} my={25}>
          <Div alignItems="center">
            <Text fontSize={18} fontWeight="bold">0</Text>
            <Text>Dikumpulkan</Text>
          </Div>

          <Div height="100%" width={1} bg="gray" />

          <Div alignItems="center">
            <Text fontSize={18} fontWeight="bold">0</Text>
            <Text>Dinilai</Text>
          </Div>
        </Div>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Div mx={20} my={15} gap={10}>
            {[...Array(12)].map((_, i) => (
              <Div
                key={i}
                row
                justifyContent="flex-start"
                gap={10}
                alignItems="center"
              >
                <Avatar bg="green800">
                  <Icon name="dashboard" />
                </Avatar>
                <Text fontSize={15}>Item {i + 1}</Text>
              </Div>
            ))}
          </Div>
        </ScrollView>
      </Div>
    </SafeAreaView>
  );
}
