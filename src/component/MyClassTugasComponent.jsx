import React, {useContext,useEffect,useState} from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Div, Avatar, Text, Dropdown } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import {AuthProvider, AuthContext} from '../provider/ProviderService'
import { useNavigation } from '@react-navigation/native';
import LampiranComponent from './LampiranComponent'
import url from '../api/Endpoint'

export default function MyClassTugasComponent({data}) {
  const { TeacherAsigsments } = useContext(AuthContext);
  const [dataAsign,setDataAsign] = useState(null)
  const [dataSiswa,setDataSiswa] = useState(null)

  const dropdownRef = React.createRef();

  const RequestData = async() => {
    const result = await TeacherAsigsments(data.id_tugas)
    if (result.status) {
      setDataAsign(result.data.data)
      const gradedCount = result.data.data?.filter(a => a.nilai === true).length || 0;
    }else{
      setDataAsign([])
    }  
  }

  const NilaiSiswa = async(option) => {
    console.log(option)
    option['lampiran'] = option.lampiran.split(",").map(item => {
      return{
         uri: `${url}open/${item.trim()}`,
         type: item.split(".").pop() == "pdf" ? `application/${item.split(".").pop()}` : `image/${item.split(".").pop()}`,
      }
    })    
    setDataSiswa(option)
    dropdownRef.current.open()
  }

  useEffect(() => {
    if (dataAsign == null) {
      RequestData()
    }
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <Div row gap={40} justifyContent="space-around" mx={50} my={25}>
          <Div alignItems="center">
            <Text fontSize={18} fontWeight="bold">{dataAsign?.length}</Text>
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
            {dataAsign?.map((data, i) => (
              <TouchableOpacity onPress={() => NilaiSiswa(data)} >
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
                <Text fontSize={15}>{data.username}</Text>
              </Div>
              </TouchableOpacity>
            ))}
          </Div>
        </ScrollView>
      </Div>

       <Dropdown
        ref={dropdownRef}
        w="100%"
        h="80%"
        title={
          <Text mx="xl" color="gray500" pb="md">
            This is your title
          </Text>
        }
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">
        {dataSiswa ? (
          <>
          <Div mx={20}>
           {dataSiswa.lampiran?.map(data => <LampiranComponent datas={data} />)}
          </Div>
          </>
        ):null}
      </Dropdown>
    </SafeAreaView>
  );
}
