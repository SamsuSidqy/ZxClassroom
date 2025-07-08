import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Button, Text, Icon } from "react-native-magnus";

import { useNavigation } from '@react-navigation/native';

export default function TaskClassComponent(){
	const nav = useNavigation();
	return(
		<Div>
			<Div bg="teal600" mx={20} p="lg" rounded="xl" m="md">
	          <Text color="white" fontSize="xl" fontWeight="bold">
	            IMK R6Q Genap 24 25
	          </Text>
	          <Text color="white">IMK R6Q Genap 24 25</Text>
	        </Div>

	        {/* Pengumuman */}
	        <Div

	          p="md"
	          mx={20}
	          rounded="md"
	          row
	          alignItems="center"
	        >
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
	        </Div>

	        {/* Tugas Cards */}
	        {[
	          {
	            title: "Tugas baru: Tugas pertemuan 14",
	            date: "23 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas Pertemuan 13 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: tugas pertemuan 12 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas pertemuan 14",
	            date: "23 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas Pertemuan 13 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: tugas pertemuan 12 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas pertemuan 14",
	            date: "23 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas Pertemuan 13 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: tugas pertemuan 12 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas pertemuan 14",
	            date: "23 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas Pertemuan 13 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: tugas pertemuan 12 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas pertemuan 14",
	            date: "23 Jun",
	          },
	          {
	            title: "Tugas baru: Tugas Pertemuan 13 IMK",
	            date: "16 Jun",
	          },
	          {
	            title: "Tugas baru: Wong Jwooo",
	            date: "16 Jun",
	          },
	        ].map((task, index) => (
	          <TouchableOpacity
	           style={{
	            paddingVertical:5
	           }}
	           onPress={() => nav.navigate('Assigsment')}>
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
	                <Text fontWeight="bold">{task.title}</Text>
	                <Text color="gray600">{task.date}</Text>
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