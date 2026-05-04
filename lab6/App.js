import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import questionBank from './data/QuestionBank';

const { width } = Dimensions.get('window');

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questionBank[questionIndex];

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === currentQuestion.answer;

    // Lưu kết quả vào mảng state
    setScoreHistory((prev) => [...prev, isCorrect]);

    // Kiểm tra nếu đã hết câu hỏi
    if (questionIndex + 1 >= questionBank.length) {
      setQuizFinished(true);
    } else {
      // Chuyển sang câu hỏi tiếp theo
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const correctCount = scoreHistory.filter((r) => r === true).length;

  const handleRestart = () => {
    setQuestionIndex(0);
    setScoreHistory([]);
    setQuizFinished(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧠 Quizzler</Text>
        <Text style={styles.headerSubtitle}>
          {quizFinished
            ? 'Hoàn thành!'
            : `Câu ${questionIndex + 1} / ${questionBank.length}`}
        </Text>
      </View>

      {quizFinished ? (
        /* End Screen */
        <View style={styles.endScreen}>
          <Text style={styles.endEmoji}>🎉</Text>
          <Text style={styles.endTitle}>Kết thúc!</Text>
          <Text style={styles.endScore}>
            {correctCount} / {questionBank.length}
          </Text>
          <Text style={styles.endLabel}>câu trả lời đúng</Text>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
            activeOpacity={0.7}
          >
            <Text style={styles.restartButtonText}>🔄 Làm lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Question Card */
        <View style={styles.questionCard}>
          <View style={styles.questionNumberBadge}>
            <Text style={styles.questionNumberText}>Q{questionIndex + 1}</Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        </View>
      )}

      {/* Buttons - chỉ hiển thị khi chưa kết thúc */}
      {!quizFinished && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.trueButton]}
            onPress={() => handleAnswer(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>✓</Text>
            <Text style={styles.buttonText}>True</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.falseButton]}
            onPress={() => handleAnswer(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>✗</Text>
            <Text style={styles.buttonText}>False</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Score History */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Kết quả</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scoreScroll}
        >
          {scoreHistory.map((result, index) => (
            <View
              key={index}
              style={[
                styles.scoreIcon,
                result ? styles.scoreCorrect : styles.scoreWrong,
              ]}
            >
              <Text style={styles.scoreIconText}>{result ? '✓' : '✗'}</Text>
            </View>
          ))}
          {scoreHistory.length === 0 && (
            <Text style={styles.noResultText}>Chưa có kết quả nào</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#e94560',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8892b0',
    marginTop: 4,
    fontWeight: '500',
  },
  questionCard: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  endScreen: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  endEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  endTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#e0e0e0',
    marginBottom: 12,
  },
  endScore: {
    fontSize: 48,
    fontWeight: '800',
    color: '#00b894',
    marginBottom: 4,
  },
  endLabel: {
    fontSize: 16,
    color: '#8892b0',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  questionNumberBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  questionNumberText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  questionText: {
    fontSize: 22,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 34,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  trueButton: {
    backgroundColor: '#00b894',
    shadowColor: '#00b894',
  },
  falseButton: {
    backgroundColor: '#e94560',
    shadowColor: '#e94560',
  },
  buttonIcon: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
  scoreContainer: {
    backgroundColor: '#16213e',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  scoreTitle: {
    fontSize: 13,
    color: '#8892b0',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 36,
  },
  scoreIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCorrect: {
    backgroundColor: '#00b894',
  },
  scoreWrong: {
    backgroundColor: '#e94560',
  },
  scoreIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  noResultText: {
    color: '#4a5568',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
