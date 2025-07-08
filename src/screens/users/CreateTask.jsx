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

export default function CreateTask(){
	const [dates,setDates] = useState('')
	const [lampiran,setLampiran] = useState([]);


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


	// Date Masa Tenggang
	const getTomorrowDate = () => {
	  const today = new Date();
	  const tomorrow = new Date(today);
	  tomorrow.setDate(today.getDate() + 1);

	  const year = tomorrow.getFullYear();
	  const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
	  const day = tomorrow.getDate().toString().padStart(2, '0');

	  return `${year}-${month}-${day}`;
	};

	const dropdownRef = React.createRef();

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
					  placeholder="Deskripsi Tugas"
					  multiline={true}
					  p={10}
					  focusBorderColor="blue700"
					  prefix={<Icon name="dashboard" size={20} />}
					/>

					<TouchableOpacity onPress={() => {dropdownRef.current.open()}}>
					<Input
					  placeholder="Tidak Ada Batas Waktu"
					  value={dates}
					  editable={false}
					  p={10}
					  focusBorderColor="blue700"
					  prefix={<Icon name="date-range" size={20} />}
					/>
					</TouchableOpacity>



					

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

			<Dropdown
			  ref={dropdownRef}			  
			  mt="md"
			  pb="2xl"
			  showSwipeIndicator={true}
			  roundedTop={20}>
				<Dropdown.Option
			        style={{ paddingHorizontal: 0, justifyContent:'center' }} 
			      >
		        <Calendar
		          w="100%" 
		          initialDate={dates}
		          minDate={getTomorrowDate()}
		          onDayPress={day => {
		          	if (day.dateString == dates) {
		          		setDates("")
		          	}else{
		          		setDates(day.dateString)
		          	}
		            
		            dropdownRef.current.close()
		          }}
		          style={{ paddingHorizontal: 0 }}
		          markedDates={{
				    [dates]: {
				      selected: true,
				      selectedColor: '#00adf5',
				    },
				  }}
		        />
		      </Dropdown.Option>		
			</Dropdown>

		</Div>
	)
}