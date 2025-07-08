import { SafeAreaView, StatusBar } from 'react-native';
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

export default function BoardingComponent({nextTombol,nexts}){
	return(
		<Div my={40} gap={10}>
        <Div justifyContent="center" alignItems="center" >         
          <Image          
          w={350}
          h={350}
          my={40}
          source={!nexts ? require('../utils/icon1.png') : require('../utils/icon2.png')} />
        </Div>

        <Div mx={50}>
          {
          	!nexts ? (
          	<>
          		<Text fontSize={25} fontWeight="bold">
	          Welcome To
	          </Text>
	          <Text fontSize={25} fontWeight="bold">
	          ZX ClassRoom
	          </Text>
	          <Text mt={10}>
	          orem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar 
	          aliquet purus in rhoncus.           
	          </Text>
	        </>
          	)
          	: (
          	<>
          		<Text fontSize={25} fontWeight="bold">
	          Created By Developer
	          </Text>
	          <Text fontSize={25} fontWeight="bold">
	          Abi Samsoee
	          </Text>
	          <Text mt={10}>
	          orem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar 
	          aliquet purus in rhoncus.           
	          </Text>
	        </>
          	)
          }
        </Div>

        <Div mx={50} my={20}>
          {nextTombol}
        </Div>

      </Div>
	)
}