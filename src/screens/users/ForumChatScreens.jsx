import React, { useState, useContext, useCallback, useEffect } from "react";
import { ScrollView, TouchableOpacity, RefreshControl, BackHandler, ActivityIndicator, Alert, Image, KeyboardAvoidingView } from "react-native";
import { Div, Button, Text, Badge, Header, Avatar, Input } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "../../provider/ProviderService";
import { pick, types } from "@react-native-documents/picker";
import url from "../../api/Endpoint";

export default function ForumScreens() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
            <Div flex={1} bg="white" position="relative">
                <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
                    {/*Pengrim*/}
                    <Div px={15} py={20} row>
                        <Avatar 
                        source={{ uri: "https://ui-avatars.com/api/?name=Saepul" }} 
                        size={30} bg="gray200" mr={10} />

                        <Div bg="#f1f1f1" p={12} rounded="lg" w="75%">
                            {/* Username */}
                            <Text fontWeight="bold" fontSize="md" mb={5}>
                                Saepul
                            </Text>

                            {/* Pesan */}
                            <Text fontSize="sm" color="gray800" lineHeight={18}>
                                Hi, apa kabar? Saya hanya ingin menyapa dan memastikan semuanya baik-baik saja. Semoga harimu menyenangkan dan selalu dalam keadaan sehat.
                            </Text>

                            <Image
                                source={{ uri: "https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg" }}
                                style={{
                                    width: "100%",
                                    height: 180,
                                    borderRadius: 10,
                                }}
                                resizeMode="cover"
                            />
                        </Div>
                    </Div>

                    {/*Pengirim*/}
                    <Div px={15} py={20} row justifyContent="flex-end">
                        {/* Kontainer isi pesan */}
                        <Div bg="#d1f0e1" p={12} rounded="lg" w="75%" alignItems="flex-end">
                            {/* Username */}
                            <Text fontWeight="bold" fontSize="md" mb={5} color="green800">
                                Saya
                            </Text>

                            {/* Pesan sebagai paragraf */}
                            <Text fontSize="sm" color="gray800" lineHeight={18} mb={10} textAlign="right">
                                Ini adalah pesan dari saya. Semoga kamu membacanya dengan baik dan jelas.
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
                        <Avatar source={{ uri: "https://ui-avatars.com/api/?name=Saya" }} size={30} bg="gray200" ml={10} />
                    </Div>
                </ScrollView>

                <Div mx={50} my={20} gap={10} row justifyContent="center" alignItems="center">
                    <Badge>
                        <Icon name="attach-file" size={30} />
                    </Badge>
                    <Input placeholder="Tulis sesuatu..." multiline={true} bg="gray100" rounded="md" w="100%" />
                    <Icon name="send" size={30} />
                </Div>

            </Div>

        </KeyboardAvoidingView>
    );
}
