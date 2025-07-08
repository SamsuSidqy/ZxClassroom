import React, {useState} from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Button, Text, Dropdown, Input } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { pick, types } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { useNavigation } from '@react-navigation/native';

import HeaderTaskComponent from '../../component/HeaderTaskComponent';
import LampiranComponent from '../../component/LampiranComponent';

export default function CreateAnnounchments(){
	const [dates,setDates] = useState('')
	const [lampiran,setLampiran] = useState([]);


	// Ambil File PDF
	const getFilesPDF = async() => {
		try {
	        const pdfResults = await pick({
	        	 type: [types.pdf],
	        	 allowMultiSelection:true
	        })
	        setLampiran(Items => [...Items, ...pdfResults]);
	      } catch (err) {

	      }
	}

	// Ambil File IMAGE
	const getFilesIMAGE = async() => {
		try {
	        const imageResults = await pick({	        	 
	        	 allowMultiSelection:true
	        })
	        setLampiran(Items => [...Items, ...imageResults]);
	      } catch (err) {

	      }
	}

	// Delete Lampiran
	const deleteLampiranAtIndex = (indexToDelete) => {
	  setLampiran(prev => prev.filter((_, index) => index !== indexToDelete));
	};



	const testt = () => {
		console.log("Truee")
	}
	const nav = useNavigation();
	return(
		<Div bg="#fff">
			<HeaderTaskComponent 
			tombol={<Button onPress={testt} px={30} py={8}>Submit</Button>}
			/>
			<ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
				<Div
				mx={15}
				my={20}
				gap={10}
				>	
					<Input
					  placeholder="Title"
					  p={10}
					  focusBorderColor="blue700"
					  prefix={<Icon name="campaign" size={20} />}
					/>

					<Input
					  placeholder="Deskripsi Pengumuman"
					  multiline={true}
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

						  <Button
						    bg="white"
						    borderless
						    shadow="sm"
						    h={40}
						    w={40}
						    rounded="circle"
						    alignSelf="center"
						    onPress={getFilesIMAGE}
						  >
						    <Icon name="photo-camera-back" size={15} />
						  </Button>
					</Div>

					<Div gap={5}>
						{lampiran.map((data,index) => (
							<Div key={index}  w="100%" gap={5} row justifyContent="space-between" alignItems="center" mt="xl">
							  <Text color="#349eeb">{data.name}</Text>
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