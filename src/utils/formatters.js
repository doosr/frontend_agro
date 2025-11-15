import { format as dateFnsFormat } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formatage des dates
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '-';
  return dateFnsFormat(new Date(date), formatStr, { locale: fr });
};

export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

export const formatTime = (date) => {
  return formatDate(date, 'HH:mm');
};

export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return formatDate(date);
};

// Formatage des nombres
export const formatNumber = (value, decimals = 0) => {
  if (value == null) return '-';
  return Number(value).toFixed(decimals);
};

export const formatPercentage = (value, decimals = 1) => {
  if (value == null) return '-';
  return `${(value * 100).toFixed(decimals)}%`;
};

// Formatage des valeurs de capteurs
export const formatSensorValue = (value, type) => {
  if (value == null) return '-';
  
  switch (type) {
    case 'temperature':
      return `${formatNumber(value, 1)}°C`;
    case 'humidity':
      return `${formatNumber(value, 1)}%`;
    case 'soil':
      return formatNumber(value, 0);
    case 'luminosity':
      return formatNumber(value, 0);
    default:
      return formatNumber(value);
  }
};

// Formatage du statut
export const formatStatus = (status) => {
  const statusMap = {
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En attente',
    error: 'Erreur'
  };
  return statusMap[status] || status;
};

// Formatage du rôle
export const formatRole = (role) => {
  const roleMap = {
    admin: 'Administrateur',
    agriculteur: 'Agriculteur'
  };
  return roleMap[role] || role;
};

// Formatage de la taille de fichier
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};