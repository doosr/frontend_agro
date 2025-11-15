// Constantes de l'application

export const SENSOR_TYPES = {
  ESP32_CAM: 'ESP32-CAM',
  ESP32_SENSOR: 'ESP32-SENSOR'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  AGRICULTEUR: 'agriculteur'
};

export const ALERT_TYPES = {
  MALADIE: 'maladie',
  HUMIDITE: 'humidite',
  TEMPERATURE: 'temperature',
  SYSTEME: 'systeme'
};

export const ALERT_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical'
};

export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#3b82f6',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4'
};

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  TIME_ONLY: 'HH:mm'
};

export const THRESHOLD_RANGES = {
  HUMIDITY: { min: 0, max: 4095, default: 500 },
  TEMPERATURE: { min: -10, max: 60, default: 25 },
  LUMINOSITY: { min: 0, max: 4095, default: 2000 }
};

export const IMAGE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png']
};