import React, { useRef, useState, useContext, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Dimensions, 
    PermissionsAndroid, Platform, Alert, ImageBackground } from "react-native";
import { Div, Text, Button, Row, Dropdown, Skeleton } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { pick, types } from "@react-native-documents/picker";
import RNFS  from 'react-native-fs'
import { AuthProvider, AuthContext } from "../../provider/ProviderService";
import ReactNativeBlobUtil from 'react-native-blob-util'

import LampiranComponent from "../../component/LampiranComponent";
import url from '../../api/Endpoint'



const AssigsmentScreens = ({ route }) => {
    const dropdownRef = useRef();

    const { TugasDetail, TugasKirim, MyAsigsment } = useContext(AuthContext);
    const [lampiran, setLampiran] = useState([]);
    const [dataTugas, setDataTugas] = useState(null);
    const [asigsment, setAsigsment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAsign,setLoadingAsign] = useState(false)
    const [checkDownload,setCheckDownload] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0);

    const RequestData = async () => {
        setLoading(true);
        const result = await TugasDetail(route.params.task.id_tugas);
        const result2 = await MyAsigsment(route.params.task.id_tugas);
        if (result.status && result2) {
            setDataTugas(result.data.data);
            if (result2.data.send) {
                const dataAsigsment = result2.data.data.name_file.split(",").map((item) => {
                    return {
                        uri: `${url}open/${item.trim()}`,
                        type: item.split(".").pop() == "pdf" ? `application/${item.split(".").pop()}` : `image/${item.split(".").pop()}`,
                    };
                });
                setAsigsment(true);
                setLampiran(dataAsigsment);
            }
            setLoading(false);
        }
        setLoading(false);
    };

    // Ambil File PDF
    const getFiles = async () => {
        try {
            const pdfResults = await pick({
                type: [types.pdf, types.images],
                allowMultiSelection: true,
            });
            setLampiran((Items) => [...Items, ...pdfResults]);
        } catch (err) {}
    };

    const updateFiles = async (index) => {
        try {
            const pdfResults = await pick({
                type: [types.pdf, types.images],
            });
            setLampiran((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = pdfResults[0];
                return updatedItems;
            });
        } catch (err) {}
    };

    // Delete Lampiran
    const deleteLampiranAtIndex = (indexToDelete) => {
        setLampiran((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const SendingTugas = async () => {
        setLoadingAsign(true)
        const formData = new FormData();
        formData.append("kode_kelas", route.params.kelas.kode_kelas);
        formData.append("id_tugas", route.params.task.id_tugas);
        if (lampiran.length > 0) {
            for (const file of lampiran) {
                formData.append("lampiran", {
                    uri: file.uri,
                    name: file.name,
                    type: file.type,
                });
            }
        }
        const results = await TugasKirim(formData);
        console.log(results)
        if (results.status) {
            await RequestData()
        }
        setLoadingAsign(false)
    };


    const CheckFilesDownload = async (data,index) => {
      const { fs } = ReactNativeBlobUtil;
      const folderPath = RNFS.DownloadDirectoryPath;
      const nameFile = data.uri.substring(data.uri.lastIndexOf('/') + 1)
      try {
        const files = await fs.ls(folderPath);
        for (const fileName of files) {
          if (fileName === nameFile) {
            console.log('File Ada !!');
            const fileUri = `file://${folderPath}/${nameFile}`;
            setLampiran(prevItems =>
                prevItems.map((item, i) => 
                  i === index ? { ...item, uri:fileUri } : item
                )
            );            
          }
        }
        

      } catch (err) {
        console.error('Error listing files or building URIs:', err);
      }
    };

    const SaveFile = async (data) => {
        try {
            const { config, fs, MediaCollection } = ReactNativeBlobUtil;

            const fileUrl = data.uri;
            const mime = data.type || "application/pdf";
            const fileExtension = fileUrl.split(".").pop().split("?")[0]; 
            const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1).split("?")[0];

            const downloadDir = fs.dirs.DownloadDir;
            const assignmentDir = `${downloadDir}/Asigsment`;

            const folderExists = await fs.exists(assignmentDir);
            if (!folderExists) {
                await fs.mkdir(assignmentDir);
            }

            const fullPath = `${assignmentDir}/${fileName}`;

            const options = {
                fileCache: true,
                path: fullPath,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    description: "Downloading file...",
                    path: fullPath,
                    title: fileName,
                },
            };

            console.log("Downloading from:", fileUrl);
           const task = config(options)
            .fetch("GET", fileUrl)
            .progress({ count: 10 }, (received, total) => {
                const percent = (received / total) * 100;
                console.log(`Progress: ${percent.toFixed(2)}%`);
            });

            const res = await task;

            const stat = await fs.stat(res.path());
            if (parseInt(stat.size) === 0) {
                throw new Error("File is empty or corrupt.");
            }

            const fileExists = await fs.exists(res.path());
            if (fileExists) {
                const result = await MediaCollection.copyToMediaStore(
                    {
                        name: fileName,
                        parentFolder: '',
                        mimeType: mime,
                    },
                    "Download",
                    res.path()
                );
                if (result) {
                    fs.unlink(res.path())
                    .then(data => console.log(data))
                    .catch(er => console.log(er))
                }
            }

            Alert.alert("Download complete", `File saved to: ${res.path()}`);
        } catch (error) {
            console.error("Download failed:", error);
            Alert.alert("Download failed", error.message || "Failed to download file");
        }
    };







   

    useEffect(() => {
        if (dataTugas == null || asigsment == null) {
            RequestData();            
        }

        if (lampiran && lampiran.length > 0 && !checkDownload) {
            lampiran.forEach((item, index) => {
                CheckFilesDownload(item, index);
            });
            setCheckDownload(true)
        }

        

    }, [lampiran]);

    if (loading) {
        return (
            <Div flex={1} bg="#fff">
                <Div mx={20} my={30} gap={20}>
                    <Skeleton.Box w="20%" />
                    <Skeleton.Box h="70%" />
                </Div>
            </Div>
        );
    } else {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let tenggatFormatted = null;

        if (dataTugas?.tenggat_waktu) {
            const tanggal = new Date(dataTugas.tenggat_waktu);
            const hari = days[tanggal.getDay()];
            const tgl = tanggal.getDate();
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
                </ScrollView>

                {dataTugas?.type == "Tugas" ? (
                    <Div position="absolute" bottom={20} left={0} right={0} alignItems="center">
                        <Button block bg="blue600" p="md" color="white" w="100%" onPress={() => dropdownRef.current.open()}>
                            Kirim Tugas
                        </Button>
                    </Div>
                ) : null}
                {/* Dropdown modal */}
                <Dropdown
                    ref={dropdownRef}
                    h="100%"
                    w="100%"
                    maxHeight="100%"
                    title={
                        <>
                            <Text mx="xl" color="#1a1b1c" pb="md">
                                Tugas Anda :{asigsment ? " Sudah Di Serahkan" : " Belum Di Serahkan"}
                            </Text>
                            {tenggatFormatted && (
                                <Text mx="xl" color="#1a1b1c" pb="md">
                                    {tenggatFormatted}
                                </Text>
                            )}
                            <Text mx="xl" color="#1a1b1c" pb="md">
                                Nilai : {!asigsment ? asigsment : " Belum Di Nilai"}
                            </Text>
                        </>
                    }
                    showSwipeIndicator={true}
                    roundedTop="xl"
                >
                    <Div px={25} pb={20}>
                        {!asigsment && (
                            <>
                                {loadingAsign ? (
                                    <Skeleton.Box w="100%" h={50} />
                                ) : (
                                    <>
                                        <Button
                                            disabled={!lampiran.length}
                                            onPress={SendingTugas}
                                            mt="lg"
                                            w="100%"
                                            bg="green700"
                                            color="white"
                                            suffix={
                                                <Icon
                                                    style={{ marginLeft: 10 }}
                                                    color="#fff"
                                                    name="recycling"
                                                    size={20}
                                                />
                                            }
                                        >
                                            Serahkan
                                        </Button>
                                        <Button
                                            onPress={getFiles}
                                            mt="lg"
                                            w="100%"
                                            bg="gray100"
                                            color="black"
                                            suffix={
                                                <Icon
                                                    style={{ marginLeft: 10 }}
                                                    color="black"
                                                    name="cloud-upload"
                                                    size={20}
                                                />
                                            }
                                        >
                                            Upload Tugas
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                    </Div>

                    <Div row flexWrap="wrap" w="90%" mx="xl" rounded="xl" bg="white" overflow="hidden" alignSelf="center" gap={10}>
                        {lampiran.map((data, index) => (
                            <LampiranComponent
                                datas={data}
                                btn={
                                    !asigsment ? (
                                        <>
                                            <Icon onPress={() => deleteLampiranAtIndex(index)} name="delete" size={20} />
                                            <Icon onPress={() => updateFiles(index)} name="attach-file" size={20} />
                                        </>
                                    ) : <Icon name="save-alt" size={20} 
                                        onPress={() => SaveFile(data)}/>
                                }
                            />
                        ))}
                    </Div>
                </Dropdown>
            </Div>
        );
    }
};

export default AssigsmentScreens;
