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
import {Div} from 'react-native-magnus'

import { useNavigation } from '@react-navigation/native';


export default function ContentHomeComponent({item}){
  const nav = useNavigation();
  return(
    <>
     <TouchableOpacity onPress={() => nav.navigate('Class')} >
          <ImageBackground
            source={{ uri: item.image }}
            imageStyle={styles.cardImage}
            style={styles.card}
          >
            <View style={styles.overlay} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              {item.time !== '' && <Text style={styles.time}>{item.time}</Text>}
              <Text style={styles.lecturer}>{item.lecturer}</Text>
              {item.note && <Text style={styles.note}>{item.note}</Text>}
            </View>
          </ImageBackground>
          </TouchableOpacity>
    </>
  )
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
