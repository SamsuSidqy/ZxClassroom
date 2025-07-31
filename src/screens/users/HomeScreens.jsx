import React, {useContext, useEffect, useCallback, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Button, Div, Text } from 'react-native-magnus'
import Icon from "react-native-vector-icons/MaterialIcons";
import DrawwerComponent from '../../component/DrawwerComponent';
import FabHome from '../../component/FabHome';
import ContentHomeComponent from '../../component/ContentHomeComponent';

import { useNavigation } from '@react-navigation/native';
import {AuthProvider, AuthContext} from '../../provider/ProviderService'

import { useFocusEffect } from '@react-navigation/native';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

const { width, heights } = Dimensions.get('window');

export default function HomeScreens() {
  const nav = useNavigation();
  const { ListKelasData } = useContext(AuthContext);
  const [dataKelas,setDataKelas] = useState(null)
  const [refresh,setRefresh] = useState(false)

  const AmbilDataKelas = async () => {
    const res = await ListKelasData()
    if (res.status) {
      setDataKelas(res.data.data)
    }
  }

  const RefreshData = async () => {
    setRefresh(true)
    const res = await ListKelasData()
    console.log(res)
    if (res.status) {
      setDataKelas(res.data.data)
    }
    setRefresh(false)
  }




  useFocusEffect(
    useCallback(() => {
      if (dataKelas === null) {
        AmbilDataKelas();
      }      
      
      return () => {
        // Optional: cleanup
      };
    }, [dataKelas])
  );

  return (
    <>
    <DrawwerComponent />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />      
      <FlatList
        data={dataKelas}
        onRefresh={RefreshData}
        refreshing={refresh}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ContentHomeComponent item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <>
            <Div mt="20%" gap={10} justifyContent="center" alignItems="center">
            <Icon name="cast-for-education" size={130} color="#4B7BE5"/>
            <Text fontSize={15} fontWeight="bold">
            Anda Belum Mempunyai Kelas !!
            </Text>
            </Div>
          </>
        }
      />
    </SafeAreaView>
      <FabHome />
    </>
  );
}



const styles = StyleSheet.create({
  container: {
     
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
