import React, { useRef, useState, useContext, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Dimensions, ImageBackground } from "react-native";
import { Div, Text, Button, Row,
 Dropdown, Skeleton  } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { pick, types } from '@react-native-documents/picker';
import { AuthProvider, AuthContext } from "../../provider/ProviderService";

import LampiranComponent from "../../component/LampiranComponent";

const AssigsmentScreens = ({route}) => {
    const dropdownRef = useRef();

    const { TugasDetail } = useContext(AuthContext);
    const [lampiran,setLampiran] = useState([]);
    const [dataTugas,setDataTugas] = useState(null)
    const [loading,setLoading] = useState(false)

    const RequestData = async() => {
        setLoading(true)
        const result = await TugasDetail(route.params.task.id_tugas)
        if (result.status) {
            setDataTugas(result.data.data)
            setLoading(false)
        }
        setLoading(false)
    }

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

    useEffect(() => {
        if (dataTugas == null) {
            RequestData()
        }
    },[])

    if (loading) {
        return(
            <Div flex={1} bg="#fff">
                <Div mx={20} my={30} gap={20}>
                    <Skeleton.Box w="20%" />
                    <Skeleton.Box h="70%" />
                </Div>
            </Div>
        )
    }else{

        const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']; 
        let tenggatFormatted = null;

        if (dataTugas?.tenggat_waktu) {
          const tanggal = new Date(dataTugas.tenggat_waktu);
          const hari = days[tanggal.getDay()];
          const tgl = tanggal.getDate()
          const bulan = tanggal.getMonth() + 1; 
          const tahun = tanggal.getFullYear();

          tenggatFormatted = `Tenggat Waktu ${hari}/${tgl}/${bulan}/${tahun}`;
        }

        return (
            <Div flex={1} bg="white">
                {/* Konten scrollable */}
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <Div mx={20} my={35} gap={12}>
                        <Text fontSize={19} fontWeight="bold">
                            {dataTugas?.judul ?? "Memuat judul..."}
                        </Text>
                        <Div>
                            <Text fontSize="lg" lineHeight={24} textAlign="justify" color="gray700">
                               {dataTugas?.deskripsi ?? "Memuat Deskripsi..."}
                            </Text>
                        </Div>
                        {dataTugas?.lampiran
                        ? dataTugas.lampiran.split(",").map((item, index) => (
                        <Div gap={5}>
                            <Div w="100%" gap={5} row justifyContent="space-between" alignItems="center" mt="xl">
                                <Text color="#349eeb">{item}</Text>
                                <Div gap={15} row justifyContent="space-between">
                                    <TouchableOpacity>
                                        <Icon name="remove-red-eye" size={20} />
                                    </TouchableOpacity>
                                </Div>
                            </Div>
                        </Div>
                        ))
                        : null}
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
                       <>
                          <Text mx="xl" color="gray500" pb="md">
                            Tugas Anda :
                          </Text>
                          {tenggatFormatted && (
                            <Text mx="xl" color="gray500" pb="md">
                              {tenggatFormatted}
                            </Text>
                          )}
                        </>
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
    }
};

export default AssigsmentScreens;
