import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';
/* import Geolocation from '@react-native-community/geolocation'; */
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [info, setInfo] = useState([]);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  /*   Geolocation.getCurrentPosition(info => console.log(info)); */

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        /* {
          title: 'Example App',
          message: 'Example App access to your location ',
        }, */
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
        setHasLocationPermission(true);
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setInfo(position.coords);
          /* console.log('this is location',info); */
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  return (
    <View style={styles.container}>
    <Text>Get your Location Geographic Coordinates</Text>
    {info.length!==0?(<View>
      <Text>Latitude : {info.latitude}</Text>
      <Text>Longitude : {info.longitude}</Text>
    </View>):null}
    
    
      <View style={styles.button}>
      <Button title="Get Location" onPress={getLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop:20
  }
});

export default App;
