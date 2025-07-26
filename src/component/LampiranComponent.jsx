import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Div } from "react-native-magnus";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { viewDocument } from '@react-native-documents/viewer';

export default function LampiranComponent({ datas ,btn}) {
  const isPdf = datas.type === "application/pdf";

  return (
    <Div w="48%" mb="md">
      {isPdf ? (
        <>
          <TouchableOpacity
          disabled={["https", "http"].includes(datas.uri.split(":")[0])}
          onPress={() => viewDocument({ uri: datas.uri, mimeType: datas.type }).catch((er) => console.log(er))}
          >
          <Div h={150} justifyContent="center" alignItems="center" bg="gray100" rounded="md" shadow="md">
            <Icon name="picture-as-pdf" size={30} />
          </Div>
          </TouchableOpacity>
          <Div row mt="sm" justifyContent="space-evenly" alignItems="center" color="gray700">
            {btn}
          </Div>
        </>
      ) : (
        <>
          <TouchableOpacity
          disabled={["https", "http"].includes(datas.uri.split(":")[0])}
          onPress={() => viewDocument({ uri: datas.uri, mimeType: datas.type }).catch((er) => console.log(er))}
          >
          <Div h={150} rounded="md" overflow="hidden" shadow="md">
            <ImageBackground
              source={{ uri:datas.uri }}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          </Div>
          </TouchableOpacity>
          <Div row mt="sm" justifyContent="space-evenly" alignItems="center" color="gray700">
            {btn}
          </Div>
        </>
      )}
    </Div>
  );
}
