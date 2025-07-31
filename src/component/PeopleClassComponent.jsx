import React from "react";
import { ScrollView } from "react-native";
import { Div, Avatar, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import url from '../api/Endpoint'
export default function PeopleClassComponent({ data }) {
  const teachers = data.filter(person => person.teacher);
  const students = data.filter(person => !person.teacher);

  const renderPerson = (person, index) => (
    <Div key={index} row justifyContent="flex-start" gap={10} alignItems="center">
      <Avatar
      source={
        person?.profile ? {uri:`${url}profile/${person.profile}`}:
        {uri:`https://ui-avatars.com/api/?name=${person.username}`}
      }
      >
      </Avatar>
      <Text fontSize={15}>{person.username}</Text>
    </Div>
  );

  return (
    <ScrollView>
      <Div mx={20} my={15} gap={10}>
        {/* Bagian Pengajar */}
        <Div gap={10}>
          <Text fontSize={18}>Pengajar</Text>
          <Div w="100%" borderColor="#1a1919" borderWidth={0.2} />
        </Div>
        {teachers.map(renderPerson)}

        {/* Bagian Siswa */}
        <Div gap={10} mt={15}>
          <Text fontSize={18}>Siswa</Text>
          <Div w="100%" borderColor="#1a1919" borderWidth={0.2} />
        </Div>
        {students.map(renderPerson)}
      </Div>
    </ScrollView>
  );
}
