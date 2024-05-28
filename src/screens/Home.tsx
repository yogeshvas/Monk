import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';


const Home = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
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
