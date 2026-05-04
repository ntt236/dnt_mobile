import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

const HeightSlider = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHIỀU CAO</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>cm</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={220}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#e94560"
        maximumTrackTintColor="#3a4a6b"
        thumbTintColor="#e94560"
      />
      <View style={styles.rangeRow}>
        <Text style={styles.rangeText}>100 cm</Text>
        <Text style={styles.rangeText}>220 cm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2541',
    borderRadius: 16,
    padding: 20,
    marginTop: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6c7a99',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  value: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
  },
  unit: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6c7a99',
    marginBottom: 8,
    marginLeft: 6,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  rangeText: {
    fontSize: 12,
    color: '#4a5a7a',
  },
});

export default HeightSlider;
