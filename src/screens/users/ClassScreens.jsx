import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from "react-native";
import { Div, Button, Text, Badge } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import DrawwerComponent from "../../component/DrawwerComponent";
import NavigationBottomClass from "../../component/NavigationBottomClass";
import TaskClassComponent from "../../component/TaskClassComponent";
import PeopleClassComponent from "../../component/PeopleClassComponent";
import { AuthProvider, AuthContext } from "../../provider/ProviderService";

import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const ClassroomScreen = ({ route }) => {
  const nav = useNavigation();
  const [navbottom, setNavBottom] = useState("forum");
  const [datatugas, setDatatugas] = useState(null);
  const [detailkelas, setDetailKelas] = useState(null)
  const [peopleKelas, setPopleKelas] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { ListTugasData, ListKelasPeople, KelasDetail } = useContext(AuthContext);

  const RequestsData = async () => {
    const response = await ListTugasData(route.params.id_kelas);
    const response2 = await ListKelasPeople(route.params.kode_kelas);
    const response3 = await KelasDetail(route.params.id_kelas)    
    if (response.status && response2.status && response3.status) {
      setDatatugas(response.data.data);
      setPopleKelas(response2.data.data);
      setDetailKelas(response3.data.kelas)
    } else {
      setDatatugas([]);
    }
  };

  const RefreshTugas = async () => {
    setRefreshing(true);
    const response = await ListTugasData(route.params.id_kelas);
    const response2 = await KelasDetail(route.params.id_kelas)   
    if (response.status) {
      setDatatugas(response.data.data);
      setDetailKelas(response2.data.kelas)
      setRefreshing(false);
    } else {
      setDatatugas([]);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (nav.canGoBack()) {
        nav.navigate("Home");
      } else {
        setNavBottom("forum");
      }
      return true;
    };

    if (datatugas === null) {
      RequestsData();
      console.log("datatugas diperbarui:", datatugas);
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [datatugas]);

  return (
    <Div flex={1} bg="gray100">
      <DrawwerComponent
        setings={
          route.params.teacher ? (
            <TouchableOpacity onPress={detailkelas ? () => nav.navigate("SettingsClass",detailkelas) : null}>
              <Icon color="#26aec9" name="settings" size={30} />
            </TouchableOpacity>
          ) : null
        }
        chat={
          <TouchableOpacity >
            <TouchableOpacity onPress={() => nav.navigate('Forum',route.params)}>
              <Icon  color="#26aec9" name="chat" size={30} />
            </TouchableOpacity>
          </TouchableOpacity>
        }
      />

      {/* Konten scrollable */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={RefreshTugas} />
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {navbottom == "forum" ? (
          <TaskClassComponent
            kelas={route.params}
            teacher={route.params.teacher}
            data={datatugas != null ? datatugas : []}
          />
        ) : (
          <PeopleClassComponent data={peopleKelas != null ? peopleKelas : []} />
        )}
      </ScrollView>

      <NavigationBottomClass
        aktif={navbottom}
        setAktif={setNavBottom}
        teacher={route.params.teacher}
        data={route.params}
      />
    </Div>
  );
};

export default ClassroomScreen;
