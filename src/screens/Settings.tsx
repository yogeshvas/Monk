import {Image, StyleSheet, Text, View, Linking} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RNLauncherKitHelper } from 'react-native-launcher-kit';

const Settings = ({navigation}) => {
  const DefaultLauncherScreen = () => {
    RNLauncherKitHelper.openSetDefaultLauncher();
  };

  const openInstagramPage = () => {
    // Replace 'your_instagram_username' with your actual Instagram username
    const instagramUsername = 'your_instagram_username';
    Linking.openURL(`https://www.instagram.com/${instagramUsername}`);
  };

  const writeMailToUs = () => {
    Linking.openURL('mailto:writetokhair@gmail.com');
  };
  return (
    <View style={{backgroundColor: '#101115', flex: 1}}>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 30,
            color: 'white',
            marginTop: 10,
            marginLeft: 6,
          }}>
          Settings
        </Text>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={DefaultLauncherScreen}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',

              color: 'white',
              marginTop: 10,
              marginLeft: 6,
            }}>
            ->  Set as Default Launcher  
          </Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text
            style={{
              fontFamily: 'Poppins-Medium',

              color: 'white',
              marginTop: 10,
              marginLeft: 6,
            }}>
            ->  Follow Us on Instagram
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={writeMailToUs} >
          <Text
            style={{
              fontFamily: 'Poppins-Medium',

              color: 'white',
              marginTop: 10,
              marginLeft: 6,
            }}>
            ->  Write a mail to us.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',

              color: 'white',
              marginTop: 10,
              marginLeft: 6,
            }}>
            ->  Rate Us 5 Star on PlayStore.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={DefaultLauncherScreen}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',

              color: 'white',
              marginTop: 10,
              marginLeft: 6,
            }}>
            ->  Unistall the App.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
