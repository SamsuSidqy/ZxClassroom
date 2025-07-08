import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import DrawwerComponent from '../../component/DrawwerComponent';
import FabHome from '../../component/FabHome';
import ContentHomeComponent from '../../component/ContentHomeComponent';

import { useNavigation } from '@react-navigation/native';



const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

const classData = [
  {
    id: '1',
    title: 'R6Q - PWL (24/25)',
    time: 'Rabu, 10.00 - 12.30',
    lecturer: 'Fitriana Destiawati',
    image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
  },
  {
    id: '2',
    title: 'IMK R6Q Genap 24 25',
    time: '',
    lecturer: 'Harry Dhika',
    note: 'Tugas Pertemuan 13 IMK',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  },
  {
    id: '3',
    title: 'ISBD - RQ',
    time: "Jum'at, 13.00 - 15.30",
    lecturer: 'Siti Suaedah',
    image: 'https://images.unsplash.com/photo-1516640997890-5e4c83df8419',
  },
  {
    id: '4',
    title: 'R5Q PEMOGRAMAN WEB',
    time: 'Rabu, 14:10 - 15:50 WIB',
    lecturer: 'Dona Katarina',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a',
  },
  {
    id: '5',
    title: "PBO'24 - R5Q",
    time: 'Jumat, 15.30 - 18.00 / 5.4-2',
    lecturer: 'Forkas Tiroy Santos Butarbutar',
    image: 'https://images.unsplash.com/photo-1453365607868-7deed8cc7d26',
  },
  {
    id: '6',
    title: 'R6Q - PWL (24/25)',
    time: 'Rabu, 10.00 - 12.30',
    lecturer: 'Fitriana Destiawati',
    image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
  },
];

export default function HomeScreens() {
  const nav = useNavigation();
  return (
    <>
    <DrawwerComponent/>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />      
      <FlatList
        data={classData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ContentHomeComponent item={item}/>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </SafeAreaView>
      <FabHome />
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',   
    paddingHorizontal: 16,
  },
  card: {
    height: 140,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  time: {
    fontSize: 14,
    color: '#eee',
    marginTop: 6,
  },
  lecturer: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  note: {
    marginTop: 6,
    fontSize: 13,
    color: '#A5FFD6',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 32,
  },
});
