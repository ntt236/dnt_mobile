import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import GenderCard from '../components/GenderCard';
import HeightSlider from '../components/HeightSlider';
import CounterCard from '../components/CounterCard';

const InputScreen = ({ navigation }) => {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(25);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    navigation.navigate('Result', {
      bmi: bmi.toFixed(1),
      gender,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>BMI CALCULATOR</Text>

        {/* Gender Selection */}
        <View style={styles.genderRow}>
          <GenderCard
            icon="♂️"
            label="Nam"
            isSelected={gender === 'male'}
            onPress={() => setGender('male')}
          />
          <GenderCard
            icon="♀️"
            label="Nữ"
            isSelected={gender === 'female'}
            onPress={() => setGender('female')}
          />
        </View>

        {/* Height Slider */}
        <HeightSlider value={height} onValueChange={setHeight} />

        {/* Weight & Age */}
        <View style={styles.counterRow}>
          <CounterCard
            title="Cân nặng (kg)"
            value={weight}
            onIncrement={() => setWeight((w) => Math.min(w + 1, 300))}
            onDecrement={() => setWeight((w) => Math.max(w - 1, 20))}
          />
          <CounterCard
            title="Tuổi"
            value={age}
            onIncrement={() => setAge((a) => Math.min(a + 1, 120))}
            onDecrement={() => setAge((a) => Math.max(a - 1, 1))}
          />
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateBMI}
          activeOpacity={0.8}
        >
          <Text style={styles.calculateButtonText}>TÍNH CHỈ SỐ BMI</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b132b',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 14,
  },
  counterRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 14,
  },
  calculateButton: {
    backgroundColor: '#e94560',
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  calculateButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
});

export default InputScreen;
