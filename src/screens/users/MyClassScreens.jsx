import React, { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Div, Header, Button, Text } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const TABS = ['Petunjuk', 'Tugas Siswa'];


import MyClassPetunjukComponent from '../../component/MyClassPetunjukComponent';
import MyClassTugasComponent from '../../component/MyClassTugasComponent';

export default function MyClassScreens() {

    const scrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const nav = useNavigation();

	const handleTabPress = (index) => {
	    setActiveTab(index);
	    scrollRef.current.scrollTo({ x: index * width, animated: true });
	};

    // Width of the underline interpolated from scrollX
    const indicatorTranslateX = scrollX.interpolate({
	    inputRange: [0, width],
	    outputRange: [0, width / 2],
	    extrapolate: 'clamp',
    });

	const indicatorScaleX = scrollX.interpolate({
	   inputRange: [0, width / 2, width],
	   outputRange: [0.5, 1, 0.5],
	   extrapolate: 'clamp',
	});

  return (
    <>
      <Header
        p="lg"
        borderBottomWidth={1}
        borderBottomColor="gray200"
        alignment="center"
        prefix={
          <Button bg="transparent" onPress={() => nav.goBack()}>
            <Icon name="close" size={20} />
          </Button>
        }
      ></Header>

      <Div flex={1} bg="white">
        {/* Tab Buttons */}
        <Div row h={50} borderBottomWidth={1} borderColor="gray200">
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              <Text
                fontWeight="bold"
                color={activeTab === index ? 'blue700' : 'gray600'}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </Div>

        {/* Animated Underline */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                { translateX: indicatorTranslateX },
                { scaleX: indicatorScaleX },
              ],
            },
          ]}
        />

        {/* ScrollView Pages */}
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          contentContainerStyle={{ width: width * TABS.length }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const currentIndex = Math.round(offsetX / width);
                setActiveTab(currentIndex);
              },
            }
          )}
        >
          <View style={styles.page}>
            <MyClassPetunjukComponent />
          </View>
          <View style={styles.page}>
            <MyClassTugasComponent />
          </View>
        </Animated.ScrollView>
      </Div>
    </>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 48,
    left: 0,
    width: width / 2,
    height: 3,
    backgroundColor: '#2563EB', // Tailwind blue700
    borderRadius: 2,
  },
  page: {
    width: width,
  },
});
