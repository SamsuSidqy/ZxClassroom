import React,{useState, useContext, useCallback ,useEffect} from "react";
import { ScrollView, TouchableOpacity, RefreshControl, BackHandler } from "react-native";
import { Div, Button, Text, Badge } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import DrawwerComponent from "../../component/DrawwerComponent";
import NavigationBottomClass from '../../component/NavigationBottomClass';
import TaskClassComponent from '../../component/TaskClassComponent';
import PeopleClassComponent from '../../component/PeopleClassComponent';
import {AuthProvider, AuthContext} from '../../provider/ProviderService'

import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const ClassroomScreen = ({route}) => {
  const nav = useNavigation()
  const [navbottom,setNavBottom] = useState('forum');
  const [datatugas,setDatatugas] = useState(null)
  const [refreshing, setRefreshing] = useState(false);


  const { ListTugasData } = useContext(AuthContext);

  const RequestTugas = async() => {
    const response = await ListTugasData(route.params.id_kelas)
    if (response.status) {
      setDatatugas(response.data.data)
      
    }else{
      setDatatugas([])
    }
  }

  const RefreshTugas = async() => {
    setRefreshing(true)
    const response = await ListTugasData(route.params.id_kelas)
    if (response.status) {
      setDatatugas(response.data.data)
      setRefreshing(false)
    }else{
      setDatatugas([])
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const backAction = () => {
      if (nav.canGoBack()) {
        nav.navigate('Home');
      } else {
        setNavBottom('forum'); 
      }
      return true;
    };

    if (datatugas === null) {
      RequestTugas()
      console.log('datatugas diperbarui:', datatugas);
    }  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [datatugas]);


  return (
    <Div flex={1} bg="gray100">
      <DrawwerComponent 
      setings={
        route.params.teacher ?
        <TouchableOpacity onPress={() => nav.navigate('Settings')}>
        <Icon color="#26aec9" name="settings" size={30} />
        </TouchableOpacity>
        :null
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
      <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={RefreshTugas} />}
      contentContainerStyle={{ paddingBottom: 80 }}>
        {navbottom == 'forum' ? <TaskClassComponent kelas={route.params} teacher={route.params.teacher} data={datatugas != null ? datatugas : []} /> : <PeopleClassComponent />}
      </ScrollView>

      <NavigationBottomClass aktif={navbottom} setAktif={setNavBottom} teacher={route.params.teacher} data={route.params}/>
      
    </Div>
  );
};

export default ClassroomScreen;
