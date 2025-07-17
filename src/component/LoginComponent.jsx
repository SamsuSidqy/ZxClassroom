import { SafeAreaView, StatusBar, 
	TouchableOpacity, Dimensions  } from 'react-native';
import {createRef, useContext, useState} from 'react';
import {
  Div,
  Text,
  Button,
  Image,
  Header,
  Input,
  Dropdown,
  ThemeProvider,
  Skeleton,
  Snackbar
} from 'react-native-magnus';
import Icon from "react-native-vector-icons/MaterialIcons";
import {AuthProvider, AuthContext} from '../provider/ProviderService'
import { useNavigation } from '@react-navigation/native';

export default function LoginComponent({}){
	const dropDownLogin = createRef();
	const dropDownSignup = createRef();

	const windowHeight = Dimensions.get('window').height;
	const nav = useNavigation();

	const { register, loginUser } = useContext(AuthContext);

	const [loading,setLoading] = useState(false)
	const [errors,setErrors] = useState(false)
	const [message,setMessage] = useState('')
	const [pwS,setPws] = useState(true)

	const [username,setUsername] = useState('')
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')


	// Register
	 const handleRegister = async () => {
	 	setLoading(true)
	 	const usersData = {username,email,password}
	 	const result = await register(usersData)
	 	console.log(result)
	 	if (!result.status) {
	 		setErrors(true)
	 		setMessage(result.error)
	 		setTimeout(() => {
		 		setMessage('')
		 		setErrors(false)
		 	},5000)
	 	}else{
	 		setMessage(result.data.message)
	 		setPassword('')
	 		setUsername('')
	 		setEmail('')
	 		nav.navigate('Home')
	 	}
	 	setLoading(false)
	 	
	 }

	 // Register
	 const handleLogin = async () => {
	 	setLoading(true)
	 	const usersData = {username,password}
	 	const result = await loginUser(usersData)
	 	console.log(result)
	 	if (!result.status) {
	 		setErrors(true)
	 		setMessage(result.error)
	 	}else{
	 		setPassword('')
	 		setUsername('')
	 		setEmail('')
	 	}
	 	setLoading(false)
	 	setTimeout(() => {
	 		setMessage('')
	 		setErrors(false)
	 	},5000)
	 }

	 

	return(
		<>

		<Div>
			
			<Div mx={20} my={50}>
				<Image
				w={50}
				h={50}
				source={require('../utils/logo.png')}
				/>
			</Div>

			<Div mx={20} alignItems="center">
				<Image
				w={300}
				h={300}
				source={require('../utils/icon4.png')}
				/>
			</Div>

			<Div mx={20} gap={10} alignItems="center" mt={30}>
				<Text fontSize={25} fontWeight="bold" >
					Hello Teman !!
				</Text>
				<Div mx={20}>
					<Text textAlign="center">
					It is a long established fact that a reader will be 
					distracted by the readable content
					</Text>
				</Div>
			</Div>

			<Div mx={20} gap={10} justifyContent="center" alignItems="center" mt={30}>
				<TouchableOpacity
				onPress={() => dropDownLogin.current.open()}
				>
				<Div
				borderWidth={1}
				borderColor="#3400e9"
				px={120}
				py={10}
				rounded={10}
				bg="#3400e9"
				>
					<Text color="#fff" fontSize={15} >Sign In</Text>
				</Div>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={() => dropDownSignup.current.open()}
				>
				<Div
				borderWidth={1}
				borderColor="#3400e9"
				px={120}
				py={10}
				rounded={10}				
				>
					<Text fontSize={15} >Sign Up</Text>
				</Div>
				</TouchableOpacity>

			</Div>


			<Dropdown
			  ref={dropDownLogin}
			  title={
			    <Text mx="xl" color="gray500" pb="md">
			      
			    </Text>
			  }
			  mt="md"
			  pb="2xl"
			  w="100%"
			  h={message ? windowHeight * 0.6 : windowHeight * 0.5}
			  showSwipeIndicator={true}
			  roundedTop="xl">

			  <Div mx={20} my={10} gap={30}>

			  {message ? ( 
			  <Div row justifyContent="space-between" 
			  bg={errors ? "#e6645c" : "#4da83d"} rounded={10} p={10} >
			  	<Text color="#fff" fontWeight="bold" >{message}</Text>
			  	<Icon name={errors ?"error" : "check"} color="#fff" size={20} />
			  </Div>)
			  :null}

			  <Input
				  placeholder="Username / Email"
				  value={username} 
				  onChangeText={setUsername}
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="elderly" size={20} />}
			  />

			  <Input
				  placeholder="Password"
				  value={password} 
				  onChangeText={setPassword}
				  p={10}
				  secureTextEntry={pwS}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="lock" size={20} />}
				  suffix={<Icon name={pwS ? "key" : "key-off"} onPress={() => setPws(!pwS)} size={20} />}
			  />

			  {loading ? (<Skeleton.Box w="100%" h={50}/>) : (
			  	<Button
			  	w="100%"			   
			    bg="#08009f"
			    color="white"
			    underlayColor="#c0aee0"
			    rounded={7}
			    onPress={handleLogin}
			  >
			    <Text fontSize={18} color="#fff" >Login</Text>
			  </Button>
			  )}

			  <Div row alignItems="center">
			  <Div flex={1} height={5} bg="gray200" />
			  <Text mx="md" fontSize="sm" color="gray700">
			    ZX ClassRoom
			  </Text>
			  <Div flex={1} height={5} bg="gray200" />
			  </Div>

			  </Div>			  
			</Dropdown>

			<Dropdown
			  ref={dropDownSignup}
			  title={
			    <Text mx="xl" color="gray500" pb="md">
			      
			    </Text>
			  }
			  mt="md"
			  pb="2xl"
			  w="100%"
			  h={message ? windowHeight * 0.7 : windowHeight * 0.6}
			  showSwipeIndicator={true}
			  roundedTop="xl">
			  
			  <Div mx={20} my={10} gap={30}>

			  {message ? ( 
			  <Div row justifyContent="space-between" 
			  bg={errors ? "#e6645c" : "#4da83d"} rounded={10} p={10} >
			  	<Text color="#fff" fontWeight="bold" >{message}</Text>
			  	<Icon name={errors ?"error" : "check"} color="#fff" size={20} />
			  </Div>)
			  :null}

			  <Input
				  placeholder="Username"
				  value={username} 
				  onChangeText={setUsername}
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="groups" size={20} />}
			  />

			    <Input
				  placeholder="Email"
				  value={email} 
				  onChangeText={setEmail}
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="email" size={20} />}
			  />

			  <Input
				  placeholder="Password"
				  value={password} 
				  onChangeText={setPassword}
				  secureTextEntry={pwS}
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="lock" size={20} />}
				  suffix={<Icon name={pwS ? "key" : "key-off"} onPress={() => setPws(!pwS)} size={20} />}
			  />

			  
			  {loading ? (<Skeleton.Box w="100%" h={50}/>) : (
			  	<Button
			  	w="100%"			   
			    bg="#08009f"
			    color="white"
			    underlayColor="#c0aee0"
			    rounded={7}
			    onPress={handleRegister}
			  >
			    <Text fontSize={18} color="#fff" >Register</Text>
			  </Button>
			  )}

			  <Div row alignItems="center">
			  <Div flex={1} height={5} bg="gray200" />
			  <Text mx="md" fontSize="sm" color="gray700">
			    ZX ClassRoom
			  </Text>
			  <Div flex={1} height={5} bg="gray200" />
			  </Div>

			  </Div>	



			</Dropdown>


		</Div>
		</>
	)
}