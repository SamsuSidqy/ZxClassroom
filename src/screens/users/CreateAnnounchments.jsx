import React, {useState, useContext} from "react";
import { ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import { Div, Button, Text, Dropdown, Overlay, Input } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { pick, types } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { useNavigation } from '@react-navigation/native';

import HeaderTaskComponent from '../../component/HeaderTaskComponent';
import LampiranComponent from '../../component/LampiranComponent';

import {AuthProvider, AuthContext} from '../../provider/ProviderService'


export default function CreateAnnounchments({route}){
	const [dates,setDates] = useState('')
	const [lampiran,setLampiran] = useState([]);

	const { BuatPengumuman } = useContext(AuthContext);

	const [judul,setJudul] = useState('')
	const [deskripsi,setDeskripsi] = useState('')
	const [loading,setLoading] = useState(false)


	const HandleCreateAnnounce = async() => {

		setLoading(true)

		const formData = new FormData()
		formData.append("judul",judul)
		formData.append("deskripsi",deskripsi)
		formData.append("kode_kelas",route.params.kode_kelas)
		

		if(lampiran.length > 0){
			for (const file of lampiran) {
				formData.append("lampiran", {
					uri: file.uri,
					name: file.name,
					type: file.type
				});
			}
		}
		console.log(formData)
		const results = await BuatPengumuman(formData)
		console.log()
		if (results.status) {
			setLampiran([])
			setJudul('')
			setDeskripsi('')
			setLoading(false)
			nav.goBack()
		}else{
			setLampiran([])
			setJudul('')
			setDeskripsi('')
			setLoading(false)
		}

	}

	// Ambil File PDF
	const getFilesPDF = async() => {
		try {
	        const pdfResults = await pick({
	        	 type: [types.pdf,types.images],
	        	 allowMultiSelection:true
	        })
	        setLampiran(Items => [...Items, ...pdfResults]);
	      } catch (err) {

	      }
	}

	

	// Delete Lampiran
	const deleteLampiranAtIndex = (indexToDelete) => {
	  setLampiran(prev => prev.filter((_, index) => index !== indexToDelete));
	};



	const nav = useNavigation();
	return(
		<Div bg="#fff">
			<Overlay visible={loading} alignItems="center" 
			justifyContent="center" w="100%" h="100%" bg="transparent">
			  <ActivityIndicator size="large" color="#00ff00"/>
			</Overlay>
			<HeaderTaskComponent 
			tombol={<Button 
				disabled={judul.length && deskripsi.length ? false : true}
				onPress={HandleCreateAnnounce} px={30} py={8}>Submit</Button>}
			/>
			<ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
				<Div
				mx={15}
				my={20}
				gap={10}
				>	
					<Input
					  placeholder="Title"
					  onChangeText={setJudul}
					  value={judul}
					  p={10}
					  focusBorderColor="blue700"
					  prefix={<Icon name="campaign" size={20} />}
					/>

					<Input
					  placeholder="Deskripsi Pengumuman"
					  multiline={true}
					  onChangeText={setDeskripsi}
					  value={deskripsi}
					  p={10}
					  focusBorderColor="blue700"
					  prefix={<Icon name="dashboard" size={20} />}
					/>

					
					<Div gap={10} row justifyContent="flex-start" alignItems="center" mt="xl">
						<Button
						    bg="white"
						    borderless
						    shadow="sm"
						    h={40}
						    w={40}
						    rounded="circle"
						    alignSelf="center"
						    onPress={getFilesPDF}
						  >
						    <Icon name="attachment" size={15} />
						  </Button>

						 
					</Div>

					<Div gap={5}>
						{lampiran.map((data,index) => (
							<Div key={index}  w="100%" gap={5} row justifyContent="space-between" alignItems="center" mt="xl">
							  <Text color="#349eeb">{data.name.length > 25 ? `${data.name.substring(0,25)}...` : data.name}</Text>
							  <Div gap={15} row justifyContent="space-between">

							  	  <TouchableOpacity onPress={() => deleteLampiranAtIndex(index)}>
								  <Icon name="delete-outline" size={20} />
								  </TouchableOpacity>

								  <TouchableOpacity
								  onPress={() => {
								  	viewDocument({ uri: data.uri, mimeType: data.type }).catch((er) => console.log(er))
								  }}
								  >
								  <Icon name="remove-red-eye" size={20} />
								  </TouchableOpacity>
							  </Div>
							</Div>
						))}
					</Div>


				</Div>
			</ScrollView>

			

		</Div>
	)
}