import React, { useRef, useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { Div, Header, Button, Text, Skeleton } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { viewDocument } from '@react-native-documents/viewer';
import RNFS  from 'react-native-fs'
import ReactNativeBlobUtil from 'react-native-blob-util'
import url from '../api/Endpoint'

import LampiranComponent from "./LampiranComponent";
import {AuthProvider, AuthContext} from '../provider/ProviderService'

export default function MyClassPetunjukComponent({data}) {
  const { TugasDetail } = useContext(AuthContext);
  const [dataTugas,setDataTugas] = useState(null)
  const [loading,setLoading] = useState(false)
  const [downloadProgress,setDownloadProgress] = useState(false)


  const RequestData = async() => {
        setLoading(true)
        console.log(data)
        const result = await TugasDetail(data.id_tugas)
        console.log(result)
        if (result.status) {
            setDataTugas(result.data.data)
            setLoading(false)
        }
        setLoading(false)
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
    }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
    <Div mx={20} my={35} gap={12}>
      <Text fontSize={19} fontWeight="bold">
        {dataTugas?.judul ?? "Memuat judul..."}
      </Text>
      <Div>
        <Text fontSize="lg" lineHeight={24} textAlign="justify" color="gray700">
           {dataTugas?.deskripsi ?? "Memuat Deskripsi..."}
        </Text>
      </Div>

      <Div gap={5}>
      {dataTugas?.lampiran
      ? dataTugas.lampiran.split(",").map((item, index) => (
          <Div
            key={index}
            w="100%"
            gap={5}
            row
            justifyContent="space-between"
            alignItems="center"
            mt="xl"
          >
            <Text color="#349eeb">{item}</Text>
            <Div gap={15} row justifyContent="space-between">
              <TouchableOpacity>
                <Icon onPress={() => LihatLampiranTugas(item)} name="remove-red-eye" size={20} />
              </TouchableOpacity>
            </Div>
          </Div>
        ))
      : null}
      </Div>
    </Div>
    </ScrollView>
  );
}
