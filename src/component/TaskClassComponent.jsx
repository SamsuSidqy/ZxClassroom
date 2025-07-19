import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Button, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

export default function TaskClassComponent({data,kelas,teacher}){
	const nav = useNavigation();

	const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']; 
   

    const FormatTenggat = (dates) => {
    	 const tanggal = new Date(dates);
          const hari = days[tanggal.getDay()];
          const tgl = tanggal.getDate()
          const bulan = tanggal.getMonth() + 1; 
          const tahun = tanggal.getFullYear();

        return`Tenggat Waktu ${hari}/${tgl}/${bulan}/${tahun}`;
    }

	return(
		<Div>
			<Div bg="teal600" mx={20} p="lg" rounded="xl" m="md" gap={5}>
			  <Text color="#fff">{kelas.teacher ? "( Teacher )":"( Student )"}</Text>
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
	            onPress={() => nav.navigate('CreateAnnounch',kelas)}
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

	        {data.map((task, index) => (
	          <TouchableOpacity
	           style={{
	            paddingVertical:5
	           }}
	           onPress={() => nav.navigate(teacher ? 'MyAssigsment': 'Assigsment',{task})}>
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
	                name={task.type == "Tugas" ?"note-alt" : "campaign"}
	                fontFamily="Feather"
	                color="blue500"
	                size={30}
	                style={{marginRight:20}}
	              />
	              <Div>
	                <Text fontWeight="bold">{task.judul}</Text>
	                <Text color="gray600">{task.tenggat_waktu ? FormatTenggat(task.tenggat_waktu) : "Tidak Ada Tenggat Waktu"}</Text>
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