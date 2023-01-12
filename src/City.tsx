import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from './constants';
import NativeButton from './NativeButton';
import {showNotification} from './NativeNotification';
import Summary from './Summary';
import {StackScreenProps} from './types';
import {useWeatherForCity} from './WeatherContext';

export default function City({route}: StackScreenProps<'City'>) {
  const {colors} = useTheme();
  const [error, weather] = useWeatherForCity(route.params.id);

  const computedStyles = useMemo(
    () => ({
      summaryContainer: StyleSheet.flatten([
        styles.summaryContainer,
        {borderColor: colors.border},
      ]),
      textContainer: StyleSheet.flatten([
        styles.textContainer,
        {borderColor: colors.border},
      ]),
      text: StyleSheet.flatten([styles.text, {color: colors.text}]),
    }),
    [colors],
  );

  if (error || !weather) {
    return <Text style={{color: colors.text}}>An error occurred</Text>;
  }

  return (
    <View testID="city">
      <Summary item={weather} style={computedStyles.summaryContainer} />
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text} testID="humidity">
          Humidity: {weather.humidity}%
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>
          Pressure: {weather.pressure} hPa
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>
          Wind Speed: {weather.windSpeed} m/s
        </Text>
      </View>
      <View style={computedStyles.textContainer}>
        <Text style={computedStyles.text}>Cloud Cover: {weather.clouds}%</Text>
      </View>
      <NativeButton
        title="This title is a prop"
        onTouchUpInside={() => {
          Alert.alert(
            'The native button was tapped. This alert is created by the JavaScript thread.',
          );
        }}
        style={styles.nativeButton}
      />
      <TouchableOpacity
        onPress={() => {
          showNotification(
            'Random number',
            `Your random number is ${Math.random()}`,
          );
        }}
        style={styles.notificationButton}
        accessibilityLabel="button">
        <Text style={styles.notificationButtonText}>
          Display a random number
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    borderBottomWidth: 1,
  },
  textContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 20,
  },
  nativeButton: {
    width: 250,
    height: 50,
    alignSelf: 'center',
    backgroundColor: colors.blue,
    marginVertical: 10,
    borderRadius: 6,
  },
  notificationButton: {
    width: 250,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    marginVertical: 10,
    borderRadius: 6,
  },
  notificationButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.white,
  },
});
