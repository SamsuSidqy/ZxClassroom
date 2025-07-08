import React, { useRef } from "react";
import { ScrollView, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { Div, Text, Button, Row, Dropdown } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";

import LampiranComponent from "../../component/LampiranComponent";

const AssigsmentScreens = () => {
    const dropdownRef = useRef();

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
                    <Button mt="lg" w="100%" bg="gray100" color="black" suffix={<Icon style={{ marginLeft: 10 }} color="black" name="cloud-upload" size={20} />}>
                        Upload Tugas
                    </Button>
                </Div>
                <LampiranComponent />
            </Dropdown>
        </Div>
    );
};

export default AssigsmentScreens;
