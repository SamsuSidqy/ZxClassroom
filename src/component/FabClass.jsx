import React from "react";
import { TouchableOpacity } from "react-native";
import { Div, Text, Icon } from "react-native-magnus";
import { useNavigation } from '@react-navigation/native';

export default function FabClass(){
  const nav = useNavigation();
	return(
	 <TouchableOpacity
   onPress={() => nav.navigate('CreateTask')}
        style={{
          position: 'absolute',
          bottom: 80, 
          right: 20,
          zIndex: 10,
        }}
      >
        <Div
          rounded="circle"
          bg="blue700"
          h={50}
          w={50}
          justifyContent="center"
          alignItems="center"
          shadow="md"
        >
          <Icon name="plus" fontFamily="Feather" color="white" fontSize="2xl" />
        </Div>
      </TouchableOpacity>
	)
}