import React, { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Clipboard,
} from 'react-native';
import { Div, Header, Button, Text, Input } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


export default function SettingsClassScreens({route}){
	const nav = useNavigation()
	const [copySet,setCopy] = useState(false);

	const [namaKelas,setNamaKelas] = useState(route.params.nama_kelas)
	const [nomorRuangan,setNomorRuangan] = useState(route.params.nomor_ruangan)
	const [mataPelajaran,setMataPelajaran] = useState(route.params.mata_pelajaran)

	return(
		<>
		<Header
	        p="lg"
	        borderBottomWidth={1}
	        borderBottomColor="gray200"
	        alignment="center"
	        prefix={
	          <Button bg="transparent" onPress={() => nav.goBack()}>
	            <Icon name="close" size={20} />
	          </Button>
	        }
	    >
	    Detail Kelas
	    </Header>


	    <Div mx={20} my={15} gap={10}>
	    	<Div 
			  row 
			  bg="#399172"
			  rounded={8}
			  justifyContent="space-between"
			  mt={15}
			  p={15}
			  alignItems="center"
			>
			  <Div>
			    <Text color="#FFFFFF">Kode Kelas</Text>
			    <Text 
			      fontStyle="italic" 
			      fontSize={25} 
			      fontWeight="bold" 
			      color="#FFFFFF"
			    >
			     {route.params.kode_kelas}
			    </Text>
			  </Div>
			  
			  <TouchableOpacity onPress={() => {
			  	Clipboard.setString(route.params.kode_kelas)
			  	setCopy(true)
			  	setTimeout(() => {
			  		setCopy(false)
			  	},2000)
			  }}>
			    <Icon name={copySet ? "check" :"content-copy"} color="#ECECEC" size={16} />
			  </TouchableOpacity>
			</Div>

	        <Text>Nama Kelas</Text>
	        <Input
			  placeholder="Nama Kelas"
			  value={namaKelas}
			  onChangeText={setNamaKelas}
			  p={10}
			  focusBorderColor="blue700"
			  suffix={<Icon onPress={() => setNamaKelas('')} name="close" size={20} />}
			/>
			<Text>Mata Pelajaran</Text>
	        <Input
			  placeholder="Mata Pelajaran"
			  p={10}
			  value={mataPelajaran}
			  onChangeText={setMataPelajaran}
			  focusBorderColor="blue700"
			  suffix={<Icon onPress={() => setMataPelajaran('')} name="close" size={20} />}
			/>
			<Text>Ruangan</Text>
	        <Input
			  placeholder="Ruangan"
			  p={10}
			  value={nomorRuangan}
			  onChangeText={setNomorRuangan}
			  focusBorderColor="blue700"
			  suffix={<Icon onPress={() => setNomorRuangan('')} name="close" size={20} />}
			/>

			<Button
			    mt="lg"
			    disabled={nomorRuangan && mataPelajaran && namaKelas ? false : true}
			    px="xl"
			    py="lg"
			    bg="#05dce3"
			    borderWidth={0}
			    color="#080808"
			    underlayColor="red100"
			    onPress={() => console.log(route.params)}
			>
			Simpan
			</Button>

	    </Div>

	    </>
	)
}