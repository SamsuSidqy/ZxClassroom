import { SafeAreaView, StatusBar, 
	TouchableOpacity, Dimensions  } from 'react-native';
import {createRef} from 'react';
import {
  Div,
  Text,
  Button,
  Image,
  Header,
  Input,
  Dropdown,
  ThemeProvider,
} from 'react-native-magnus';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function LoginComponent({}){
	const dropDownLogin = createRef();
	const dropDownSignup = createRef();

	const windowHeight = Dimensions.get('window').height;

	return(
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
				source={require('../utils/icon3.png')}
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
			  h={windowHeight * 0.5}
			  showSwipeIndicator={true}
			  roundedTop="xl">

			  <Div mx={20} my={10} gap={30}>

			  <Input
				  placeholder="Username / Email"
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="elderly" size={20} />}
			  />

			  <Input
				  placeholder="Password"
				  p={10}
				  focusBorderColor="#08009f"
				  prefix={<Icon name="lock" size={20} />}
				  suffix={<Icon name="key" size={20} />}
			  />

			  <Button
			  	w="100%"			   
			    bg="#08009f"
			    color="white"
			    underlayColor="#c0aee0"
			    rounded={7}
			  >
			    <Text fontSize={18} color="#fff" >Login</Text>
			  </Button>

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
			  h={windowHeight * 0.6}
			  showSwipeIndicator={true}
			  roundedTop="xl">
			  
			</Dropdown>


		</Div>
	)
}