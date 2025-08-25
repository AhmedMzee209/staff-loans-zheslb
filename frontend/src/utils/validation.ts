export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Tanzanian phone number validation
  const phoneRegex = /^(\+255|255|0)?[17]\d{8}$/;
  return phoneRegex.test(phone);
};

export const validateNationalId = (id: string): boolean => {
  // Tanzanian National ID validation (basic format)
  const idRegex = /^\d{20}$/;
  return idRegex.test(id);
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 100000000; // Max 100M TZS
};

export const validateLoanTerm = (months: number): boolean => {
  return months >= 1 && months <= 60; // 1 month to 5 years
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const getValidationError = (field: string, value: any, rules: any): string | null => {
  if (rules.required && !validateRequired(value)) {
    return `${field} is required`;
  }

  if (typeof value === 'string') {
    if (rules.minLength && !validateMinLength(value, rules.minLength)) {
      return `${field} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
      return `${field} must be no more than ${rules.maxLength} characters`;
    }
  }

  if (field.toLowerCase().includes('email') && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (field.toLowerCase().includes('phone') && !validatePhone(value)) {
    return 'Please enter a valid phone number';
  }

  return null;
}; 