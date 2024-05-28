import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, PanResponder} from 'react-native';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Home = ({navigation}: any) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Check if the swipe is left
        return gestureState.dx < -20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          // If the swipe distance is enough, navigate to the Todo screen
          navigation.navigate('todo');
        }
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.swipeZone}
        {...panResponder.panHandlers} // Attach the PanResponder to this view
      />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.bodyContainer}>
        <Body />
      </View>
      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101115',
  },
  swipeZone: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 30, // Adjust the width as needed to make it sensitive at the corner
    zIndex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 8,
  },
  footerContainer: {
    flex: 1,
  },
});
