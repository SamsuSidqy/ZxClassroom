import React, { useState, useContext, useCallback, useRef, useEffect } from "react";
import { ScrollView, TouchableOpacity, RefreshControl, 
	BackHandler, ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { Div, Button, 
	Text, Badge, Header, Avatar, Input,
	 } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "../../provider/ProviderService";
import { pick, types } from "@react-native-documents/picker";
import url from "../../api/Endpoint";

export default function ForumScreens({route}) {
	const nav = useNavigation()

	const ws = useRef(null);
	const scrollRef = useRef(null);
	const isAtBottomRef = useRef(true)

	const [isAtBottom, setIsAtBottom] = useState(true);
	const [newMessageAlert, setNewMessageAlert] = useState(false);
	const [messages, setMessages] = useState([]);
	const [messageReq,setMessageReq] = useState(null)
	const [tulisPesan,setTulisPesan] = useState('')
	const [usersOnline,setUsersOnline] = useState(0)
	const [listUserOnline,setListUserOnline] = useState([])
	const [online,setOnline] = useState(false)

	const { account, PesanList } = useContext(AuthContext);


	const RequestPesan = async() => {
		const results = await PesanList(route.params.kode_kelas)
		if (results.status) {
			setMessageReq(results.data.data)
		}else{
			setMessageReq([])
		}
		
	}

	const KirimPesan = () => {
		
		ws.current.send(JSON.stringify({type:'message',message:tulisPesan}));
		const myPesan = {
			type:'message',
			message:tulisPesan,
			sender:null
		}
		setMessages(prev => [...prev,myPesan])
		setTulisPesan('')

		if (isAtBottomRef.current) {
	      setTimeout(() => {
	        scrollRef.current?.scrollToEnd({ animated: true });
	      }, 100);
	    }
	}


	useEffect(() => {
		ws.current = new WebSocket(`ws://${url.split("/")[2]}`);

		ws.current.onopen = () => {
		  setOnline(true)
		  const user = {
		  	id_users : account.id_users,
		  	username : account.username,
		  	profile : account.profile
		  }
		  ws.current.send(JSON.stringify({type:'join',users:user,room:route.params.kode_kelas}))
	      console.log('WebSocket connected');
	    };

	    ws.current.onmessage = (e) => {
	      const message = JSON.parse(e.data);
	      if (message.type === 'users') {
	      	setListUserOnline(message.users)
	      	setUsersOnline(message.users.length);
	      }
	      if (message.type === 'message') {
	      	setMessages(prev => [...prev, message]);

	      	if (isAtBottomRef.current) {
	          setTimeout(() => {
	            scrollRef.current?.scrollToEnd({ animated: true });
	          }, 100);
	        } else {
	          setNewMessageAlert(true);
	        }
	      }
	    };

	    ws.current.onerror = (e) => {
	      setOnline(false)
	      console.log('WebSocket error', e.message);
	    };

	    ws.current.onclose = (e) => {
	      setOnline(false)	
	      console.log('WebSocket closed', e.code, e.reason);
	    };
	    return () => {
      		ws.current.close();
    	};

	},[])

	useEffect(() => {

		if (messageReq == null) {
			RequestPesan()
		}

	    setTimeout(() => {
	      scrollRef.current?.scrollToEnd({ animated: false });
	    }, 300);

	  }, [messageReq]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
            <Div flex={1} bg="white" position="relative">
            	<Header
				  minH={1}
				  borderBottomColor="gray200"
				  alignment="center"
				  prefix={
				    <Button onPress={() => nav.goBack()} bg="transparent">
				      <Icon name="arrow-back" size={15} />
				    </Button>
				  }
				  suffix={
				  	 <Button bg="transparent">
				      <Icon name="language" color={online ? 'green' : 'red'} size={15} />
				      <Text> {usersOnline}</Text>
				    </Button>
				  }
				>
				{route.params?.nama_kelas}
				</Header>

                <ScrollView 
                  ref={scrollRef}
		          contentContainerStyle={{ paddingBottom: 10 }}
		          onScroll={({ nativeEvent }) => {
		            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
		            const isBottom =
		              layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

		            isAtBottomRef.current = isBottom;
		            setIsAtBottom(isBottom);

		            if (isBottom) setNewMessageAlert(false);
		          }}
		          scrollEventThrottle={100}
                >	
                	{messageReq?.map((item,index) => {
                		if (item.id_users != account.id_users) {
                			return(
                				<>
                				{/*Pengrim*/}
			                    <Div px={15} py={20} row>
			                        <Avatar 
			                        source={item.profile ? null :{ uri: `https://ui-avatars.com/api/?name=${item.username}` }} 
			                        size={30} bg="gray200" mr={10} />

			                        <Div bg="#f1f1f1" p={12} rounded="lg" w="75%">
			                            {/* Username */}
			                            <Text fontWeight="bold" fontSize="md" mb={5}>
			                                {item.username}
			                            </Text>

			                            {/* Pesan */}
			                            <Text fontSize="sm" color="gray800" lineHeight={18}>
			                                {item.message}
			                            </Text>

			                            {/*<Image
			                                source={{ uri: "https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg" }}
			                                style={{
			                                    width: "100%",
			                                    height: 180,
			                                    borderRadius: 10,
			                                }}
			                                resizeMode="cover"
			                            />*/}

			                        </Div>
			                    </Div>
                				</>
                			)
                		}else{
                			return(
                				<>
                				{/*Penerima*/}
			                    <Div px={15} py={20} row justifyContent="flex-end">
			                        {/* Kontainer isi pesan */}
			                        <Div bg="#d1f0e1" p={12} rounded="lg" w="75%" alignItems="flex-end">
			                            {/* Username */}
			                            <Text fontWeight="bold" fontSize="md" mb={5} color="green800">
			                                Saya
			                            </Text>

			                            {/* Pesan sebagai paragraf */}
			                            <Text fontSize="sm" color="gray800" lineHeight={18} mb={10} textAlign="right">
			                                {item.message}
			                            </Text>

			                            {/* Gambar jika ada */}
			                            {/*<Image
									      source={{ uri: "https://via.placeholder.com/200x150" }}
									      style={{
									        width: "100%",
									        height: 180,
									        borderRadius: 10,
									      }}
									      resizeMode="cover"
									    />*/}
			                        </Div>

			                        {/* Gambar profil pengirim */}
			                        <Avatar source={account.profile ? {uri:`${url}profile/${account.profile}`} :{ uri: "https://ui-avatars.com/api/?name=Saya" }} size={30} bg="gray200" ml={10} />
			                    </Div>
                				</>
                			)
                		}
                	})}


                	{messages?.map((item,index) => {
                		if (item.sender) {
                			return(
                				<>
                				{/*Pengrim*/}
			                    <Div px={15} py={20} row>
			                        <Avatar 
			                        source={item.sender.profile ? null :{ uri: `https://ui-avatars.com/api/?name=${item.sender.username}` }} 
			                        size={30} bg="gray200" mr={10} />

			                        <Div bg="#f1f1f1" p={12} rounded="lg" w="75%">
			                            {/* Username */}
			                            <Text fontWeight="bold" fontSize="md" mb={5}>
			                                {item.sender.username}
			                            </Text>

			                            {/* Pesan */}
			                            <Text fontSize="sm" color="gray800" lineHeight={18}>
			                                {item.text}
			                            </Text>

			                            {/*<Image
			                                source={{ uri: "https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg" }}
			                                style={{
			                                    width: "100%",
			                                    height: 180,
			                                    borderRadius: 10,
			                                }}
			                                resizeMode="cover"
			                            />*/}

			                        </Div>
			                    </Div>
                				</>
                			)
                		}else{
                			return(
                				<>
                				{/*Penerima*/}
			                    <Div px={15} py={20} row justifyContent="flex-end">
			                        {/* Kontainer isi pesan */}
			                        <Div bg="#d1f0e1" p={12} rounded="lg" w="75%" alignItems="flex-end">
			                            {/* Username */}
			                            <Text fontWeight="bold" fontSize="md" mb={5} color="green800">
			                                Saya
			                            </Text>

			                            {/* Pesan sebagai paragraf */}
			                            <Text fontSize="sm" color="gray800" lineHeight={18} mb={10} textAlign="right">
			                                {item.message}
			                            </Text>

			                            {/* Gambar jika ada */}
			                            {/*<Image
									      source={{ uri: "https://via.placeholder.com/200x150" }}
									      style={{
									        width: "100%",
									        height: 180,
									        borderRadius: 10,
									      }}
									      resizeMode="cover"
									    />*/}
			                        </Div>

			                        {/* Gambar profil pengirim */}
			                        <Avatar source={account.profile ? {uri:`${url}profile/${account.profile}`} :{ uri: "https://ui-avatars.com/api/?name=Saya" }} size={30} bg="gray200" ml={10} />
			                    </Div>
                				</>
                			)
                		}
                	})}                                  
                </ScrollView>


                {newMessageAlert && (
		          <TouchableOpacity
		            style={{
		              position: "absolute",
		              bottom: 80,
		              right: 20,
		              backgroundColor: "#027ced",
		              borderRadius: 20,
		              padding: 10,
		              zIndex: 10,
		              elevation: 5,
		            }}
		            onPress={() => {
		              scrollRef.current?.scrollToEnd({ animated: true });
		              setNewMessageAlert(false);
		            }}
		          >
		            <Icon name="arrow-downward" color="white" size={24} />
		          </TouchableOpacity>
		        )}

                <Div mx={40} my={15} gap={10} row justifyContent="center" alignItems="center">
                    
                    <Input 
                    onChangeText={setTulisPesan}
                    value={tulisPesan}
                    editable={(online)}
                    placeholder="Tulis sesuatu..." 
                    multiline={true} bg="gray100" rounded="md" w="100%" />
                    <Icon 
                    onPress={KirimPesan}
                    disabled={(tulisPesan.trim() === '' || !online)}
                    color={(tulisPesan.trim() === '' || !online) ? '#a89d9d':"#027ced"} name="send" size={30} />
                </Div>

            </Div>

        </KeyboardAvoidingView>
    );
}
