import React,{useState} from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Button, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import DrawwerComponent from "../../component/DrawwerComponent";
import NavigationBottomClass from '../../component/NavigationBottomClass';
import TaskClassComponent from '../../component/TaskClassComponent';
import PeopleClassComponent from '../../component/PeopleClassComponent';
import { useNavigation } from '@react-navigation/native';


const ClassroomScreen = () => {
  const nav = useNavigation()
  const [navbottom,setNavBottom] = useState('forum');

  return (
    <Div flex={1} bg="gray100">
      <DrawwerComponent setings={
        <TouchableOpacity onPress={() => nav.navigate('SettingsClass')}>
        <Icon name="settings" size={30} />
        </TouchableOpacity>
      }/>

      {/* Konten scrollable */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {navbottom == 'forum' ? <TaskClassComponent /> : <PeopleClassComponent />}
      </ScrollView>

      <NavigationBottomClass aktif={navbottom} setAktif={setNavBottom} />
      
    </Div>
  );
};

export default ClassroomScreen;
