import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { getWeatherDisplay, getWindDescription } from './utils/weatherUtils';

// ====== CẤU HÌNH ======
const API_KEY = 'cf5c1dc3b89d213445dc0f3c1de3a3c4'; // Thay bằng API key của bạn từ openweathermap.org
// =======================

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Xin quyền truy cập vị trí
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Cần cấp quyền truy cập vị trí để sử dụng ứng dụng.');
        setLoading(false);
        return;
      }

      // 2. Lấy tọa độ GPS hiện tại
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;

      // 3. Gọi API OpenWeatherMap
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=vi`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status}`);
      }

      const data = await response.json();

      // 4. Xử lý dữ liệu JSON
      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        conditionId: data.weather[0].id,
        description: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message || 'Không thể lấy dữ liệu thời tiết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Xác định gradient dựa trên thời tiết
  const display = weather
    ? getWeatherDisplay(weather.conditionId)
    : { emoji: '🌍', label: '', gradientColors: ['#0f0c29', '#302b63', '#24243e'] };

  return (
    <LinearGradient colors={display.gradientColors} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {loading ? (
        /* Loading State */
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang lấy dữ liệu thời tiết...</Text>
          <Text style={styles.loadingSubText}>📍 Đang xác định vị trí</Text>
        </View>
      ) : error ? (
        /* Error State */
        <View style={styles.centerContent}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchWeather}>
            <Text style={styles.retryButtonText}>🔄 Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Weather Display */
        <View style={styles.weatherContent}>
          {/* Top: City */}
          <View style={styles.topSection}>
            <Text style={styles.cityName}>{weather.city}</Text>
            <Text style={styles.countryName}>{weather.country}</Text>
          </View>

          {/* Center: Emoji + Temp */}
          <View style={styles.mainSection}>
            <Text style={styles.weatherEmoji}>{display.emoji}</Text>
            <Text style={styles.temperature}>{weather.temp}°</Text>
            <Text style={styles.weatherLabel}>{display.label}</Text>
            <Text style={styles.description}>{weather.description}</Text>
          </View>

          {/* Bottom: Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🌡️</Text>
                <Text style={styles.detailValue}>
                  {weather.tempMin}° / {weather.tempMax}°
                </Text>
                <Text style={styles.detailLabel}>Min / Max</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>💧</Text>
                <Text style={styles.detailValue}>{weather.humidity}%</Text>
                <Text style={styles.detailLabel}>Độ ẩm</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>💨</Text>
                <Text style={styles.detailValue}>{weather.windSpeed} m/s</Text>
                <Text style={styles.detailLabel}>
                  {getWindDescription(weather.windSpeed)}
                </Text>
              </View>
            </View>

            <View style={styles.feelsLikeRow}>
              <Text style={styles.feelsLikeText}>
                Cảm giác như {weather.feelsLike}°C
              </Text>
            </View>

            {/* Refresh Button */}
            <TouchableOpacity style={styles.refreshButton} onPress={fetchWeather}>
              <Text style={styles.refreshButtonText}>🔄 Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  /* Loading & Error */
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 20,
    fontWeight: '600',
  },
  loadingSubText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  /* Weather Content */
  weatherContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  /* Top Section */
  topSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  countryName: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 4,
  },
  /* Main Section */
  mainSection: {
    alignItems: 'center',
  },
  weatherEmoji: {
    fontSize: 100,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  temperature: {
    fontSize: 96,
    fontWeight: '200',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  weatherLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  /* Details Section */
  detailsSection: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  feelsLikeRow: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  feelsLikeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  refreshButton: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
