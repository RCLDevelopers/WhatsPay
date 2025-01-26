import { useState, useCallback } from 'react';

export const useMPesaValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = useCallback((number) => {
    const phoneRegex = /^(?:254|\+254|0)?([7-9][0-9]{8})$/;
    
    if (!number) {
      return 'Phone number is required';
    }
    if (!phoneRegex.test(number)) {
      return 'Please enter a valid Kenyan phone number';
    }
    return null;
  }, []);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    const error = validatePhoneNumber(value);
    setErrors(prev => ({
      ...prev,
      phoneNumber: error,
    }));
  };

  return {
    phoneNumber,
    errors,
    handlePhoneChange,
    isValid: !errors.phoneNumber && phoneNumber,
  };
}; 