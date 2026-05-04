// Mapping weather condition codes to emoji and gradient colors
// Reference: https://openweathermap.org/weather-conditions

/**
 * Trả về emoji và màu gradient phù hợp với mã thời tiết
 * @param {number} conditionId - Mã điều kiện thời tiết từ OpenWeatherMap
 */
export const getWeatherDisplay = (conditionId) => {
  if (conditionId >= 200 && conditionId < 300) {
    return {
      emoji: '⛈️',
      label: 'Giông bão',
      gradientColors: ['#373B44', '#4286f4', '#373B44'],
    };
  } else if (conditionId >= 300 && conditionId < 400) {
    return {
      emoji: '🌧️',
      label: 'Mưa phùn',
      gradientColors: ['#485563', '#6b7b8d', '#29323c'],
    };
  } else if (conditionId >= 500 && conditionId < 600) {
    return {
      emoji: '🌧️',
      label: 'Mưa',
      gradientColors: ['#2c3e50', '#3498db', '#2c3e50'],
    };
  } else if (conditionId >= 600 && conditionId < 700) {
    return {
      emoji: '❄️',
      label: 'Tuyết',
      gradientColors: ['#e6dada', '#a8c0d6', '#274046'],
    };
  } else if (conditionId >= 700 && conditionId < 800) {
    return {
      emoji: '🌫️',
      label: 'Sương mù',
      gradientColors: ['#3e5151', '#decba4', '#3e5151'],
    };
  } else if (conditionId === 800) {
    return {
      emoji: '☀️',
      label: 'Trời quang',
      gradientColors: ['#2980b9', '#6dd5fa', '#ffffff'],
    };
  } else if (conditionId === 801) {
    return {
      emoji: '🌤️',
      label: 'Ít mây',
      gradientColors: ['#2193b0', '#6dd5ed', '#f5f5f5'],
    };
  } else if (conditionId === 802) {
    return {
      emoji: '⛅',
      label: 'Mây rải rác',
      gradientColors: ['#636e72', '#b2bec3', '#dfe6e9'],
    };
  } else if (conditionId >= 803) {
    return {
      emoji: '☁️',
      label: 'Nhiều mây',
      gradientColors: ['#4b6584', '#778ca3', '#d1d8e0'],
    };
  }

  return {
    emoji: '🌈',
    label: 'Không xác định',
    gradientColors: ['#667db6', '#0082c8', '#667db6'],
  };
};

/**
 * Trả về mô tả gió
 */
export const getWindDescription = (speed) => {
  if (speed < 1) return 'Lặng gió';
  if (speed < 5) return 'Gió nhẹ';
  if (speed < 11) return 'Gió vừa';
  if (speed < 20) return 'Gió mạnh';
  return 'Gió rất mạnh';
};
