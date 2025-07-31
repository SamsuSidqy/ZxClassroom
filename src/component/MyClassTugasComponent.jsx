import React, {useContext,useEffect,useState} from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Div, Avatar, Text, 
  Input,
  Badge,
  Dropdown } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import {AuthProvider, AuthContext} from '../provider/ProviderService'
import { useNavigation } from '@react-navigation/native'
import { viewDocument } from '@react-native-documents/viewer';
import RNFS  from 'react-native-fs'
import ReactNativeBlobUtil from 'react-native-blob-util'
import LampiranComponent from './LampiranComponent'
import url from '../api/Endpoint'

export default function MyClassTugasComponent({data}) {
  const { TeacherAsigsments, NilaiTugasSiswa } = useContext(AuthContext);
  const [dataAsign,setDataAsign] = useState(null)
  const [nilai,setNilai] = useState(0)
  const [dataSiswa,setDataSiswa] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingNilai,setLoadingNilai] = useState(false)
  const [downloadProgress,setDownloadProgress] = useState(false)

  const dropdownRef = React.createRef();

  const RequestData = async() => {
    const result = await TeacherAsigsments(data.id_tugas)
    if (result.status) {
      setDataAsign(result.data.data)
      const gradedCount = result.data.data?.filter(a => a.nilai === true).length || 0;
    }else{
      setDataAsign([])
    }  
  }

  const SendNilai = async(id) => {
    setLoadingNilai(true)
    const payload = {
      id_asign:id,
      nilai:nilai
    }
    const result = await NilaiTugasSiswa(payload)
    if (result.status) {
      Alert.alert('Success','Nilai Berhasil Di Upload')
      setTimeout(() => {
        dropdownRef.current?.close();
      },500)
    }else{
       Alert.alert('Failed','Nilai Gagal Di Upload')
    }
    setLoadingNilai(false)
  }
  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await RequestData()
    setRefreshing(false);
    
  }, []);

  const NilaiSiswa = async(option) => {
    setDataSiswa(option)    
    setNilai('')
    option['lampiran'] = option.lampiran.split(",").map(item => {
      return{
         uri: `${url}open/${item.trim()}`,
         type: item.split(".").pop() == "pdf" ? `application/${item.split(".").pop()}` : `image/${item.split(".").pop()}`,
      }
    })    
  }
  
  const SaveFile = async (data) => {
        try {
            setDownloadProgress(true)
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
                    useDownloadManager: false,
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
                console.log(percent)
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

            Alert.alert("Download complete", `File saved to: ${RNFS.DownloadDirectoryPath}`);
            
            setDownloadProgress(false)
        } catch (error) {
            console.error("Download failed:", error);
            Alert.alert("Download failed", error.message || "Failed to download file");
            setDownloadProgress(false)
        }
    };

    const LihatLampiranTugas = async (namefile) => {
        const { fs } = ReactNativeBlobUtil;
        const folderPath = RNFS.DownloadDirectoryPath;
        const mimeType = namefile.split(".").pop();
        try {
            const files = await fs.ls(folderPath);

            const isFileExist = files.includes(namefile);

            if (isFileExist) {
                console.log('File Ada !!');
                const fileUri = `file://${folderPath}/${namefile}`;
                viewDocument({
                    uri: fileUri,
                    type: mimeType === 'pdf' ? `application/pdf` : `image/${mimeType}`
                });
            } else {
                const data = {
                    uri: `${url}open/${namefile}`,
                    type: mimeType === 'pdf' ? `application/pdf` : `image/${mimeType}`
                };
                await SaveFile(data);
            }
        } catch (er) {
            console.log(er);
        }
    };





  useEffect(() => {
    if (dataAsign == null) {
      RequestData()
    }
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <Div row gap={40} justifyContent="space-around" mx={50} my={25}>
          <Div alignItems="center">
            <Text fontSize={18} fontWeight="bold">{dataAsign?.length}</Text>
            <Text>Dikumpulkan</Text>
          </Div>

          <Div height="100%" width={1} bg="gray" />

          <Div alignItems="center">
            <Text fontSize={18} fontWeight="bold">{dataAsign?.filter(e => e.nilai != null).length}</Text>
            <Text>Dinilai</Text>
          </Div>
        </Div>

        <ScrollView 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}>
          <Div mx={20} my={15} gap={10}>
            {dataAsign?.map((data, i) => (
              <TouchableOpacity onPress={() => {
                NilaiSiswa(data)
                dropdownRef.current?.open()
              }} >
              <Div
                key={i}
                row
                justifyContent="flex-start"
                gap={10}
                alignItems="center"
              >
              {data?.nilai ? (
                <>
                <Badge>
                <Avatar bg="green800"
                source={
                  data?.profile ? {uri:`${url}profile/${data.profile}`} :
                  {uri:`https://ui-avatars.com/api/?name=${data.username}`}
                }
                >
                </Avatar>
              </Badge>
                </>
              ) : (
                <Avatar bg="green800"
                source={
                  data?.profile ? {uri:`${url}profile/${data.profile}`} :
                  {uri:`https://ui-avatars.com/api/?name=${data.username}`}
                }
                >
                </Avatar>
              )}
              <Text fontSize={15}>{data.username}</Text>
              </Div>
              </TouchableOpacity>
            ))}
          </Div>
        </ScrollView>
      </Div>

       <Dropdown
        ref={dropdownRef}
        w="100%"
        h="80%"        
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl"
      >
        {dataSiswa ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}>
            <Div flex={1} gap={15}>
              <Input
                placeholder="Masukan Nilai 0/100"
                keyboardType="numeric"
                editable={!(dataSiswa?.nilai)}
                value={(dataSiswa?.nilai ?? nilai)?.toString()}
                maxLength={3}
                onChangeText={(value) => {
                  const numericValue = value.replace(/[^0-9]/g, '');
                  const number = parseInt(numericValue, 10);
                   if (!isNaN(number) && number >= 0 && number <= 100) {
                    setNilai(numericValue);
                  } else if (numericValue === '') {
                    setNilai('');
                  }
                }}
                p={10}
                focusBorderColor="blue700"
                suffix={
                  <>
                  <TouchableOpacity onPress={dataSiswa?.nilai ? null : () => SendNilai(dataSiswa.id_assigsment)}>
                    {loadingNilai ? <ActivityIndicator size="small" color="#0000ff" /> :
                    <Icon name={dataSiswa?.nilai ? "check-circle" : "send"} 
                    color={dataSiswa?.nilai ? "#11d462" : "#4b30c2"} size={20} />}
                  </TouchableOpacity>
                  </>
                }
              />
              {dataSiswa.lampiran?.reduce((rows, item, index) => {
                if (index % 2 === 0) {
                  rows.push([item]);
                } else {
                  rows[rows.length - 1].push(item);
                }
                return rows;
              }, []).map((pair, idx) => (
                <Div key={idx} row justifyContent="space-between" mb="md">
                  {pair.map((lampiran, i) => (
                    <LampiranComponent 
                    btn={
                      <>
                      <TouchableOpacity 
                      onPress={() => LihatLampiranTugas(lampiran.uri.split("/").pop())}>
                      <Icon name="image-search" size={20}/>
                      </TouchableOpacity>
                      </>
                    }
                    key={i} datas={lampiran} />
                  ))}
                  {pair.length === 1 && (
                    // Spacer untuk item kedua jika tidak ada
                    <Div w="48%" />
                  )}
                </Div>
              ))}
            </Div>
          </ScrollView>
        ) : null}
      </Dropdown>

    </SafeAreaView>
  );
}
