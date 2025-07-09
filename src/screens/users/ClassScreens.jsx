import React,{useState, useEffect} from "react";
import { ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { Div, Button, Text, Badge } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import DrawwerComponent from "../../component/DrawwerComponent";
import NavigationBottomClass from '../../component/NavigationBottomClass';
import TaskClassComponent from '../../component/TaskClassComponent';
import PeopleClassComponent from '../../component/PeopleClassComponent';
import { useNavigation } from '@react-navigation/native';


const ClassroomScreen = () => {
  const nav = useNavigation()
  const [navbottom,setNavBottom] = useState('forum');


  useEffect(() => {
    const backAction = () => {
      if (nav.canGoBack()) {
        nav.goBack();
      } else {
        setNavBottom('forum'); 
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  return (
    <Div flex={1} bg="gray100">
      <DrawwerComponent 
      setings={
        <TouchableOpacity onPress={() => nav.navigate('SettingsClass')}>
        <Icon color="#26aec9" name="settings" size={30} />
        </TouchableOpacity>
      }
      chat={
        <TouchableOpacity onPress={() => nav.navigate('SettingsClass')}>
        <Badge>
          <Icon color="#26aec9" name="chat" size={30} />
        </Badge>
        </TouchableOpacity>
      }
      />

      {/* Konten scrollable */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {navbottom == 'forum' ? <TaskClassComponent /> : <PeopleClassComponent />}
      </ScrollView>

      <NavigationBottomClass aktif={navbottom} setAktif={setNavBottom} />
      
    </Div>
  );
};

export default ClassroomScreen;
