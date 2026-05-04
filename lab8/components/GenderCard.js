import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GenderCard = ({ icon, label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1c2541',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: '#0b132b',
    borderColor: '#e94560',
  },
  icon: {
    fontSize: 60,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c7a99',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelSelected: {
    color: '#ffffff',
  },
});

export default GenderCard;
