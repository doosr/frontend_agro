// Validation des emails
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation du téléphone
export const isValidPhone = (phone) => {
  // Format tunisien: +216 XX XXX XXX ou XX XXX XXX
  const phoneRegex = /^(\+216)?[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validation du mot de passe
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation de l'adresse MAC
export const isValidMacAddress = (mac) => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

// Validation de l'image
export const validateImage = (file) => {
  const errors = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (!file) {
    errors.push('Aucun fichier sélectionné');
    return { isValid: false, errors };
  }
  
  if (file.size > maxSize) {
    errors.push('La taille du fichier ne doit pas dépasser 10MB');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Seuls les formats JPEG, JPG et PNG sont acceptés');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation des champs requis
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: `${fieldName} est requis`
    };
  }
  return { isValid: true };
};

// Validation des plages de valeurs
export const validateRange = (value, min, max, fieldName) => {
  const num = Number(value);
  
  if (isNaN(num)) {
    return {
      isValid: false,
      error: `${fieldName} doit être un nombre`
    };
  }
  
  if (num < min || num > max) {
    return {
      isValid: false,
      error: `${fieldName} doit être entre ${min} et ${max}`
    };
  }
  
  return { isValid: true };
};

// Validation du formulaire complet
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && !validateRequired(value, rule.label).isValid) {
      errors[field] = validateRequired(value, rule.label).error;
    }
    
    if (rule.email && value && !isValidEmail(value)) {
      errors[field] = 'Email invalide';
    }
    
    if (rule.phone && value && !isValidPhone(value)) {
        errors[field] = 'Numéro de téléphone invalide';
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label} doit contenir au moins ${rule.minLength} caractères`;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${rule.label} ne doit pas dépasser ${rule.maxLength} caractères`;
    }
    
    if (rule.min !== undefined && rule.max !== undefined && value) {
      const rangeValidation = validateRange(value, rule.min, rule.max, rule.label);
      if (!rangeValidation.isValid) {
        errors[field] = rangeValidation.error;
      }
    }
    
    if (rule.match && value !== data[rule.match]) {
      errors[field] = `${rule.label} ne correspond pas`;
    }
    
    if (rule.custom && typeof rule.custom === 'function') {
      const customValidation = rule.custom(value, data);
      if (!customValidation.isValid) {
        errors[field] = customValidation.error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

