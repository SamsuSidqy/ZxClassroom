import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Button, Text, Icon } from "react-native-magnus";

import { useNavigation } from '@react-navigation/native';

export default function TaskClassComponent({data,kelas,teacher}){
	const nav = useNavigation();
	return(
		<Div>
			<Div bg="teal600" mx={20} p="lg" rounded="xl" m="md">
	          <Text color="white" fontSize="xl" fontWeight="bold">
	            {kelas.nama_kelas}
	          </Text>
	          <Text color="white">{kelas.mata_pelajaran}</Text>
	        </Div>

	        {/* Pengumuman */}
	        <Div

	          p="md"
	          mx={20}
	          rounded="md"
	          row
	          alignItems="center"
	        >
	         {teacher ? (
	          <Button
	            block
	            onPress={() => nav.navigate('CreateAnnounch')}
	            suffix={
	              <Icon
	                position="absolute"
	                right={8}
	                name="edit"
	                color="white"
	              />
	            }
	            
	            bg="blue600"
	            p={12}
	            color="white"
	            rounded="circle"
	            mt="lg">
	            Buat Pengumuman
	          </Button>
	         ):null}
	        </Div>

	        {/* Tugas Cards */}
	        {data.map((task, index) => (
	          <TouchableOpacity
	           style={{
	            paddingVertical:5
	           }}
	           onPress={() => nav.navigate(teacher ? 'MyAssigsment' : 'Assigsment')}>
	          <Div
	            key={index}
	            bg="white"
	            p={25}
	            mx={20}
	            mt="md"
	            rounded="md"
	            shadow="sm"
	          >
	            <Div row alignItems="center">
	              <Icon
	                name="clipboard"
	                fontFamily="Feather"
	                color="blue500"
	                fontSize="4xl"
	                mr="md"
	              />
	              <Div>
	                <Text fontWeight="bold">{task.judul}</Text>
	                <Text color="gray600">{task.tenggat_waktu ? data.tenggat_waktu : "Tidak Ada Tenggat Waktu"}</Text>
	                {/*<Text color="blue500" mt="sm">
	                  Tambahkan komentar kelas
	                </Text>*/}
	              </Div>
	            </Div>
	          </Div>
	        </TouchableOpacity>
	        ))}
		</Div>
	)
}