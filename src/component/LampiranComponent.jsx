import React, { useRef } from "react";
import { ScrollView, View, Dimensions,ImageBackground } from "react-native";
import { Div, Text, Button, Dropdown,  } from "react-native-magnus";

export default function LampiranComponent(){
	return(
		<Div
          row
          flexWrap="wrap"
          w="90%"
          mx="xl"
          rounded="xl"
          bg="white"
          overflow="hidden"
          alignSelf="center"
          
        >
          {/* Kolom kiri - PDF */}
          <Div w="48%" mb="md" mr="4%">
            <Div h={150} justifyContent="center" alignItems="center" bg="gray100" rounded="md" shadow="md">
              <Text fontSize="2xl" fontWeight="bold" color="gray800">
                PDF
              </Text>
            </Div>
            <Text mt="sm" fontSize="md" textAlign="center" color="gray700">
              Ini adalah file PDF
            </Text>
          </Div>

          {/* Kolom kanan - Gambar */}
          <Div w="48%" mb="md">
            <Div h={150} rounded="md" overflow="hidden" shadow="md">
              <ImageBackground
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Ruc3aDfDuCbY_FFQ-23U1on7qndeh-dNw&s' }}
                style={{ flex: 1 }}
                resizeMode="cover"
              />
            </Div>
            <Text mt="sm" fontSize="md" textAlign="center" color="gray700">
              Gambar Contoh
            </Text>
          </Div>

          {/* Kolom ketiga */}
          <Div w="48%" mb="md" mr="4%">
            <Div h={150} justifyContent="center" alignItems="center" bg="gray200" rounded="md" shadow="md">
              <Text fontSize="2xl" fontWeight="bold" color="gray800">
                Kolom 3
              </Text>
            </Div>
            <Text mt="sm" fontSize="md" textAlign="center" color="gray700">
              Informasi tambahan
            </Text>
          </Div>
        </Div>
	)
}