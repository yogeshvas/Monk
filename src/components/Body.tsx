import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

const Body = () => {
  const [apps, setApps] = useState<AppDetail[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetchInstalledApps = async () => {
      try {
        const allApps = await InstalledApps.getSortedApps();
        setApps(allApps);
      } catch (error) {
        console.error('Error fetching installed apps:', error);
      }
    };

    fetchInstalledApps();
  }, []);

  const filteredApps = apps.filter(app =>
    app.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleAppPress = (app: AppDetail) => {
    setSearchText('');
    RNLauncherKitHelper.launchApplication(app.packageName);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredApps}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleAppPress(item)}>
            <View style={styles.appContainer}>
              <Text style={styles.appLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.label}
      />
      <View style={styles.searchContainer}>
        <Text>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for an app..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholderTextColor={'black'}
        />
      </View>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#EEEEEE', // Set common background color here
    margin: 30,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    width: '90%',
    padding: 10,
    color: 'black',
  },
  appContainer: {
    backgroundColor: 'transparent', // Set background color to transparent
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  },
  appLabel: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
});
