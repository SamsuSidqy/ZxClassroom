import React,{useState} from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Div, Avatar, Button, Text } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function PeopleClassComponent(){
	return(
		<ScrollView>
		<Div mx={20} my={15} gap={10}>
			<Div gap={10}>
				<Text fontSize={18}>Pengajar</Text>
				<Div w="100%" borderColor="#1a1919" borderWidth={0.2} />
			</Div>

			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Siti Jubaedah</Text>
			</Div>

			<Div gap={10}>
				<Text fontSize={18}>Siswa</Text>
				<Div w="100%" borderColor="#1a1919" borderWidth={0.2} />
			</Div>

			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>

			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>

			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>

			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>asd</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>Nigger</Text>
			</Div>
			<Div row justifyContent="flex-start" gap={10} alignItems="center" >
				<Avatar bg="green800" >
				  <Icon name="dashboard"  />
				</Avatar>
				<Text fontSize={15}>bbb</Text>
			</Div>
		</Div>
		</ScrollView>
	)
}