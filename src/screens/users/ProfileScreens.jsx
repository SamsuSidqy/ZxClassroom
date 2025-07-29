import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  ActivityIndicator,
  Alert
} from "react-native";
import { Div, Button, Text, 
	Badge,
	Header,
	Avatar,
	Input,
} from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import {AuthProvider, AuthContext} from '../../provider/ProviderService'
import { pick, types } from '@react-native-documents/picker'
import url from '../../api/Endpoint'

export default function ProfileScreens(){
	const nav = useNavigation()
	const { account, UpdateProfile } = useContext(AuthContext);

	const [username,setUsername] = useState(account?.username)
	const [picture,setPicture] = useState(account?.profile)
	const [profileLamp,setProfileLamp] = useState(null)
	const [loading,setLoading] = useState(false)

	const PicPicture = async() => {
		try{
			const pict = await pick({
	            type: [types.images],
	        });
	        setPicture(pict[0].uri)
	        setProfileLamp(pict[0])
	    }catch(e){
	    	console.log(e)
	    }
	}

	const UpdateUsers = async() => {
		setLoading(true)
		const formData = new FormData()
		formData.append("username",username)
		if (profileLamp) {
			formData.append("profile",profileLamp)
		}
		const results = await UpdateProfile(formData)
		console.log(results)
		if(results.status){
			Alert.alert('Success ✅','Profile Berhasil Di Update')
		}else{
			Alert.alert('Failed ❌','Profile Gagal Di Update')
		}
		setLoading(false)
	}


	return(
		<Div flex={1} bg="#eeeced">
			<Div mx={20} my={20} mb={10} row justifyContent="space-between" >

				<Div row gap={20}>
					<TouchableOpacity onPress={() => nav.goBack()}>
					<Icon name="arrow-back-ios-new" size={25} color="black" />
					</TouchableOpacity>
					<Text fontWeight="bold" >Back</Text>
				</Div>
				<TouchableOpacity onPress={PicPicture} >
					<Icon name="photo-camera-back" size={25} color="black" />
				</TouchableOpacity>
			</Div>

			<Div justifyContent="center" alignItems="center" my={20} gap={25} >
			<Avatar
			  shadow={1}
			  size={120}
			  borderWidth={0.5}
			  source={
			    profileLamp
			      ? { uri: picture } // URI lokal dari file picker
			      : account?.profile
			        ? { uri: `${url}profile/${account?.profile}` } // URI dari server
			        : null
			  }
			  imageProps={{
			    resizeMode: "cover"
			  }}
			>
			{account?.profile ? null : <Icon name="person-outline" size={60} />}
			</Avatar>

			<Text fontSize={30} fontWeight="bold" >{account?.username}</Text>

			</Div>

			<Div bg="#ffffff" mt={25} roundedTop={30} h="100%" >
				<Div my={40} mx={30} gap={25}>
				<Input 
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				borderWidth={0}
				borderBottomWidth={1.5}
				/>

				<Input 
				placeholder="Email"
				value={account?.email}
				editable={false}
				borderWidth={0}
				borderBottomWidth={1.5}
				/>

				<Button onPress={UpdateUsers} bg="#3b5eff" w="100%">
				{loading ? <ActivityIndicator size="small" color="#ffffff" /> : 'SAVE'}
				</Button>
				</Div>
			</Div>

		</Div>
	)
}