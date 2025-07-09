import React, { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { Div, Text, Button, Row, Dropdown } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { pick, types } from '@react-native-documents/picker';

import LampiranComponent from "../../component/LampiranComponent";

const AssigsmentScreens = () => {
    const dropdownRef = useRef();

    const [lampiran,setLampiran] = useState([]);


    // Ambil File PDF
    const getFiles = async() => {
        try {
            const pdfResults = await pick({
                 type: [types.pdf,types.images],
                 allowMultiSelection:true
            })
            setLampiran(Items => [...Items, ...pdfResults]);
          } catch (err) {

          }
    }

    const updateFiles = async(index) => {
        try {
            const pdfResults = await pick({
                 type: [types.pdf,types.images],
            })
            setLampiran((prevItems => {
              const updatedItems = [...prevItems] 
              updatedItems[index] = pdfResults[0]     
              return updatedItems;                
            }))

          } catch (err) {

          }
    }

    // Delete Lampiran
    const deleteLampiranAtIndex = (indexToDelete) => {
      setLampiran(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    return (
        <Div flex={1} bg="white">
            {/* Konten scrollable */}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <Div mx={20} my={35} gap={12}>
                    <Text fontSize={19} fontWeight="bold">
                        Title
                    </Text>
                    <Div>
                        <Text fontSize="lg" lineHeight={24} textAlign="justify" color="gray700">
                            React Native Magnus adalah sebuah UI framework untuk React Native yang memudahkan pengembangan aplikasi mobile dengan komponen yang sudah bergaya secara default. Anda bisa membuat tampilan yang konsisten dan rapi
                            hanya dengan beberapa baris kode, tanpa harus mengatur banyak style secara manual.
                        </Text>
                    </Div>

                    <Div gap={5}>
                        <Div w="100%" gap={5} row justifyContent="space-between" alignItems="center" mt="xl">
                            <Text color="#349eeb">data.name.pdf</Text>
                            <Div gap={15} row justifyContent="space-between">
                                <TouchableOpacity>
                                    <Icon name="remove-red-eye" size={20} />
                                </TouchableOpacity>
                            </Div>
                        </Div>
                    </Div>
                </Div>

                {/* Tambahkan konten tambahan di sini */}
            </ScrollView>

            {/* Tombol di bagian bawah layar */}
            <Div position="absolute" bottom={20} left={0} right={0} alignItems="center">
                <Button block bg="blue600" p="md" color="white" w="100%" onPress={() => dropdownRef.current.open()}>
                    Kirim Tugas
                </Button>
            </Div>

            {/* Dropdown modal */}
            <Dropdown
                ref={dropdownRef}
                h="100%"
                w="100%"
                maxHeight="100%"
                title={
                    <Text mx="xl" color="gray500" pb="md">
                        Tugas Anda
                    </Text>
                }
                showSwipeIndicator={true}
                roundedTop="xl"
            >
                <Div px={25} pb={20}>
                    <Button mt="lg" w="100%" bg="green700" color="white" suffix={<Icon style={{ marginLeft: 10 }} color="#fff" name="recycling" size={20} />}>
                        Serahkan
                    </Button>
                    <Button onPress={getFiles} mt="lg" w="100%" bg="gray100" color="black" suffix={<Icon style={{ marginLeft: 10 }} color="black" name="cloud-upload" size={20} />}>
                        Upload Tugas
                    </Button>
                </Div>
                <Div
                row
                  flexWrap="wrap"
                  w="90%"
                  mx="xl"
                  rounded="xl"
                  bg="white"
                  overflow="hidden"
                  alignSelf="center" gap={10}
                >
                {lampiran.map((data,index) => <LampiranComponent datas={data} btn={
                    <>
                    <Icon onPress={() => deleteLampiranAtIndex(index)} name="delete" size={20} />
                    <Icon onPress={() => updateFiles(index)} name="attach-file" size={20} />
                    </>
                } />)}
                </Div>
            </Dropdown>
        </Div>
    );
};

export default AssigsmentScreens;
