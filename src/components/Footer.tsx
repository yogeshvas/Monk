import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';

const Footer = ({navigation}: any) => {
 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('settings')}>
        <Image
          style={styles.icon}
          source={require('../assets/images/settings.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('todo')}>
        <View style={styles.todoContainer}>
          <Text style={styles.todoText}>To Do</Text>
          <Image
            style={styles.bookIcon}
            source={require('../assets/images/book.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    height: 30,
    width: 30,
  },
  bookIcon: {height: 20, width: 25},
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    marginRight: 10,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});
