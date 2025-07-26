import React, { useRef, useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Div, Header, Button, Text, Skeleton } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import LampiranComponent from "./LampiranComponent";
import {AuthProvider, AuthContext} from '../provider/ProviderService'

export default function MyClassPetunjukComponent({data}) {
  const { TugasDetail } = useContext(AuthContext);
  const [dataTugas,setDataTugas] = useState(null)
  const [loading,setLoading] = useState(false)


  const RequestData = async() => {
        setLoading(true)
        console.log(data)
        const result = await TugasDetail(data.id_tugas)
        console.log(result)
        if (result.status) {
            setDataTugas(result.data.data)
            setLoading(false)
        }
        setLoading(false)
  }

  useEffect(() => {
    if (dataTugas == null) {
        RequestData()
    }
  },[])

  if (loading) {
        return(
            <Div flex={1} bg="#fff">
                <Div mx={20} my={30} gap={20}>
                    <Skeleton.Box w="20%" />
                    <Skeleton.Box h="70%" />
                </Div>
            </Div>
        )
    }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
    <Div mx={20} my={35} gap={12}>
      <Text fontSize={19} fontWeight="bold">
        {dataTugas?.judul ?? "Memuat judul..."}
      </Text>
      <Div>
        <Text fontSize="lg" lineHeight={24} textAlign="justify" color="gray700">
           {dataTugas?.deskripsi ?? "Memuat Deskripsi..."}
        </Text>
      </Div>

      <Div gap={5}>
      {dataTugas?.lampiran
      ? dataTugas.lampiran.split(",").map((item, index) => (
          <Div
            key={index}
            w="100%"
            gap={5}
            row
            justifyContent="space-between"
            alignItems="center"
            mt="xl"
          >
            <Text color="#349eeb">{item}</Text>
            <Div gap={15} row justifyContent="space-between">
              <TouchableOpacity>
                <Icon name="remove-red-eye" size={20} />
              </TouchableOpacity>
            </Div>
          </Div>
        ))
      : null}
      </Div>
    </Div>
    </ScrollView>
  );
}
