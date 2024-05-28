import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const carouselData = [
  {
    id: '1',
    description:
      'Monk provides a distraction-free environment by hiding app icons and unnecessary notifications. Focus on what matters most.',
  },
  {
    id: '2',
    description:
      'Easily manage your tasks with our integrated to-do list. Stay organized and prioritize your daily activities for better productivity.',
  },
  {
    id: '3',
    description:
      'Activate Focus Mode to eliminate distractions and boost your concentration. Launder helps you stay in the zone and get more done.',
  },
];

const CarouselItem = ({item}) => {
  return (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselDescription}>{item.description}</Text>
    </View>
  );
};

const OnBording = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const campaignStatus = await AsyncStorage.getItem('campign');
      if (campaignStatus === 'done') {
        navigation.replace('home');
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems.viewableItems.length > 0) {
      setCurrentIndex(viewableItems.viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const OnBoardEffect = async () => {
    await AsyncStorage.setItem('campign', 'done');
    navigation.replace('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.banner}
          source={require('../assets/images/banner.png')}
        />
        <View style={styles.introContainer}>
          <Text style={styles.introText}>Introducing</Text>
          <Text style={styles.mainTitle}>Monk</Text>
        </View>
        <View style={styles.carouselContainer}>
          <FlatList
            data={carouselData}
            renderItem={({item}) => <CarouselItem item={item} />}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.dotsContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex ? '#fff' : '#808080',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.getStartedContainer}>
        <TouchableOpacity
          onPress={OnBoardEffect}
          style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
    justifyContent: 'space-between',
  },
  banner: {
    height: 400,
    width: '100%',
  },
  introContainer: {
    alignItems: 'center',
  },
  introText: {
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    fontSize: 15,
    marginTop: 30,
  },
  mainTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 40,
  },
  carouselContainer: {
    marginTop: 0,
  },
  carouselItem: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  carouselDescription: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 15,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  dot: {
    height: 2,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  getStartedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    paddingBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    padding: 10,
    width: '50%',
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
});
