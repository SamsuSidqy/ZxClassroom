import React, { useState, useContext } from "react";
import { TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { Div, Text, Input, Button } from "react-native-magnus";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

import {AuthProvider, AuthContext} from '../provider/ProviderService'

export default function FabHome({btnJoin,btnCreate}) {
  const nav = useNavigation();
  const [showOptions, setShowOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateClass,setModalCreateClass] = useState(false)

  const [namaKelas,setNamaKelas] = useState('')
  const [mataPelajaran,setMataPelajaran] = useState('')
  const [kodeKelas,setKodeKelas] = useState('')

  const { BuatKelas, IkutKelas } = useContext(AuthContext);

  const handleFabPress = () => {
    setShowOptions(!showOptions);
  };

  const HandleBuatKelas = async() => {
    const data = {
      nama_kelas:namaKelas,
      mata_pelajaran:mataPelajaran
    }
    const result = await BuatKelas(data)
    if (result.status) {
      nav.navigate('Class',result.data.kelas)
    }
  }

  const HandleIkutKelas = async() => {
    const data = {
      kode_kelas:kodeKelas,
    }
    const result = await IkutKelas(data)
    console.log(result)
    if (result.status) {
      nav.navigate('Class',result.data.kelas)
    }
  }

  return (
    <>
    <Div style={{
      position: 'absolute',
      bottom: 40,
      right: 20,
      alignItems: 'center',
    }}>
      
      {/* Lingkaran kecil */}
      {showOptions && (
        <>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginBottom: 10 }}
          >
            <Div
              rounded="circle"
              bg="#42f5bf"
              h={50}
              w={50}
              justifyContent="center"
              alignItems="center"
              shadow="sm"
            >
              <Icon name="output" fontFamily="Feather" color="#0f0f0f" size={16} />
            </Div>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalCreateClass(true)}
            style={{ marginBottom: 10 }}
          >
            <Div
              rounded="circle"
              bg="#42f5bf"
              h={50}
              w={50}
              justifyContent="center"
              alignItems="center"
              shadow="sm"
            >
              <Icon name="add" fontFamily="Feather" color="#0f0f0f" size={16} />
            </Div>
          </TouchableOpacity>
        </>
      )}

      {/* FAB utama */}
      <TouchableOpacity onPress={handleFabPress}>
        <Div
          rounded="circle"
          bg="blue700"
          h={50}
          w={50}
          justifyContent="center"
          alignItems="center"
          shadow="md"
        >
          <Icon name={showOptions ? "close" : "groups"}  color="white" size={25} />
        </Div>
      </TouchableOpacity>
    </Div>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <Div
          flex={1}
          justifyContent="center"
          alignItems="center"
          bg="rgba(0,0,0,0.5)"
        >
          {/* Gunakan TouchableWithoutFeedback kedua agar isi modal tidak tertutup saat diklik */}
          <TouchableWithoutFeedback>
            <Div
              bg="white"
              p="xl"
              rounded="lg"
              shadow="lg"
              w="85%"
              alignItems="center"
              gap={20}
            >
            <Input
              placeholder="Kode Kelas"
              onChangeText={setKodeKelas}
              value={kodeKelas}
              p={10}
              focusBorderColor="#08009f"
              prefix={<Icon name="class" size={20} />}
            />
            <Button 
            disabled={kodeKelas.length ? false : true}
            onPress={HandleIkutKelas} w="100%">Join Kelas</Button>
            </Div>
          </TouchableWithoutFeedback>
        </Div>
      </TouchableWithoutFeedback>
    </Modal>


    <Modal
      animationType="fade"
      transparent={true}
      visible={modalCreateClass}
      onRequestClose={() => {
        setModalCreateClass(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalCreateClass(false)}>
        <Div
          flex={1}
          justifyContent="center"
          alignItems="center"
          bg="rgba(0,0,0,0.5)"
        >
          {/* Gunakan TouchableWithoutFeedback kedua agar isi modal tidak tertutup saat diklik */}
          <TouchableWithoutFeedback>
            <Div
              bg="white"
              p="xl"
              rounded="lg"
              shadow="lg"
              w="85%"
              alignItems="center"
              gap={20}
            >
            <Input
              placeholder="Nama Kelas"
              maxLength={7}
              onChangeText={setNamaKelas}
              value={namaKelas}
              p={10}
              focusBorderColor="#08009f"
              prefix={<Icon name="assistant" size={20} />}
            />
            <Input
              placeholder="Mata Pelajaran"
              onChangeText={setMataPelajaran}
              value={mataPelajaran}
              p={10}
              focusBorderColor="#08009f"
              prefix={<Icon name="campaign" size={20} />}
            />
            <Button 
            disabled={mataPelajaran.length && namaKelas.length ? false : true} onPress={HandleBuatKelas} w="100%">Buat Kelas</Button>
            </Div>
          </TouchableWithoutFeedback>
        </Div>
      </TouchableWithoutFeedback>
    </Modal>

    </>
  );
}
