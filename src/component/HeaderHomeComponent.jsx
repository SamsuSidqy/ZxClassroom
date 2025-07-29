import React, { useContext } from 'react';
import { Div, Text, Image, Avatar } from 'react-native-magnus';
import {TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {AuthProvider, AuthContext} from '../provider/ProviderService'
import { useNavigation } from '@react-navigation/native';
import url from '../api/Endpoint'
const HeaderUserComponent = ({ username, onMenuPress,settings,chat}) => {
  const nav = useNavigation()
  const { account } = useContext(AuthContext);

  return (
    <Div
      row
      justifyContent="space-between"
      alignItems="center"
      px="lg"
      py="md"
      bg="white"
      shadow="sm"
    >
      {/* Kiri: Menu & Username */}
      <Div row alignItems="center">
        <TouchableOpacity onPress={onMenuPress}>
        <Icon
          name="space-dashboard"
          size={25}
          color="black"
        />
        </TouchableOpacity>
        <Text p={15} fontSize="lg" fontWeight="bold">Hello, {account?.username} !!</Text>
      </Div>

      {/* Kanan: Profile Pic */}
      <Div gap={10} row justifyContent="space-between" alignItems="center">
        {/*<Image
          source={{ uri: profileImage }}
          h={40}
          w={40}
          rounded="circle"
          borderWidth={1}
          borderColor="gray200"
        />*/}
        <TouchableOpacity onPress={() => nav.navigate('MyProfile')}>
        <Avatar size={40} 
        source={account?.profile ? {uri:`${url}profile/${account.profile}`} : null}
        bg="green800">
          {account?.profile ? null : <Icon name="person-3" size={25} color="#fff" />}
        </Avatar>
        </TouchableOpacity>
        {settings}
        {chat}
      </Div>
    </Div>
  );
};

export default HeaderUserComponent;
