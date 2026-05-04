import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const getBMIResult = (bmi) => {
  const bmiValue = parseFloat(bmi);

  if (bmiValue < 16) {
    return {
      category: 'Gầy độ III',
      color: '#3498db',
      emoji: '⚠️',
      advice:
        'Bạn đang thiếu cân nghiêm trọng. Hãy tham khảo ý kiến bác sĩ và xây dựng chế độ ăn uống giàu dinh dưỡng để tăng cân an toàn.',
    };
  } else if (bmiValue < 17) {
    return {
      category: 'Gầy độ II',
      color: '#2980b9',
      emoji: '⚠️',
      advice:
        'Bạn đang thiếu cân vừa. Hãy bổ sung thêm protein và carbohydrate trong chế độ ăn, kết hợp tập luyện nhẹ nhàng.',
    };
  } else if (bmiValue < 18.5) {
    return {
      category: 'Gầy độ I',
      color: '#5dade2',
      emoji: '💪',
      advice:
        'Bạn hơi nhẹ cân. Hãy ăn uống đầy đủ chất dinh dưỡng và tập thể dục đều đặn để đạt cân nặng lý tưởng.',
    };
  } else if (bmiValue < 25) {
    return {
      category: 'Bình thường',
      color: '#00b894',
      emoji: '✅',
      advice:
        'Chúc mừng! Chỉ số BMI của bạn hoàn toàn bình thường. Hãy duy trì lối sống lành mạnh và tập thể dục thường xuyên.',
    };
  } else if (bmiValue < 30) {
    return {
      category: 'Thừa cân',
      color: '#f39c12',
      emoji: '⚡',
      advice:
        'Bạn đang thừa cân. Hãy giảm lượng calo nạp vào, ăn nhiều rau xanh, và tập thể dục ít nhất 30 phút mỗi ngày.',
    };
  } else if (bmiValue < 35) {
    return {
      category: 'Béo phì độ I',
      color: '#e67e22',
      emoji: '🔶',
      advice:
        'Bạn đang béo phì mức nhẹ. Hãy xây dựng kế hoạch giảm cân với chế độ ăn kiêng hợp lý và tập luyện thể dục đều đặn.',
    };
  } else if (bmiValue < 40) {
    return {
      category: 'Béo phì độ II',
      color: '#e74c3c',
      emoji: '🔴',
      advice:
        'Bạn đang béo phì mức trung bình. Điều này ảnh hưởng nghiêm trọng đến sức khỏe. Hãy tham khảo ý kiến bác sĩ ngay.',
    };
  } else {
    return {
      category: 'Béo phì độ III',
      color: '#c0392b',
      emoji: '🚨',
      advice:
        'Bạn đang béo phì nghiêm trọng. Cần can thiệp y tế ngay lập tức. Hãy liên hệ bác sĩ chuyên khoa để được tư vấn.',
    };
  }
};

const ResultScreen = ({ route, navigation }) => {
  const { bmi, gender } = route.params;
  const result = getBMIResult(bmi);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b132b" />

      <Text style={styles.header}>KẾT QUẢ BMI</Text>

      <View style={styles.resultCard}>
        {/* Emoji & Category */}
        <Text style={styles.emoji}>{result.emoji}</Text>
        <Text style={[styles.category, { color: result.color }]}>
          {result.category}
        </Text>

        {/* BMI Value */}
        <Text style={styles.bmiValue}>{bmi}</Text>
        <Text style={styles.bmiLabel}>Chỉ số BMI của bạn</Text>

        {/* BMI Scale Bar */}
        <View style={styles.scaleContainer}>
          <View style={styles.scaleBar}>
            <View style={[styles.scaleSegment, { flex: 18.5, backgroundColor: '#5dade2' }]} />
            <View style={[styles.scaleSegment, { flex: 6.5, backgroundColor: '#00b894' }]} />
            <View style={[styles.scaleSegment, { flex: 5, backgroundColor: '#f39c12' }]} />
            <View style={[styles.scaleSegment, { flex: 5, backgroundColor: '#e67e22' }]} />
            <View style={[styles.scaleSegment, { flex: 5, backgroundColor: '#e74c3c' }]} />
          </View>
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabelText}>Gầy</Text>
            <Text style={styles.scaleLabelText}>BT</Text>
            <Text style={styles.scaleLabelText}>Thừa</Text>
            <Text style={styles.scaleLabelText}>Béo phì</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Gender Info */}
        <Text style={styles.genderInfo}>
          {gender === 'male' ? '♂️ Nam giới' : '♀️ Nữ giới'}
        </Text>

        {/* Advice */}
        <View style={styles.adviceBox}>
          <Text style={styles.adviceTitle}>💡 Lời khuyên</Text>
          <Text style={styles.adviceText}>{result.advice}</Text>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>← TÍNH LẠI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b132b',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  resultCard: {
    flex: 1,
    backgroundColor: '#1c2541',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  category: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  bmiValue: {
    fontSize: 72,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 80,
  },
  bmiLabel: {
    fontSize: 14,
    color: '#6c7a99',
    marginTop: 4,
    marginBottom: 20,
    letterSpacing: 1,
  },
  scaleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  scaleBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scaleSegment: {
    height: '100%',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  scaleLabelText: {
    fontSize: 11,
    color: '#4a5a7a',
    fontWeight: '500',
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: '#2a3a5c',
    marginVertical: 16,
  },
  genderInfo: {
    fontSize: 16,
    color: '#8892b0',
    marginBottom: 16,
  },
  adviceBox: {
    backgroundColor: '#0b132b',
    borderRadius: 14,
    padding: 18,
    width: '100%',
  },
  adviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e94560',
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    color: '#a0aec0',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#e94560',
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
});

export default ResultScreen;
