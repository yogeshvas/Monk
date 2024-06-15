import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';

const Header = () => {
  const [battery, setBattery] = useState({level: 0, isCharging: false});
  const [dateTime, setDateTime] = useState(new Date());
  const [timeOfDayImage, setTimeOfDayImage] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      const batteryStatus = await RNLauncherKitHelper.getBatteryStatus();
      setBattery({
        level: Math.round(batteryStatus.level), // Ensure the battery level is an integer
        isCharging: batteryStatus.isCharging,
      });
    };
    fetchBatteryStatus();

    const intervalId = setInterval(() => {
      const now = new Date();
      setDateTime(now);
      setTimeOfDayImage(getTimeOfDayImage(now.getHours()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getTimeOfDayImage = hour => {
    if (hour >= 5 && hour < 12) {
      return require('../assets/images/sun.png');
    } else if (hour >= 12 && hour < 18) {
      return require('../assets/images/breeze.png');
    } else {
      return require('../assets/images/moon.png');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.dateTimeContainer}>
          <View>
            {timeOfDayImage && (
              <Image style={styles.timeOfDayImage} source={timeOfDayImage} />
            )}
          </View>
          <View>
            <Text style={styles.timeText}>
              {dateTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
            <Text style={styles.dateText}>{dateTime.toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={styles.batteryContainer}>
          <Text style={styles.batteryText}>{battery.level}%</Text>
          <Image
            style={styles.batteryImage}
            source={
              battery.level > 20
                ? require('../assets/images/battery.png')
                : require('../assets/images/low-battery.png')
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  timeOfDayImage: {
    width: 35,
    height: 35,
  },
  timeText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 13,
  },
  dateText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 10,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  batteryText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  batteryImage: {
    width: 30,
    height: 30,
    transform: [{rotate: '90deg'}],
  },
});
